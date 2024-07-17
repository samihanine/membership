"use server";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { redirect } from "next/navigation";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import { googleClient } from "@/lib/google";
import { createUser } from "./user";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "@/lib/schemas";

const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};

export const loginWithPassword = actionClient
  .schema(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Votre email est introuvable" };
    }

    if (user.provider !== "PASSWORD" || !user.password) {
      return { error: "Veuillez vous connecter avec Google" };
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return { error: "Le mot de passe est incorrect" };
    }

    await createCookie({ userId: user.id });

    redirect(`/`);
  });

export const loginWithGoogle = async ({ state }: { state?: string }) => {
  let scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return googleClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
    state,
  });
};

export const handleGoogleCallback = async ({
  code,
  state,
  scopes,
}: {
  code: string;
  state?: string;
  scopes: string[];
}): Promise<string> => {
  let isDriver = scopes.every((scope) => scope.includes("calendar"));

  const { tokens } = await googleClient.getToken({
    code: code,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
  });

  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token as string,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const data = ticket.getPayload();

  if (!data) {
    throw new Error("Invalid google token");
  }

  if (!data.email) {
    throw new Error("Invalid google token");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    const newUser = await createUser({
      email: data.email,
      name: data.name || "",
      provider: "GOOGLE",
      role: "OWNER",
      imageUrl: data.picture,
    });

    await createCookie({ userId: newUser.id });
  } else {
    await createCookie({ userId: user.id });
  }

  return `/`;
};

export const signUpWithPassword = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const { email, name, password, confirmPassword } = parsedInput;

    if (password !== confirmPassword) {
      return { error: "Les mots de passe ne correspondent pas" };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return { error: "Cet utilisateur existe déjà" };
    }

    const hash = await hashPassword(password);

    const newUser = await createUser({
      email,
      name,
      password: hash,
      provider: "PASSWORD",
      role: "OWNER",
    });

    await createCookie({ userId: newUser.id });

    redirect(`/`);
  });

export const createCookie = async ({ userId }: { userId: string }) => {
  const accessToken = jsonwebtoken.sign(
    userId,
    process.env.SECRET_KEY as string,
  );

  const cookieStore = cookies();

  cookieStore.set("accessToken", accessToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const logOut = async () => {
  const cookieStore = cookies();

  cookieStore.delete("accessToken");

  redirect(`/`);
};
