"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST || "127.0.0.1",
    port: parseInt(process.env.SMTP_PORT || "1025"),
    secure: false,
    ignoreTLS: true,
    auth: undefined,
});
const sendEmail = async ({ to, subject, text }) => {
    const mailOptions = {
        from: '"Your App Name" <noreply@yourapp.com>',
        to,
        subject,
        text,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending email");
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map