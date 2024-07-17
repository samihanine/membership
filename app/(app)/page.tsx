import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  if (!user.organizationUsers.length) {
    return redirect("/onboarding");
  }

  return redirect(`/organizations/${user.organizationUsers[0].organizationId}`);
}
