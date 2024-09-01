// src/utils/sendEmail.ts
import nodemailer from "nodemailer";

// Configure Nodemailer to use MailHog
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "127.0.0.1",
  port: parseInt(process.env.SMTP_PORT || "1025"),
  secure: false,
  ignoreTLS: true,
  auth: undefined,
});

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: EmailOptions) => {
  const mailOptions = {
    from: '"Your App Name" <noreply@yourapp.com>', // Sender address
    to, // List of receivers
    subject, // Subject line
    text, // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};
