"use server";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import prisma from "../lib/prisma";
import { invitationSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/server/email";

export const createInvitation = authActionClient
  .schema(
    invitationSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      token: true,
    }),
  )
  .action(async ({ parsedInput: { email, organizationId, role } }) => {
    const organization = await prisma.organization.findFirst({
      where: {
        id: organizationId,
      },
    });

    if (!organization) {
      throw new Error("Organization not found");
    }

    const organizationUser = await prisma.organizationUser.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    });

    if (organizationUser) {
      return {
        error: "User already in organization",
        success: false,
      };
    }

    let invitation = await prisma.invitation.findFirst({
      where: {
        email,
        organizationId,
      },
    });

    if (!invitation) {
      invitation = await prisma.invitation.create({
        data: {
          email,
          organizationId,
          role,
          token: Math.random().toString(36).substring(2),
        },
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      await sendEmail({
        to: email,
        subject: `Invitation à rejoindre ${organization.name}`,
        text: `Bonjour, vous avez été invité à rejoindre l'organisation ${organization.name}. Cliquez sur le lien suivant pour vous inscrire et rejoindre l'organisation.`,
        actionUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/regiester?token=${invitation.token}`,
        actionText: "Rejoindre l'organisation",
      });
    } else {
      await sendEmail({
        to: email,
        subject: `Invitation à rejoindre ${organization.name}`,
        text: `Bonjour, vous avez été invité à rejoindre l'organisation ${organization.name}. Cliquez sur le lien suivant pour vous inscrire et rejoindre l'organisation.`,
        actionUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/regiester?token=${invitation.token}`,
        actionText: "Rejoindre l'organisation",
      });
    }

    revalidatePath(`/organizations/${organizationId}/settings/users`);

    return {
      invitation,
      success: true,
    };
  });

export const getInvitations = authActionClient
  .schema(z.object({ organizationId: z.string() }))
  .action(async ({ parsedInput: { organizationId } }) => {
    return await prisma.invitation.findMany({
      where: {
        organizationId,
      },
    });
  });

export const deleteInvitation = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    const result = await prisma.invitation.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/organizations/${result.organizationId}/settings/users`);

    return result;
  });
