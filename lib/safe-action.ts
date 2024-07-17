import { getCurrentUser } from "@/server/user";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next, ...props }) => {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("Session is not valid!");
  }

  const organizationId = (props.clientInput as any)?.organizationId;
  if (organizationId) {
    if (
      !user.organizationUsers.find((cu) => cu.organizationId === organizationId)
    ) {
      throw new Error("User is not part of the organization");
    }
  }

  return next({ ctx: { user } });
});
