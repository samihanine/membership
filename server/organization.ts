"use server";

import { authActionClient } from "@/lib/safe-action";
import prisma from "../lib/prisma";
import z from "zod";
import { organizationSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export type Organization = z.infer<typeof organizationSchema>;

export const updateOrganization = authActionClient
  .schema(organizationSchema.partial().extend({ id: z.string() }))
  .action(async ({ parsedInput: data }) => {
    revalidatePath(`/organizations/${data.id}/settings`);
    revalidatePath(`/organizations/${data.id}/visual`);
    return await prisma.organization.update({
      where: { id: data.id },
      data,
    });
  });

export const createOrganization = authActionClient
  .schema(
    organizationSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }),
  )
  .action(async ({ parsedInput: data, ctx }) => {
    const result = await prisma.organization.create({
      data: {
        ...data,
      },
    });

    await prisma.organizationUser.create({
      data: {
        organizationId: result.id,
        userId: ctx.user.id,
      },
    });

    return result;
  });

export const deleteOrganization = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    return await prisma.organization.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  });

export const getOrganization = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    return await prisma.organization.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  });

export const getOrganizations = authActionClient
  .schema(z.object({}))
  .action(async ({ ctx }) => {
    return await prisma.organization.findMany({
      where: {
        organizationUsers: {
          some: {
            userId: ctx.user.id,
          },
        },
        deletedAt: null,
      },
    });
  });
