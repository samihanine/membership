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
  formattedAddress: z.string().optional(),
  email: z.string().email(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Organization = z.infer<typeof organizationSchema>;

export const orderSchema = z.object({
  transactionId: z.string(),
  memberId: z.string(),
  status: z.enum(["PENDING", "SUCCEEDED", "FAILED"]),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Order = z.infer<typeof orderSchema>;

export const transactionSchema = z.object({
  userId: z.string(),
  amount: z.number(),
  currency: z.string().default("EUR"),
  stripeSessionId: z.string(),
  stripePaymentIntentId: z.string().optional(),
  status: z.enum(["PENDING", "SUCCEEDED", "FAILED"]).default("PENDING"),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  order: orderSchema.nullish(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const memberSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit faire au moins 2 caractères",
  }),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  membershipExpiresAt: z.date().nullish(),
  isMembershipActive: z.boolean().default(true),
  formattedAddress: z.string().optional(),
  email: z.string().optional(),
  imageUrl: z.string().optional(),
  note: z.string().default(""),
  id: z.string(),
  organizationId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  orders: z.array(orderSchema).optional(),
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

export const loginSchema = z.object({
  email: z.string().email({
    message: "L'adresse email est invalide",
  }),
  password: z.string().min(6, {
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
  acceptedAt: z.date().optional(),
  invitedByUserId: z.string(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  user: userSchema.optional(),
});

export type Invitation = z.infer<typeof invitationSchema>;

export const paymentMethodSchema = z.object({
  organizationId: z.string(),
  stripePaymentMethodId: z.string(),
  lastFourDigits: z.string(),
  expMonth: z.number(),
  expYear: z.number(),
  isDefault: z.boolean().default(true),
  brand: z.enum(["visa", "mastercard"]).default("visa"),
  country: z.string().default("FR"),
  name: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
