"use server";

import { prisma } from "../lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";

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
          isDefault: false,
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

    if (!paymentMethod.organization.stripeCustomerId) {
      return {
        error: {
          message:
            "Aucun moyen de paiement n'est associé à cette organisation.",
          code: "NO_PAYMENT_METHOD",
        },
      };
    }

    await prisma.paymentMethod.updateMany({
      where: { organizationId: paymentMethod.organizationId },
      data: { isDefault: false },
    });

    const result = await prisma.paymentMethod.update({
      where: { id: parsedInput.id },
      data: { isDefault: true },
    });

    await stripe.customers.update(
      paymentMethod.organization.stripeCustomerId as string,
      {
        invoice_settings: {
          default_payment_method: paymentMethod.stripePaymentMethodId,
        },
      },
    );

    revalidatePath(`/organizations/${result.organizationId}/settings/billing`);

    return result;
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
        address: {
          line1: organization.address,
          line2: organization.address2 || undefined,
          city: organization.city,
          postal_code: organization.postalCode,
          country: organization.countryCode,
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
