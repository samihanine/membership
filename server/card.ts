"use server";

import {
  CARD_HEIGHT,
  CARD_PRICE_IN_EURO_CENTS,
  CARD_WIDTH,
  DEFAULT_IMAGE_CARD_BACK_URL,
  DEFAULT_IMAGE_CARD_FRONT_URL,
} from "@/lib/contants";
import { createPrintagsFiles } from "@/lib/printags";
import prisma from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { stripe } from "@/lib/stripe";
import { Prisma } from "@prisma/client";
import { File } from "formdata-node";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateImageBuffer } from "./image";
import { uploadFileToTheCloud } from "./upload";

export const createCards = authActionClient
  .schema(
    z.object({
      memberIds: z.array(z.string()),
      organizationId: z.string(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const quantity = parsedInput.memberIds.length;
    if (quantity === 0) {
      return {
        error: {
          message: "Vous devez sélectionner au moins un membre",
        },
      };
    }

    const members = await prisma.member.findMany({
      where: {
        id: {
          in: parsedInput.memberIds,
        },
      },
    });

    const amount = CARD_PRICE_IN_EURO_CENTS * quantity;

    const organization = await prisma.organization.findUnique({
      where: { id: parsedInput.organizationId },
      include: {
        paymentMethods: true,
      },
    });

    if (!organization?.stripeCustomerId) {
      return {
        error: {
          message:
            "Vous devez ajouter un moyen de paiement avant de passer une commande",
        },
      };
    }

    let invoice = await stripe.invoices.create({
      customer: organization.stripeCustomerId,
      collection_method: "charge_automatically",
      auto_advance: true,
      description: `Paiement des cartes pour ${quantity} membres`,
      currency: organization.currency,
    });

    for (const member of members) {
      await stripe.invoiceItems.create({
        quantity: 1,
        unit_amount: CARD_PRICE_IN_EURO_CENTS,
        customer: organization.stripeCustomerId,
        description: `Carte de membre pour ${member.firstName} ${member.lastName}`,
        currency: organization.currency,
        invoice: invoice.id,
      });
    }

    invoice = await stripe.invoices.finalizeInvoice(invoice.id, {});

    if (invoice.status !== "paid") {
      invoice = await stripe.invoices.pay(invoice.id);
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        currency: organization.currency,
        status: "PENDING",
        stripeInvoiceId: invoice.id,
        userId: ctx.user.id,
        organizationId: parsedInput.organizationId,
      },
    });

    let organizationAddress = {
      address: organization.address,
      address2: organization.address2,
      city: organization.city,
      region: organization.region,
      postalCode: organization.postalCode,
      countryCode: organization.countryCode,
      name: organization.name,
      phoneNumber: organization.phoneNumber,
      email: organization.email,
    };

    await prisma.card.createMany({
      data: members.map((member) => {
        let address = {
          address: member.address,
          address2: member.address2,
          city: member.city,
          region: member.region,
          postalCode: member.postalCode,
          countryCode: member.countryCode,
          name: `${member.firstName} ${member.lastName}`,
          phoneNumber: member.phoneNumber,
          email: member.email,
        };

        if (!address.address || !address.city || !address.postalCode) {
          address = { ...organizationAddress };
        }

        return {
          memberId: member.id,
          organizationId: parsedInput.organizationId,
          status: "PENDING",
          transactionId: transaction.id,
          ...address,
        } as Prisma.CardCreateManyInput;
      }),
    });

    // proccessTransaction(transaction.id);

    revalidatePath(`/organization/${parsedInput.organizationId}/members`);
    revalidatePath(
      `/organization/${parsedInput.organizationId}/settings/cards`,
    );

    return {
      success: true,
    };
  });

export const getOrders = authActionClient
  .schema(
    z.object({
      organizationId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    return prisma.card.findMany({
      where: {
        member: {
          organizationId: parsedInput.organizationId,
        },
      },
      include: {
        transaction: true,
        member: true,
      },
    });
  });

const proccessTransaction = async (transactionId: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
    },
    include: {
      organization: true,
      cards: {
        include: {
          member: true,
        },
      },
    },
  });

  if (!transaction) {
    return;
  }

  const cardBackUrl =
    transaction.organization.cardBackUrl || DEFAULT_IMAGE_CARD_BACK_URL;
  const cardFrontUrl =
    transaction.organization.cardFrontUrl || DEFAULT_IMAGE_CARD_FRONT_URL;

  for (const card of transaction.cards) {
    const imageSize = 294;
    const imageCardFrontBuffer = await generateImageBuffer({
      backgroundImageUrl: cardFrontUrl,
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      images: [
        {
          url: card.member.imageUrl || undefined,
          x: 980,
          y: 70,
          width: imageSize,
          height: imageSize,
          alt: card.member.firstName[0] + " " + card.member.lastName[0],
          borderRadius: 40,
        },
      ],
      texts: [
        {
          content: `${card.member.firstName} ${card.member.lastName}`,
          x: 60,
          y: 700,
          fontSize: 40,
          color: "white",
          align: "left",
        },
      ],
    });

    const logoSize = 360;
    const imageCardBackBuffer = await generateImageBuffer({
      backgroundImageUrl: cardBackUrl,
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      images: [
        {
          url: transaction.organization.imageUrl || undefined,
          x: CARD_WIDTH / 2 - logoSize / 2,
          y: 173,
          width: logoSize,
          height: logoSize,
          alt: transaction.organization.name[0],
          borderRadius: 40,
        },
      ],
      texts: [
        {
          content: transaction.organization.name,
          x: CARD_WIDTH / 2,
          y: 625,
          fontSize: 60,
          color: "white",
          align: "center",
        },
      ],
    });

    const { fileUrl: fileUrlBack } = await uploadFileToTheCloud({
      file: new File(
        [imageCardBackBuffer],
        `card-back-${card.id}-${new Date().getTime()}.png`,
      ),
      folder: "CARD_IMAGES",
    });

    const { fileUrl: fileUrlFront } = await uploadFileToTheCloud({
      file: new File(
        [imageCardFrontBuffer],
        `card-front-${card.id}-${new Date().getTime()}.png`,
      ),
      folder: "CARD_IMAGES",
    });
    const printagsCardBackId = await createPrintagsFiles({
      imageBuffer: imageCardBackBuffer,
    });

    const printagsCardFrontId = await createPrintagsFiles({
      imageBuffer: imageCardFrontBuffer,
    });

    const newCard = await prisma.card.update({
      where: { id: card.id },
      data: {
        printagsCardFrontId,
        printagsCardBackId,
        cardBackUrl: fileUrlBack,
        cardFrontUrl: fileUrlFront,
      },
    });

    //await createPrintagsOrder({ card: newCard as Card });
  }
};

export const getMemberByCardId = authActionClient
  .schema(z.object({ cardId: z.string() }))
  .action(async ({ parsedInput }) => {
    return await prisma.member.findFirst({
      where: {
        cards: {
          some: {
            id: parsedInput.cardId,
          },
        },
      },
    });
  });
