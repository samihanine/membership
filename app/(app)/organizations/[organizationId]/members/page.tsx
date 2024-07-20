import MembersPage from "@/components/member/members-page";
import { Member, PaymentMethod } from "@/lib/schemas";
import { getPaymentMethods } from "@/server/payment-method";
import { getMembers } from "@/server/member";
import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";

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

  return (
    <MembersPage
      members={result?.data as Member[]}
      organizationId={organizationId}
      paymentMethods={(paymentMethods?.data as PaymentMethod[]) || []}
    />
  );
}
