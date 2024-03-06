"use server";

import { BASE_URL, capitalize } from "@/lib/utils";
import { EmailClient, EmailMessage } from "@azure/communication-email";

const connectionString =
  process.env.AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING ?? "";
const emailClient = new EmailClient(connectionString);

export default async function sendApplicationOutComeEmail(
  id: string,
  email: string,
  status: "APPROVED" | "REJECTED",
) {
  const link = `${BASE_URL}/application/${id}`;

  const message: EmailMessage = {
    senderAddress: process.env.AZURE_COMMUNICATION_SENDER_ADDRESS ?? "",
    content: {
      subject: `E-title application ${capitalize(status)}`,
      html: `
        
        <p>Your application has been ${capitalize(status)}. Please click the link below to view your application:</p>
        <p><a href="${link}" style="color: blue; text-decoration: underline;">View application</a></p>
      `,
    },
    recipients: {
      to: [
        {
          address: email,
        },
      ],
    },
  };

  try {
    await emailClient.beginSend(message);
  } catch (error) {
    throw new Error("Failed to send verification email");
  }
}
