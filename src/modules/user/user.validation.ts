import { z } from "zod";

// Define the Zod schema for IUser
export const updateValidation = z.object({
  username: z
    .string({
      invalid_type_error: "Username must be a string",
    })
    .min(1, "Username cannot be empty"),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  role: z
    .string({
      invalid_type_error: "Role must be a string",
    })
    .optional(),
});
