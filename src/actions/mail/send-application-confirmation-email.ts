"use server";

import { BASE_URL } from "@/lib/utils";
import { EmailClient, EmailMessage } from "@azure/communication-email";

const connectionString =
  process.env.AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING ?? "";
const emailClient = new EmailClient(connectionString);

export default async function sendApplicationConfirmation(
  email: string,
  applicationId: string,
) {
  const link = `${BASE_URL}/applications/${applicationId}`;

  const message: EmailMessage = {
    senderAddress: process.env.AZURE_COMMUNICATION_SENDER_ADDRESS ?? "",
    content: {
      subject: "Application submitted",
      html: `Your application has been submitted. You can track it <a style={{
        color: 'blue',
        textDecoration: 'underline'
      
      }} href="${link}">here</a>`,
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
    throw new Error("Failed to send application confirmation email");
  }
}
