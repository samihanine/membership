"use server";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

export const getCurrentUser = async () => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const result: string | undefined = await new Promise((resolve, reject) => {
    jsonwebtoken.verify(
      accessToken,
      process.env.SECRET_KEY as string,
      (err, decoded) => {
        if (err) {
          resolve(undefined);
        }
        resolve(decoded as string);
      },
    );
  });

  const user = await prisma.user.findUnique({
    where: { id: result },
    include: {
      companyUsers: {
        include: {
          company: true,
        },
      },
    }
  });

  return user || null;
};

export const updateCurrentUser = async (data: {
  name?: string;
  phoneNumber?: string;
  email?: string;
  imageUrl?: string;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return await prisma.user.update({
    where: { id: user.id },
    data,
  });
};

export const createUser = async (data: {
  name: string;
  phoneNumber?: string;
  email: string;
  password?: string;
  provider: User["provider"];
  role: User["role"];
  imageUrl?: string;
}) => {
  let hubspotId = undefined;

  return await prisma.user.create({
    data: {
      ...data,
      hubspotId,
    },
  });
};
