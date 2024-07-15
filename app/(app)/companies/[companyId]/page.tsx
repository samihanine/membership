import { getCurrentUser } from "@/server/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  return <div></div>;
}
