"use server";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import { authActionClient } from "@/lib/safe-action";
import { sendEmail } from "./email";
import { userSchema } from "@/lib/schemas";

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
      organizationUsers: {
        include: {
          organization: true,
        },
      },
    },
  });

  return user || null;
};
