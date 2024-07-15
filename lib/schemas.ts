import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string({
      message: "Le nom de l'entreprise est requis",
    })
    .min(3, {
      message: "Le nom de l'entreprise doit faire au moins 3 caractères",
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

export type Company = z.infer<typeof companySchema>;

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
  companyId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

export type Member = z.infer<typeof memberSchema>;
