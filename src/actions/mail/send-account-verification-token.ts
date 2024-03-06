"use server";

import { BASE_URL } from "@/lib/utils";
import { EmailClient, EmailMessage } from "@azure/communication-email";

const connectionString =
  process.env.AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING ?? "";
const emailClient = new EmailClient(connectionString);

export default async function sendAccountVerificationToken(
  organization: string,
  email: string,
  token: string,
) {
  const link = `${BASE_URL}/verify-account?email=${email}&token=${token}`;

  const message: EmailMessage = {
    senderAddress: process.env.AZURE_COMMUNICATION_SENDER_ADDRESS ?? "",
    content: {
      subject: `Join ${organization} organization`,
      html: `
      <h1>Hi there,</h1>
      <p>You've been invited to join ${organization}. Please click the link below to activate your account and get started:</p>
      <p><a href="${link}" style="color: blue; text-decoration: underline;">Verify account</a></p>
      <p>This link is valid for 24 hours. If you didn't request this invitation, you can safely disregard this email.</p>

      <h2>Here's how to set up your account:</h2>
      <ol>
        <li>Click the link above to activate your account and set a new password.</li>
        <li>Confirm your email address to complete the setup process.</li>
      </ol>

      <p>If you encounter any difficulties, feel free to contact our support team: <a href="">link</a>
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
