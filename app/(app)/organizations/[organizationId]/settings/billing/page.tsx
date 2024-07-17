import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  return <>hello</>;
}
