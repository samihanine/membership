import { getCurrentUser } from "@/server/user";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompanyForm } from "@/components/company/company-form";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Ajouter une entreprise</CardTitle>
          <CardDescription>
            Ajouter une entreprise pour commencer à utiliser l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyForm />
        </CardContent>
      </Card>
    </div>
  );
}
