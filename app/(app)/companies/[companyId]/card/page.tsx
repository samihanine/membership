import { getCurrentUser } from "@/server/user";

export default async function Page() {
  const user = await getCurrentUser();

  return <>{JSON.stringify(user)}</>;
}
