"use server";

import { getUserByEmail } from "@/lib/queries";
import {
  ForgotPasswordType,
  ForgotPasswordSchema,
} from "@/lib/schemaValidator";
import { generateResetPasswordToken } from "../tokens";
import { sendResetPasswordLinkEmail } from "../mail/send-reset-password-link-email";

export const forgotPasswordHandler = async (data: ForgotPasswordType) => {
  const validateFields = ForgotPasswordSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "Email not found",
    };
  }

  const passwordResetToken = await generateResetPasswordToken(
    existingUser.email,
  );

  await sendResetPasswordLinkEmail(
    existingUser.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent" };
};
