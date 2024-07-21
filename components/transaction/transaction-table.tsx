"use client";

import { CARD_PRICE_IN_EURO_CENTS } from "@/lib/contants";
import { Transaction } from "@/lib/schemas";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import GetTransactionInvoiceUrlButton from "../billing/get-transaction-invoice-url-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [currentTransactionOpen, setCurrentTransactionOpen] = useState<
    string | null
  >(null);

  if (transactions.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground mt-5">
        Aucune commande pour le moment.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Numéro de commande</TableHead>
          <TableHead>Date de commande</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((transaction) => (
            <>
              <TableRow>
                <TableCell
                  className="cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    if (currentTransactionOpen === transaction.id) {
                      setCurrentTransactionOpen(null);
                    } else {
                      setCurrentTransactionOpen(transaction.id);
                    }
                  }}
                >
                  {currentTransactionOpen !== transaction.id ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </TableCell>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(transaction.amount / 100)}
                </TableCell>
                <TableCell>
                  <GetTransactionInvoiceUrlButton
                    transactionId={transaction.id}
                  />
                </TableCell>
              </TableRow>
              {currentTransactionOpen === transaction.id && (
                <>
                  {transaction.cards?.map((card) => (
                    <TableRow key={card.id} className="bg-background">
                      <TableCell></TableCell>
                      <TableCell>
                        {card.member?.firstName} {card.member?.lastName}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        {Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(CARD_PRICE_IN_EURO_CENTS / 100)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </>
          ))}
      </TableBody>
    </Table>
  );
}
