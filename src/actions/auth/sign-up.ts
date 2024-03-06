"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SignUpType, SignUpSchema } from "@/lib/schemaValidator";
import { getUserByEmail } from "@/lib/queries";
import { generateVerificationToken } from "@/actions/tokens";
import sendVerificationToken from "@/actions/mail/send-email-verification-token";

export const signUpHandler = async (data: SignUpType) => {
  const validatedFields = SignUpSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Something went wrong",
    };
  }

  const { name, surname, email, password, confirmPassword } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  if (existingUser) {
    return {
      error: "Email already in use",
    };
  }

  await db.user.create({
    data: {
      name,
      surname,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationToken(email, verificationToken.token);

  return { success: "Verification email sent" };
};
