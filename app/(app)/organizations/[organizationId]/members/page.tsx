import MembersPage from "@/components/member/members-page";
import { Member } from "@/lib/schemas";
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

  return (
    <MembersPage
      members={result?.data as Member[]}
      organizationId={organizationId}
    />
  );
}
