import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";

export const createOrders = authActionClient
  .schema(
    z.object({
      organizationId: z.string(),
      memberIds: z.array(z.string()),
    }),
  )
  .action(async ({ parsedInput }) => {
    await prisma.order.createMany({
      data: parsedInput.memberIds.map((memberId) => ({
        memberId,
        organizationId: parsedInput.organizationId,
        status: "PENDING",
      })),
    });
  });
