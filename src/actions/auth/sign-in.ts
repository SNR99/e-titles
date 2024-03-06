"use server";

import { signIn } from "../../auth";
import { DEFAULT_SIGN_IN_REDIRECT } from "@/lib/routes";
import { AuthError } from "next-auth";
import { SignInSchema, SignInType } from "@/lib/schemaValidator";
import { getUserByEmail } from "@/lib/queries";
import { send } from "process";
import sendVerificationToken from "../mail/send-email-verification-token";
import { generateVerificationToken } from "../tokens";

export const signInHandler = async (data: SignInType) => {
  const validatedFields = await SignInSchema.safeParseAsync(data);

  if (!validatedFields.success) {
    return {
      error: "Something went wrong",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password) {
    return {
      error: "Account doesn't exist",
    };
  }

  if (!existingUser.emailVerified) {
    const token = await generateVerificationToken(email);
    sendVerificationToken(email, token.token);
    return {
      error: "Account not verified, confirmation email sent",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGN_IN_REDIRECT,
    });
    return {
      success: "Successfully signed in",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Email or Password",
          };

        default:
          return {
            error: "Something went wrong",
          };
      }
    }
    throw error;
  }
};
