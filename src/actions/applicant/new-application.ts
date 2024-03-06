"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/queries";
import {
  ApplicantDetailsSchema,
  ApplicantDetailsType,
  PropertySchema,
  PropertyType,
} from "@/lib/schemaValidator";
import sendApplicationConfirmation from "@/actions/mail/send-application-confirmation-email";

export const newApplication = async (
  applicantDetails: ApplicantDetailsType,
  propertyDetails: PropertyType,
) => {
  const applicantFields = ApplicantDetailsSchema.safeParse(applicantDetails);
  const propertyFields = PropertySchema.safeParse(propertyDetails);

  if (!applicantFields.success) {
    return {
      error: "Applicant details are invalid",
    };
  }

  if (!propertyFields.success) {
    return {
      error: "Property details are invalid",
    };
  }

  const existingUser = await getUserByEmail(applicantDetails.email);

  if (!existingUser) {
    return {
      error: "User does not exist",
    };
  }

  const { name, surname, identityType, email, identificationNumber } =
    applicantFields.data;

  const { address, currency, financingInstitution, type, value } =
    propertyFields.data;

  const userUpdate = await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      name,
      surname,
      identityType: identityType === "NATIONAL_ID" ? "NATIONAL_ID" : "PASSPORT",
      email,
      identificationNumber,
    },
  });

  const property = await db.property.create({
    data: {
      address,
      currency,
      financingInstitution,
      type,
      value,
    },
  });

  const application = await db.application.create({
    data: {
      applicant: {
        connect: {
          id: userUpdate.id,
        },
      },
      property: {
        connect: {
          id: property.id,
        },
      },
    },
  });

  sendApplicationConfirmation(applicantDetails.email, application.id);

  return {
    success: application.id,
  };
};
