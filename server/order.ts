"use server";

import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";
import { CARD_PRICE_IN_EURO_CENTS } from "@/lib/contants";

export const createOrders = authActionClient
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

    await stripe.invoiceItems.create({
      quantity,
      unit_amount: CARD_PRICE_IN_EURO_CENTS,
      customer: organization.stripeCustomerId,
      description: `Carte de membre`,
      currency: organization.currency,
      invoice: invoice.id,
    });

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

    await prisma.order.createMany({
      data: parsedInput.memberIds.map((memberId) => ({
        memberId,
        organizationId: parsedInput.organizationId,
        status: "PENDING",
        transactionId: transaction.id,
      })),
    });

    revalidatePath(`/organization/${parsedInput.organizationId}/members`);
    revalidatePath(
      `/organization/${parsedInput.organizationId}/settings/orders`,
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
    return prisma.order.findMany({
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
