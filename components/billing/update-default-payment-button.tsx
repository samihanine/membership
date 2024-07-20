"use client";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/lib/schemas";
import { updateDefaultPaymentMethod } from "@/server/payment-method";
import { useAction } from "next-safe-action/hooks";

export default function UpdateDefaultPaymentMethodButton({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}) {
  const { executeAsync, status } = useAction(updateDefaultPaymentMethod);

  const handleClick = async () => {
    await executeAsync({
      id: paymentMethod.id,
    });
  };

  return (
    <>
      <Button
        className="gap-1 disabled:cursor-not-allowed"
        variant={"secondary"}
        disabled={status === "executing" || paymentMethod.isDefault}
        onClick={handleClick}
      >
        <span className="sm:whitespace-nowrap">Définir comme défaut</span>
      </Button>
    </>
  );
}
