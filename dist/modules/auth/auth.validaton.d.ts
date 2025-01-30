import { z } from "zod";
export declare const signupValidation: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
type Isignup = z.infer<typeof signupValidation>;
export type { Isignup };
export declare const signinValidation: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
type Isignin = z.infer<typeof signinValidation>;
export type { Isignin };
export declare const updateValidation: z.ZodObject<{
    username: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["USER", "ADMIN"]>>;
}, "strip", z.ZodTypeAny, {
    username: string;
    role: "USER" | "ADMIN";
}, {
    username: string;
    role?: "USER" | "ADMIN" | undefined;
}>;
export type Iupdate = z.infer<typeof updateValidation>;
export declare const forgotPasswordValidation: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
type IforgotPassword = z.infer<typeof forgotPasswordValidation>;
export type { IforgotPassword };
export declare const changePasswordValidation: z.ZodObject<{
    oldPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    oldPassword: string;
    newPassword: string;
}, {
    oldPassword: string;
    newPassword: string;
}>;
