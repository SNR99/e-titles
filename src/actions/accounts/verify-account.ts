"use server";

import { db } from "@/lib/db";
import { getActivationTokenByToken, getUserByEmail } from "@/lib/queries";
import { NewPasswordSchema, NewPasswordType } from "@/lib/schemaValidator";
import bcrypt from "bcryptjs";

export const verifyAccountHandler = async (
  data: NewPasswordType,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedFields = NewPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password, confirmPassword, email } = validatedFields.data;

  const existingToken = await getActivationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.user.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (email !== existingUser.email) {
    return {
      success: "Invalid Token",
    };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.accountActivationToken.delete({
    where: { id: existingToken.id, user: { email: existingUser.email } },
  });

  return {
    success:
      "Account activated, we have sent you a verification link via email",
  };
};
