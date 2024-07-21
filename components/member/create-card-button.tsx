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
import { Member, Organization, PaymentMethod } from "@/lib/schemas";
import { showError, showSuccess } from "@/lib/utils";
import { createCards } from "@/server/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const formSchema = z.object({});

export default function CreateCardButton({
  children,
  members,
  organization,
  paymentMethods,
}: {
  children: React.ReactNode;
  members: Member[];
  organization: Organization;
  paymentMethods: PaymentMethod[];
}) {
  const [open, setOpen] = useState(false);
  const { executeAsync, status } = useAction(createCards);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const warnings = useMemo(() => {
    let array: string[] = [];

    if (
      members.some(
        (member) =>
          !member.address?.length ||
          !member.city?.length ||
          !member.postalCode?.length,
      )
    ) {
      array = [
        ...array,
        "L'adresse de certains membres est incomplète. Leurs cartes seront expédiées à l'adresse de votre organisation.",
      ];
    }

    if (members.some((member) => !member.imageUrl?.length)) {
      array = [
        ...array,
        "Certains membres n'ont pas de photo de profil. Ils recevront une carte sans photo.",
      ];
    }

    if (!organization.imageUrl?.length) {
      array = [
        ...array,
        "Votre organisation n'a pas de logo. Les cartes seront imprimées sans logo.",
      ];
    }
    return array;
  }, [members]);

  const handleSubmit = async () => {
    const result = await executeAsync({
      memberIds: members.map((member) => member.id),
      organizationId: organization.id,
    });

    if (result?.data?.success) {
      showSuccess({
        message: "Les cartes ont été commandées avec succès.",
      });
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

          <Card>
            <CardHeader className="!pb-3">
              <p className="text-sm text-muted-foreground">
                Prix pour {members.length} carte(s)
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-medium">
                {(members.length * CARD_PRICE_IN_EURO_CENTS) / 100}€
              </p>
            </CardContent>
          </Card>

          <div className="h-2" />

          {!!paymentMethods.length && (
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                <>
                  {!!warnings.length && (
                    <Card>
                      <CardHeader className="!pb-3">
                        <CardTitle className="text-base text-red-500">
                          Attention !
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside flex flex-col gap-3">
                          {warnings.map((warning) => (
                            <li
                              className="text-sm text-muted-foreground"
                              key={warning}
                            >
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
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
              <Link href={`/organizations/${organization.id}/settings/billing`}>
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
