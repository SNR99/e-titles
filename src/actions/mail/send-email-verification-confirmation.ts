"use server";

import { BASE_URL } from "@/lib/utils";
import { EmailClient, EmailMessage } from "@azure/communication-email";

const connectionString =
  process.env.AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING ?? "";
const emailClient = new EmailClient(connectionString);

export default async function sendVerificationConfirmation(email: string) {
  const link = `${BASE_URL}/sign-in`;

  const message: EmailMessage = {
    senderAddress: process.env.AZURE_COMMUNICATION_SENDER_ADDRESS ?? "",
    content: {
      subject: "Account verified",
      html: `Your email has been verified, sign in to use the platform on <a style={{
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
    throw new Error("Failed to send verification confirmation email");
  }
}
