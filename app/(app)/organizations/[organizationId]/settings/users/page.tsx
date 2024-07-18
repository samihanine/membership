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
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div className="flex flex-col">
            <CardTitle className="text-lg mb-1">
              Gérer les accès des utilisateurs
            </CardTitle>
          </div>

          <InviteUserButton organizationId={params.organizationId} />
        </div>
        <div className="border-b border-border mt-6 w-full overflow-x-auto" />
        <OrganizationUserTable
          organizationUsers={
            (organizationUsers?.data as OrganizationUser[]) || []
          }
        />
      </div>
    </>
  );
}
