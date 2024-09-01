// src/modules/auth/auth.validation.ts
import { z } from "zod";

// Define the Zod schema for IUser
export const signupValidation = z.object({
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

type Isignup = z.infer<typeof signupValidation>;
export type { Isignup };

// Define the Zod schema for IUser
export const signinValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long"),
});

type Isignin = z.infer<typeof signinValidation>;
export type { Isignin };
