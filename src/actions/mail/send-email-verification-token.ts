"use server";

import { BASE_URL } from "@/lib/utils";
import { EmailClient, EmailMessage } from "@azure/communication-email";

const connectionString =
  process.env.AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING ?? "";
const emailClient = new EmailClient(connectionString);

export default async function sendVerificationToken(
  email: string,
  token: string,
) {
  const link = `${BASE_URL}/verify-email?email=${email}&token=${token}`;

  const message: EmailMessage = {
    senderAddress: process.env.AZURE_COMMUNICATION_SENDER_ADDRESS ?? "",
    content: {
      subject: "Verify your email",
      html: `Click on the link to verify your email: <a style={{
        color: 'blue',
        textDecoration: 'underline'
      
      }} href="${link}">Verify Email</a>`,
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
