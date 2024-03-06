import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import {
  getActivationTokenByEmail,
  getVerificationTokenByEmail,
} from "@/lib/queries";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();

  const expiresAt = new Date(new Date().getTime() + 1000 * 3600);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken?.id ?? "",
      },
    });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error(`User with email ${email} not found.`);
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expiresAt,
      userId: user.id,
    },
  });

  return verificationToken;
};

export const generateAccountActivationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 1000 * 3600);

  const existingToken = await getActivationTokenByEmail(email);

  if (existingToken) {
    await db.accountActivationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error(`User with email ${email} not found.`);
  }

  const accountActivationToken = await db.accountActivationToken.create({
    data: {
      token,
      expiresAt,
      userId: user.id,
    },
  });

  return accountActivationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 1000 * 3600);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error(`User with email ${email} not found.`);
  }

  const resetPasswordToken = await db.passwordResetToken.create({
    data: {
      token,
      expiresAt,
      userId: user.id,
    },
  });

  return resetPasswordToken;
};
