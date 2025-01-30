interface EmailOptions {
    to: string;
    subject: string;
    text: string;
}
export declare const sendEmail: ({ to, subject, text }: EmailOptions) => Promise<void>;
export {};
