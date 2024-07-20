"use client";

import { getBillingPortalSessionUrl } from "@/server/billing";
import { useAction } from "next-safe-action/hooks";
import { Button } from "../ui/button";
import { showError } from "@/lib/utils";

export default function GetBillingPortalUrlButton({
  organizationId,
}: {
  organizationId: string;
}) {
  const { executeAsync, status } = useAction(getBillingPortalSessionUrl);

  const handleClick = async () => {
    const result = await executeAsync({
      organizationId,
    });

    if (result?.data?.error) {
      showError({
        message: result.data.error.message,
      });
    } else if (result?.data?.url) {
      // new tab
      window.open(result.data.url, "_blank");
    } else {
      showError({
        message:
          "Une erreur s'est produite lors de la création du portail de facturation.",
      });
    }
  };

  return (
    <>
      <Button
        className="gap-1 disabled:cursor-not-allowed"
        variant={"outline"}
        disabled={status === "executing"}
        onClick={handleClick}
      >
        <span className="sm:whitespace-nowrap">
          Accéder au portail de facturation
        </span>
      </Button>
    </>
  );
}
