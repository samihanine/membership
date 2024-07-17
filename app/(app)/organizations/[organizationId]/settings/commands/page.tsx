import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";
import React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg mb-1">
              Historique des commandes
            </CardTitle>
            <CardDescription>
              Ci-dessous l&apos;historique de vos commandes avec leurs factures
            </CardDescription>
          </div>
        </div>
        <div className="border-b border-border mt-6" />
      </div>
    </>
  );
}
