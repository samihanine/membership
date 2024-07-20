"use client";

import { useAction } from "next-safe-action/hooks";
import { Button } from "../ui/button";
import { showError } from "@/lib/utils";
import { getTransactionInvoiceUrl } from "@/server/transaction";

export default function GetTransactionInvoiceUrlButton({
  transactionId,
}: {
  transactionId: string;
}) {
  const { executeAsync, status } = useAction(getTransactionInvoiceUrl);

  const handleClick = async () => {
    console.log(transactionId);
    const result = await executeAsync({
      transactionId,
    });

    if (result?.data?.error) {
      showError({
        message: result.data.error.message,
      });
    } else if (result?.data?.url) {
      window.open(result.data.url, "_blank");
    } else {
      showError({
        message:
          "Une erreur s'est produite lors de la récupération de la facture.",
      });
    }
  };

  return (
    <>
      <Button
        className="gap-1 disabled:cursor-not-allowed h-fit"
        variant={"outline"}
        disabled={status === "executing"}
        onClick={handleClick}
      >
        <span className="sm:whitespace-nowrap">Télécharger la facture</span>
      </Button>
    </>
  );
}
