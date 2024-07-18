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
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg mb-1">Visualisez les commandes</CardTitle>
      </div>
    </>
  );
}
