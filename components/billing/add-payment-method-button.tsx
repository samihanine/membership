"use client";
import { Button } from "@/components/ui/button";
import { showError } from "@/lib/utils";
import { addPaymentMethod } from "@/server/payment-method";
import { PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

export default function AddPaymentMethodButton({
  organizationId,
}: {
  organizationId: string;
}) {
  const { executeAsync, status } = useAction(addPaymentMethod);

  const handleSubmit = async () => {
    const result = await executeAsync({
      organizationId,
    });

    if (result?.data?.error) {
      showError({
        message: result.data.error.message,
      });
    } else if (result?.data?.url) {
      window.location.href = result.data.url;
    } else {
      showError({
        message:
          "Une erreur s'est produite lors de l'ajout du moyen de paiement.",
      });
    }
  };

  return (
    <>
      <Button
        className="gap-1"
        onClick={handleSubmit}
        disabled={status === "executing"}
      >
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sm:whitespace-nowrap">
          Ajouter un moyen de paiement
        </span>
      </Button>
    </>
  );
}
