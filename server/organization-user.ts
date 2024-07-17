"use server";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteOrganizationUser = authActionClient
  .schema(z.object({ organizationId: z.string(), userId: z.string() }))
  .action(async ({ parsedInput: { organizationId, userId } }) => {
    const organizationUser = await prisma.organizationUser.findFirst({
      where: {
        organizationId,
        userId,
      },
    });

    if (!organizationUser) {
      throw new Error("Organization user not found");
    }

    const result = await prisma.organizationUser.delete({
      where: {
        id: organizationUser.id,
      },
    });

    revalidatePath(`/organizations/${organizationId}/settings/users`);

    return result;
  });

export const updateOrganizationUser = authActionClient
  .schema(
    z.object({
      organizationId: z.string(),
      userId: z.string(),
      role: z.enum(["ADMINISTRATOR"]),
    }),
  )
  .action(async ({ parsedInput: { organizationId, userId, role } }) => {
    const organizationUser = await prisma.organizationUser.findFirst({
      where: {
        organizationId,
        userId,
      },
    });

    if (!organizationUser) {
      throw new Error("Organization user not found");
    }

    const result = await prisma.organizationUser.update({
      where: {
        id: organizationUser.id,
      },
      data: {
        role,
      },
    });

    revalidatePath(`/organizations/${organizationId}/settings/users`);

    return result;
  });

export const getOrganizationUsers = authActionClient
  .schema(z.object({ organizationId: z.string() }))
  .action(async ({ parsedInput: { organizationId } }) => {
    return await prisma.organizationUser.findMany({
      where: {
        organizationId,
      },
      include: {
        user: true,
      },
    });
  });
