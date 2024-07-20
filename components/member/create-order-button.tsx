"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CARD_PRICE_IN_EURO_CENTS } from "@/lib/contants";
import { Member, PaymentMethod } from "@/lib/schemas";
import { showError } from "@/lib/utils";
import { createOrders } from "@/server/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({});

export default function CreateOrderButton({
  children,
  members,
  organizationId,
  paymentMethods,
}: {
  children: React.ReactNode;
  members: Member[];
  organizationId: string;
  paymentMethods: PaymentMethod[];
}) {
  const [open, setOpen] = useState(false);
  const { executeAsync, status } = useAction(createOrders);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await executeAsync({
      memberIds: members.map((member) => member.id),
      organizationId,
    });

    if (result?.data?.success) {
      setOpen(false);
    } else if (result?.data?.error) {
      showError({
        message: result.data.error.message,
      });
    } else {
      showError({
        message: "Une erreur s'est produite lors de la commande des cartes.",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Commandez des cartes</SheetTitle>
          <SheetDescription>
            Vous pouvez commandez des cartes pour les membres sélectionnés. Vous
            avez sélectionné {members.length} membre(s). Chaque carte coûte{" "}
            {CARD_PRICE_IN_EURO_CENTS / 100}€.
          </SheetDescription>

          <div className="h-2" />

          <div className="flex items-center justify-center gap-1 flex-col">
            <p className="text-sm text-muted-foreground">
              Prix pour {members.length} carte(s)
            </p>
            <p className="text-4xl font-medium">
              {(members.length * CARD_PRICE_IN_EURO_CENTS) / 100}€
            </p>
          </div>

          <div className="h-2" />

          {!!paymentMethods.length && (
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                <>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "executing"}
                  >
                    Commander les {members.length} carte(s)
                  </Button>
                </>
              </form>
            </FormProvider>
          )}

          {!paymentMethods.length && (
            <div>
              <Link href={`/organizations/${organizationId}/settings/billing`}>
                <Button className="w-full">
                  Ajouter une méthode de paiement
                </Button>
              </Link>

              <p className="text-sm text-red-500 text-center mt-5 font-bold">
                Vous devez ajouter une méthode de paiement avant de pouvoir
                commander des cartes.
              </p>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
