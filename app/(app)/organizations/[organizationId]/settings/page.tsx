import { OrganizationForm } from "@/components/organization/organization-form";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Organization } from "@/lib/schemas";
import { getOrganization } from "@/server/organization";
import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const organization = await getOrganization({ id: params.organizationId });

  if (!organization?.data) {
    return redirect("/onboarding");
  }

  return (
    <>
      <div>
        <CardTitle className="text-lg mb-1">
          Modifiez votre organisation
        </CardTitle>
      </div>

      <div className="mb-6" />

      <OrganizationForm organization={organization.data as Organization} />
    </>
  );
}
