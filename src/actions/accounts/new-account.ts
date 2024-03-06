"use server";

import { db } from "@/lib/db";
import { AdminSchemaType, AdminSchema } from "@/lib/schemaValidator";
import { UserRole } from "@prisma/client";
import sendAccountVerificationToken from "../mail/send-account-verification-token";
import { generateAccountActivationToken } from "../tokens";

export async function newAccount(data: AdminSchemaType) {
  const validatedFields = AdminSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Something went wrong",
    };
  }

  const { name, surname, email, role, organization } = validatedFields.data;

  const existingOrg = await db.organization.findFirst({
    where: {
      OR: [
        {
          name: organization,
        },
        {
          abbreviation: organization,
        },
      ],
    },
  });

  if (!existingOrg) {
    return {
      error: "Organization not found",
    };
  }

  const account = await db.user.create({
    data: {
      name,
      surname,
      role: role as UserRole,
      email,
      organizationId: existingOrg.id,
    },
  });

  const verificationToken = await generateAccountActivationToken(email);

  sendAccountVerificationToken(organization, email, verificationToken.token);

  return { success: account.id };
}
