import { BASE_URL } from "@/lib/utils";
import { EmailClient, EmailMessage } from "@azure/communication-email";

const connectionString =
  process.env.AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING ?? "";
const emailClient = new EmailClient(connectionString);

export const sendResetPasswordLinkEmail = async (
  email: string,
  token: string,
) => {
  const link = `${BASE_URL}/reset-password?token=${token}`;

  const message: EmailMessage = {
    senderAddress: process.env.AZURE_COMMUNICATION_SENDER_ADDRESS ?? "",
    content: {
      subject: "Reset your password",
      html: `Click on the link to reset your password: <a style={{
        color: 'blue',
        textDecoration: 'underline'
      }} href="${link}">Reset Password</a>`,
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
    throw new Error("Failed to send reset password email");
  }
};
