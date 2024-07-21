import { getCurrentUser } from "@/server/user";

import { OrganizationForm } from "@/components/organization/organization-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Ajouter une organisation</CardTitle>
          <CardDescription>
            Ajouter une organisation pour commencer à utiliser l&apos;
            application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationForm
            email={user.email}
            onSuccess={async (organization) => {
              "use server";

              redirect(`/organizations/${organization.id}/members`);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
