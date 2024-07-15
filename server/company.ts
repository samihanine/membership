"use server";

import { authActionClient } from "@/lib/safe-action";
import prisma from "../lib/prisma";
import z from "zod";
import { companySchema } from "@/lib/schemas";

export type Company = z.infer<typeof companySchema>;

export const updateCompany = authActionClient
  .schema(companySchema.partial().extend({ id: z.string() }))
  .action(async ({ parsedInput: data }) => {
    return await prisma.company.update({
      where: { id: data.id },
      data,
    });
  });

export const createCompany = authActionClient
  .schema(companySchema.omit({ id: true }))
  .action(async ({ parsedInput: data, ctx }) => {
    const result = await prisma.company.create({
      data: {
        ...data,
      },
    });

    await prisma.companyUser.create({
      data: {
        companyId: result.id,
        userId: ctx.user.id,
      },
    });

    return result;
  });

export const deleteCompany = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    return await prisma.company.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  });

export const getCompany = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    return await prisma.company.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  });

export const getCompanies = authActionClient
  .schema(z.object({}))
  .action(async ({ ctx }) => {
    return await prisma.company.findMany({
      where: {
        companyUsers: {
          some: {
            userId: ctx.user.id,
          },
        },
        deletedAt: null,
      },
    });
  });
