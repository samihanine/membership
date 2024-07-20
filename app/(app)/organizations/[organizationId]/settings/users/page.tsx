import { CardTitle } from "@/components/ui/card";
import InviteUserButton from "@/components/user/invite-user-button";
import OrganizationUserTable from "@/components/user/organization-user-table";
import { OrganizationUser } from "@/lib/schemas";
import { getOrganizationUsers } from "@/server/organization-user";
import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-5">
        <div className="flex flex-col">
          <CardTitle className="text-lg mb-1">
            Gérer les accès des utilisateurs
          </CardTitle>
        </div>

        <InviteUserButton organizationId={params.organizationId} />
      </div>
      <div>
        <div className="border-b border-border w-full overflow-x-auto" />
        <OrganizationUserTable
          organizationUsers={
            (organizationUsers?.data as OrganizationUser[]) || []
          }
        />
      </div>
    </div>
  );
}
