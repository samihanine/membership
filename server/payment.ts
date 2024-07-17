"use server";

import Stripe from "stripe";
import { getCurrentUser } from "./user";
import { prisma } from "../lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function createPaymentLink(): Promise<string> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  let stripeCustomerId = user.stripeCustomerId;
  if (!stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: user.email,
    });
    stripeCustomerId = stripeCustomer.id;

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: stripeCustomerId },
    });
  }

  const amount = 100;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Paiement de cartes",
            description: `Paiement de cartes pour l'organisation`,
            metadata: {
              userId: user.id,
            },
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      process.env.NEXT_PUBLIC_BASE_URL +
      "/api/stripe/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: process.env.NEXT_PUBLIC_BASE_URL + "/api/stripe/error",
    customer: stripeCustomerId,
  });

  await prisma.transaction.createMany({
    data: [
      {
        amount: amount,
        stripePaymentIntentId: session.payment_intent as string,
        stripeSessionId: session.id,
        userId: user.id,
      },
    ],
  });

  return session.url as string;
}

export async function handleStripeWebhook(event: Stripe.Event) {
  const transaction = await prisma.transaction.findFirst({
    where: { stripeSessionId: (event.data.object as any).id },
  });

  if (!transaction) {
    throw new Error("Transaction introuvable");
  }

  if (event.type === "checkout.session.completed") {
    // TODO: Handle payment success
  }
}

export async function handlePaymentSuccess(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const transaction = await prisma.transaction.findFirst({
    where: { stripeSessionId: sessionId },
  });

  if (!transaction) {
    throw new Error("Transaction introuvable");
  }

  if (session.payment_status === "paid") {
    // TODO: Handle payment success
  }
}
