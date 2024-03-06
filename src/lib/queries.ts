import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    return existingUser;
  } catch {
    return null;
  }
};

export const getApplicationById = async (id: string) => {
  try {
    const application = await db.application.findUnique({
      where: {
        id,
      },
      include: {
        property: true,
        applicant: true,
      },
    });

    return application;
  } catch {
    return null;
  }
};

export const getApplications = async (email: string) => {
  try {
    const applications = await db.application.findMany({
      where: {
        applicant: {
          email,
        },
      },
      include: {
        property: true,
        applicant: true,
      },
    });

    return applications;
  } catch {
    return [];
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await db.verificationToken.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    return token;
  } catch {
    return null;
  }
};

export const getActivationTokenByEmail = async (token: string) => {
  try {
    const activationToken = await db.accountActivationToken.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });

    return activationToken;
  } catch {
    return null;
  }
};

export const getActivationTokenByToken = async (token: string) => {
  try {
    const activation_token = await db.accountActivationToken.findFirst({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    return activation_token;
  } catch {
    return null;
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await db.passwordResetToken.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });
    return resetPasswordToken;
  } catch {
    return null;
  }
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const token = await db.passwordResetToken.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    return token;
  } catch {
    return null;
  }
};
