"use server";

import { db } from "@/lib/db";
import { getApplicationById } from "@/lib/queries";
import sendApplicationOutComeEmail from "../mail/send-application-outcome-email";

export const applicationOutComeHandler = async (
  id: string,
  email: string,
  outcome: "reject" | "accept",
) => {
  const existingApplication = await getApplicationById(id);

  if (!existingApplication) {
    return {
      error: "Application not found",
    };
  }

  if (existingApplication.status !== "PENDING") {
    return {
      error: `The Application has been actioned and cannot be ${outcome}ed`,
    };
  }

  const status = outcome === "accept" ? "APPROVED" : "REJECTED";

  await db.application.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  sendApplicationOutComeEmail(id, email, status);

  return {
    success: `Application has been ${outcome}ed`,
  };
};
