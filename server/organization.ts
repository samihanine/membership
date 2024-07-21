"use server";

import { authActionClient } from "@/lib/safe-action";
import prisma from "../lib/prisma";
import z from "zod";
import { organizationSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { CARD_HEIGHT, CARD_WIDTH } from "@/lib/contants";
import { createCanvas, loadImage } from "canvas";

export type Organization = z.infer<typeof organizationSchema>;

export const updateOrganization = authActionClient
  .schema(organizationSchema.partial().extend({ id: z.string() }))
  .action(async ({ parsedInput: data }) => {
    const organization = await prisma.organization.findUnique({
      where: {
        id: data.id,
      },
    });

    if (data.cardFrontUrl && data.cardFrontUrl !== organization?.cardFrontUrl) {
      const success = await checkCardImageSize(data.cardFrontUrl);
      if (!success) {
        return {
          error: {
            message: `L'image doit être de ${CARD_WIDTH}x${CARD_HEIGHT} pixels`,
          },
        };
      }
    }

    if (data.cardBackUrl && data.cardBackUrl !== organization?.cardBackUrl) {
      const success = await checkCardImageSize(data.cardBackUrl);
      if (!success) {
        return {
          error: {
            message: `L'image doit être de ${CARD_WIDTH}x${CARD_HEIGHT} pixels`,
          },
        };
      }
    }

    const result = await prisma.organization.update({
      where: { id: data.id },
      data,
    });

    revalidatePath(`/organizations/${data.id}/settings`);
    revalidatePath(`/organizations/${data.id}/visual`);

    return {
      organization: result,
    };
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

    if (!result) {
      return {
        error: {
          message:
            "Une erreur s'est produite lors de la création de l'organisation",
        },
      };
    }

    await prisma.organizationUser.create({
      data: {
        organizationId: result.id,
        userId: ctx.user.id,
      },
    });

    return {
      organization: result,
    };
  });

const checkCardImageSize = async (imageUrl: string) => {
  const img = await loadImage(imageUrl);

  if (img.width !== CARD_WIDTH || img.height !== CARD_HEIGHT) {
    return false;
  }

  return true;
};

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
