"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PaymentMethod } from "@/lib/schemas";
import { deletePaymentMethod } from "@/server/payment-method";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export default function DeletePaymentMethodButton({
  children,
  paymentMethod,
}: {
  children?: React.ReactNode;
  paymentMethod: PaymentMethod;
}) {
  const [open, setOpen] = useState(false);
  const { executeAsync, status } = useAction(deletePaymentMethod);

  const handleDelete = async () => {
    await executeAsync({
      id: paymentMethod.id,
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ?? (
          <Button className="gap-1" variant={"destructive"}>
            <span className="sm:whitespace-nowrap">Supprimer</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Supprimer le moyen de paiement</SheetTitle>

          <SheetDescription>
            Êtes-vous sûr de vouloir supprimer la carte{" "}
            <strong>{paymentMethod.brand}</strong> se terminant par{" "}
            <strong>{paymentMethod.lastFourDigits}</strong> ?
          </SheetDescription>
          <div className="h-2" />

          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={status === "executing"}
          >
            Supprimer le moyen de paiement
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
