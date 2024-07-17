import { z } from "zod";
import { zfd } from "zod-form-data";

export const organizationSchema = z.object({
  name: z
    .string({
      message: "Le nom de l'organisation est requis",
    })
    .min(3, {
      message: "Le nom de l'organisation doit faire au moins 3 caractères",
    }),
  addressId: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageCardBackUrl: z.string().optional(),
  imageCardFrontUrl: z.string().optional(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Organization = z.infer<typeof organizationSchema>;

export const memberSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit faire au moins 2 caractères",
  }),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  membershipExpiresAt: z.date().nullish(),
  email: z.string().optional(),
  imageUrl: z.string().optional(),
  note: z.string().default(""),
  id: z.string(),
  organizationId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Member = z.infer<typeof memberSchema>;

export const registerSchema = z.object({
  email: z.string().email({
    message: "L'adresse email est invalide",
  }),
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  }),
  confirmPassword: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  }),
});

export const uploadFileSchema = zfd.formData({
  folder: z.enum([
    "MEMBER_PROFILE_PICTURES",
    "USER_PROFILE_PICTURES",
    "CARD_IMAGES",
    "OTHER",
  ]),
  file: zfd.file(),
});

export type UploadFile = z.infer<typeof uploadFileSchema>;

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  imageUrl: z.string().optional(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;

export const organizationUserSchema = z.object({
  user: userSchema,
  role: z.enum(["ADMINISTRATOR"]),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type OrganizationUser = z.infer<typeof organizationUserSchema>;

export const invitationSchema = z.object({
  email: z.string().email(),
  organizationId: z.string(),
  role: z.enum(["ADMINISTRATOR"]),
  token: z.string(),
  accepted: z.boolean().default(false),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Invitation = z.infer<typeof invitationSchema>;
