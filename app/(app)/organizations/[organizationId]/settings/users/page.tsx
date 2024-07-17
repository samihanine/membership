import { CardDescription, CardTitle } from "@/components/ui/card";
import InviteUserButton from "@/components/user/invite-user-button";
import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";
import React from "react";
import OrganizationUserTable from "@/components/user/organization-user-table";
import { getOrganizationUsers } from "@/server/organization-user";
import { OrganizationUser } from "@/lib/schemas";

export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();
  const organizationUsers = await getOrganizationUsers({
    organizationId: params.organizationId,
  });

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg mb-1">
              Gérer les accès des utilisateurs
            </CardTitle>
            <CardDescription>
              Ajouter ou supprimer des utilisateurs qui ont accès à votre
              organisation
            </CardDescription>
          </div>

          <InviteUserButton organizationId={params.organizationId} />
        </div>
        <div className="border-b border-border mt-6" />
        <OrganizationUserTable
          organizationUsers={
            (organizationUsers?.data as OrganizationUser[]) || []
          }
        />
      </div>
    </>
  );
}
