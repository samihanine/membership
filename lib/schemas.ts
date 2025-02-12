import { admin } from "googleapis/build/src/apis/admin";
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
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  cardBackUrl: z.string().optional(),
  cardFrontUrl: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string(),
  address2: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  countryCode: z.string(),
  email: z.string().email(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Organization = z.infer<typeof organizationSchema>;

export const cardSchema = z.object({
  transactionId: z.string(),
  memberId: z.string(),
  status: z.enum(["PENDING", "SUCCEEDED", "FAILED"]),
  address: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  countryCode: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),

  cardFrontUrl: z.string().optional(),
  cardBackUrl: z.string().optional(),
  printagsCardFrontId: z.string().optional(),
  printagsCardBackId: z.string().optional(),
  adminKey: z.string(),
  counter: z.number().default(0),
  privateKey: z.string(),

  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  member: z.any().nullish(),
});

export type Card = z.infer<typeof cardSchema>;

export const transactionSchema = z.object({
  userId: z.string(),
  amount: z.number(),
  currency: z.string().default("eur"),
  stripeSessionId: z.string().optional(),
  stripeInvoiceId: z.string(),
  status: z.enum(["PENDING", "SUCCEEDED", "FAILED"]).default("PENDING"),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  cards: z.array(cardSchema).optional(),
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
  email: z.string().optional(),
  imageUrl: z.string().optional(),
  note: z.string().default(""),
  id: z.string(),
  organizationId: z.string(),

  address: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postalCode: z.string().optional(),
  countryCode: z.string().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  cards: z.array(cardSchema).optional(),
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
    "ORGANIZATION_LOGOS",
    "OTHER",
  ]),
  file: z.any(),
});

export type UploadFile = z.infer<typeof uploadFileSchema>;

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  imageUrl: z.string().optional(),
  id: z.string(),
  provider: z.enum(["PASSWORD", "GOOGLE"]),
  role: z.enum(["USER", "ADMINISTRATOR"]),
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
  countryCode: z.string().default("FR"),
  name: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
