"use server";

import { authActionClient } from "@/lib/safe-action";
import { stripe } from "@/lib/stripe";
import { z } from "zod";
import { prisma } from "../lib/prisma";

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

  const stripePaymentMethod =
    await stripe.paymentMethods.retrieve(paymentMethodId);

  if (!stripePaymentMethod) {
    throw new Error("Méthode de paiement introuvable");
  }

  if (!stripePaymentMethod.card) {
    throw new Error("Carte introuvable");
  }

  await prisma.paymentMethod.updateMany({
    where: { organizationId: organization.id },
    data: { isDefault: false },
  });

  await prisma.paymentMethod.create({
    data: {
      organizationId: organization.id,
      stripePaymentMethodId: stripePaymentMethod.id,
      lastFourDigits: stripePaymentMethod.card.last4,
      expMonth: stripePaymentMethod.card.exp_month,
      expYear: stripePaymentMethod.card.exp_year,
      isDefault: true,
      brand: stripePaymentMethod.card.brand || undefined,
      countryCode: stripePaymentMethod.card.country || undefined,
      name: stripePaymentMethod.billing_details?.name || undefined,
      email: stripePaymentMethod.billing_details?.email || undefined,
      phoneNumber: stripePaymentMethod.billing_details?.phone || undefined,
    },
  });

  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: organization.stripeCustomerId as string,
  });

  await stripe.customers.update(organization.stripeCustomerId as string, {
    invoice_settings: {
      default_payment_method: stripePaymentMethod.id,
    },
  });

  return `/organizations/${organization.id}/settings/billing`;
}

export const getBillingPortalSessionUrl = authActionClient
  .schema(
    z.object({
      organizationId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
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

    if (!organization.stripeCustomerId) {
      return {
        error: {
          message:
            "Aucun moyen de paiement n'est associé à cette organisation.",
          code: "NO_PAYMENT_METHOD",
        },
      };
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: organization.stripeCustomerId,
      return_url:
        process.env.NEXT_PUBLIC_BASE_URL +
        "/organizations/" +
        organization.id +
        "/settings/billing",
    });

    return {
      url: session.url,
    };
  });

export const getTransactions = authActionClient
  .schema(
    z.object({
      organizationId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    return prisma.transaction.findMany({
      where: { organizationId: parsedInput.organizationId },
      include: {
        cards: {
          include: {
            member: true,
          },
        },
      },
    });
  });
