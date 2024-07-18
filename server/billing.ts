"use server";

import Stripe from "stripe";
import { getCurrentUser } from "./user";
import { prisma } from "../lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export const addPaymentMethod = authActionClient
  .schema(
    z.object({
      organizationId: z.string(),
    }),
  )
  .action(async ({ ctx, parsedInput }) => {
    const organization = await prisma.organization.findUnique({
      where: { id: parsedInput.organizationId },
    });

    if (!organization) {
      return {
        error: {
          message: "Organisation introuvable.",
          code: "ORGANIZATION_NOT_FOUND",
        },
      };
    }

    let stripeCustomerId = organization.stripeCustomerId;
    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        name: organization.name,
        email: organization.email,
        metadata: {
          organizationId: organization.id,
          userId: ctx.user.id,
        },
      });
      stripeCustomerId = stripeCustomer.id;

      await prisma.organization.update({
        where: { id: organization.id },
        data: { stripeCustomerId: stripeCustomerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      success_url:
        process.env.NEXT_PUBLIC_BASE_URL +
        "/api/stripe/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + "/api/stripe/error",
      customer: stripeCustomerId,
      metadata: {
        organizationId: organization.id,
        userId: ctx.user.id,
      },
    });

    return { url: session.url as string };
  });

export async function handlePaymentSuccess(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const organizationId = session.metadata?.organizationId;

  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
  });

  if (!organization) {
    throw new Error("Organisation introuvable");
  }

  if (!session.setup_intent) {
    throw new Error("Session introuvable");
  }

  const setupIntent = await stripe.setupIntents.retrieve(
    session.setup_intent as string,
  );

  if (!setupIntent) {
    throw new Error("Intent introuvable");
  }
  const paymentMethodId = setupIntent.payment_method as string;

  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

  if (!paymentMethod) {
    throw new Error("Méthode de paiement introuvable");
  }

  if (!paymentMethod.card) {
    throw new Error("Carte introuvable");
  }

  await prisma.paymentMethod.updateMany({
    where: { organizationId: organization.id },
    data: { isDefault: false },
  });

  await prisma.paymentMethod.create({
    data: {
      organizationId: organization.id,
      stripePaymentMethodId: paymentMethod.id,
      lastFourDigits: paymentMethod.card.last4,
      expMonth: paymentMethod.card.exp_month,
      expYear: paymentMethod.card.exp_year,
      isDefault: true,
      brand: paymentMethod.card.brand || undefined,
      country: paymentMethod.card.country || undefined,
      name: paymentMethod.billing_details?.name || undefined,
      email: paymentMethod.billing_details?.email || undefined,
      phoneNumber: paymentMethod.billing_details?.phone || undefined,
    },
  });

  return `/organizations/${organization.id}/settings/billing`;
}

export const getPaymentMethods = authActionClient
  .schema(
    z.object({
      organizationId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    return prisma.paymentMethod.findMany({
      where: { organizationId: parsedInput.organizationId, deletedAt: null },
    });
  });

export const deletePaymentMethod = authActionClient
  .schema(
    z.object({
      id: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id: parsedInput.id },
      include: {
        organization: true,
      },
    });

    if (!paymentMethod) {
      return {
        error: {
          message: "Méthode de paiement introuvable.",
          code: "PAYMENT_METHOD_NOT_FOUND",
        },
      };
    }

    if (paymentMethod?.stripePaymentMethodId) {
      await stripe.paymentMethods.detach(paymentMethod?.stripePaymentMethodId);
    }

    if (paymentMethod.isDefault) {
      const defaultPaymentMethod = await prisma.paymentMethod.findFirst({
        where: {
          organizationId: paymentMethod.organizationId,
          deletedAt: null,
        },
      });

      if (defaultPaymentMethod) {
        await prisma.paymentMethod.update({
          where: { id: defaultPaymentMethod.id },
          data: { isDefault: true },
        });
      }
    }

    const result = await prisma.paymentMethod.update({
      where: { id: parsedInput.id },
      data: { deletedAt: new Date() },
    });

    revalidatePath(
      `/organizations/${paymentMethod.organizationId}/settings/billing`,
    );

    return result;
  });

export const updateDefaultPaymentMethod = authActionClient
  .schema(
    z.object({
      id: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    await prisma.paymentMethod.updateMany({
      where: { organizationId: parsedInput.id },
      data: { isDefault: false },
    });

    const result = await prisma.paymentMethod.update({
      where: { id: parsedInput.id },
      data: { isDefault: true },
    });

    revalidatePath(`/organizations/${result.organizationId}/settings/billing`);

    return result;
  });
