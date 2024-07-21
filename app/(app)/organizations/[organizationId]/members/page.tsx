import MembersPage from "@/components/member/members-page";
import { Member, Organization, PaymentMethod } from "@/lib/schemas";
import { getPaymentMethods } from "@/server/payment-method";
import { getMembers } from "@/server/member";
import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";
import { getOrganization } from "@/server/organization";

export default async function Members({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const result = await getMembers({ organizationId });

  const paymentMethods = await getPaymentMethods({
    organizationId: organizationId,
  });

  const organization = await getOrganization({ id: organizationId });

  if (!organization) {
    return redirect("/onboarding");
  }

  return (
    <MembersPage
      members={result?.data as Member[]}
      organization={organization.data as Organization}
      paymentMethods={(paymentMethods?.data as PaymentMethod[]) || []}
    />
  );
}
