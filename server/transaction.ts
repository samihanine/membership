"use server";

import prisma from "@/lib/prisma";
import { authActionClient } from "@/lib/safe-action";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

export const getTransactionInvoiceUrl = authActionClient
  .schema(
    z.object({
      transactionId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: parsedInput.transactionId,
      },
    });

    if (!transaction) {
      return {
        error: {
          message: "Transaction introuvable",
        },
      };
    }

    if (!transaction.stripeInvoiceId) {
      return {
        error: {
          message: "Facture introuvable",
        },
      };
    }

    const invoice = await stripe.invoices.retrieve(
      transaction.stripeInvoiceId as string,
    );

    if (!invoice?.invoice_pdf) {
      return {
        error: {
          message: "Facture introuvable",
        },
      };
    }

    return {
      url: invoice.invoice_pdf as string,
    };
  });
