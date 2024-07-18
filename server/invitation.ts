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
      invitedByUserId: true,
    }),
  )
  .action(async ({ parsedInput: { email, organizationId, role }, ctx }) => {
    const organization = await prisma.organization.findFirst({
      where: {
        id: organizationId,
      },
    });

    if (!organization) {
      return {
        error: "L'organisation est introuvable.",
        success: false,
      };
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
        error: "L'utilisateur est déjà membre de l'organisation.",
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
          invitedByUserId: ctx.user.id,
          token: Math.random().toString(36).substring(2),
        },
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    try {
      if (user) {
        await sendEmail({
          to: email,
          subject: `${ctx.user.name} vous a ajouté sur ${organization.name}`,
          text: `Bonjour, ${ctx.user.name} vous à ajouté sur l'organisation ${organization.name}. Cliquez sur le lien suivant pour vous accéder à l'organisation.`,
          actionUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/organizations/${organizationId}`,
          actionText: `Accéder à ${organization.name}`,
        });
      } else {
        await sendEmail({
          to: email,
          subject: `${ctx.user.name} vous a invité à rejoindre ${organization.name}`,
          text: `Bonjour, vous avez été invité à rejoindre l'organisation ${organization.name}. Cliquez sur le lien suivant pour vous inscrire et rejoindre l'organisation.`,
          actionUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/register?token=${invitation.token}`,
          actionText: `Rejoindre ${organization.name}`,
        });
      }
    } catch (error) {
      console.log("error", error);
      return {
        error: "Une erreur s'est produite lors de l'envoi de l'email.",
        success: false,
      };
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
