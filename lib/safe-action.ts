import { getCurrentUser } from "@/server/user";
import { createSafeActionClient, type MiddlewareFn } from "next-safe-action";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Session is not valid!");
  }

  return next({ ctx: { user } });
});
