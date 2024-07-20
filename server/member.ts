"use server";

import prisma from "../lib/prisma";
import z from "zod";
import { actionClient, authActionClient } from "@/lib/safe-action";
import { memberSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { Member } from "@prisma/client";

export const updateMember = authActionClient
  .schema(memberSchema.partial().extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    delete parsedInput.orders;

    const result = await prisma.member.update({
      where: { id: parsedInput.id },
      data: parsedInput as Member,
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
  .action(async ({ parsedInput }) => {
    delete parsedInput.orders;
    const result = await prisma.member.create({
      data: parsedInput as Member,
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

export const getMember = actionClient
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
      include: {
        orders: true,
      },
    });
  });
