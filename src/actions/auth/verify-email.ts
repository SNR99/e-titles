"use server";

import { db } from "@/lib/db";
import {
  getUserById,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/lib/queries";
import sendVerificationConfirmation from "../mail/send-email-verification-confirmation";

export const verifyEmail = async (email: string | null, token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token does not exist",
    };
  }

  const tokenExpired = new Date(existingToken.expiresAt) < new Date();

  if (tokenExpired) {
    return {
      error: "Token expired",
    };
  }

  if (existingToken.user.email !== email) {
    return {
      error: "Invalid token",
    };
  }

  const user = await getUserById(existingToken.user.id);

  if (!user) {
    return {
      error: "Invalid token",
    };
  }

  sendVerificationConfirmation(user.email);
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      active: true,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified!" };
};
