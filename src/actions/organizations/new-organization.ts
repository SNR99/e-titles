"use server";

import { db } from "@/lib/db";
import { OrganizationSchema, OrganizationType } from "@/lib/schemaValidator";

export async function newOrganization(data: OrganizationType) {
  const validatedFields = OrganizationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Something went wrong",
    };
  }

  const { name, orgType, abbreviation } = validatedFields.data;

  const org = await db.organization.create({
    data: {
      name,
      orgType,
      abbreviation,
    },
  });

  return { success: org.id };
}
