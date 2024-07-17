"use server";

import prisma from "../lib/prisma";
import z from "zod";
import { authActionClient } from "@/lib/safe-action";
import { memberSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export const updateMember = authActionClient
  .schema(memberSchema.partial().extend({ id: z.string() }))
  .action(async ({ parsedInput: data }) => {
    const result = await prisma.member.update({
      where: { id: data.id },
      data,
    });

    revalidatePath(`/organizations/${result.organizationId}/members`);

    return result;
  });

export const createMember = authActionClient
  .schema(
    memberSchema.omit({
      id: true,
      createdAt: true,
      deletedAt: true,
      updatedAt: true,
    }),
  )
  .action(async ({ parsedInput: data }) => {
    console.log(data);
    const result = await prisma.member.create({
      data: {
        ...data,
      },
    });

    revalidatePath(`/organizations/${result.organizationId}/members`);

    return result;
  });

export const deleteMember = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    const result = await prisma.member.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    revalidatePath(`/organizations/${result.organizationId}/members`);

    return result;
  });

export const getMember = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    return await prisma.member.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  });

export const getMembers = authActionClient
  .schema(z.object({ organizationId: z.string() }))
  .action(async ({ parsedInput }) => {
    return await prisma.member.findMany({
      where: {
        organizationId: parsedInput.organizationId,
        deletedAt: null,
      },
    });
  });
