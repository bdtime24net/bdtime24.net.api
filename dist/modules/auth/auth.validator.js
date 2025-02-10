"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidation = exports.forgotPasswordValidation = exports.updateValidation = exports.signinValidation = exports.signupValidation = void 0;
const zod_1 = require("zod");
exports.signupValidation = zod_1.z.object({
    username: zod_1.z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
    }),
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email("Invalid email address"),
    password: zod_1.z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
});
exports.signinValidation = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email("Invalid email address"),
    password: zod_1.z
        .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    })
        .min(6, "Password must be at least 6 characters long"),
});
exports.updateValidation = zod_1.z.object({
    username: zod_1.z
        .string({
        invalid_type_error: "Username must be a string",
    })
        .min(1, "Username cannot be empty"),
    role: zod_1.z.enum(["USER", "ADMIN"]).default("USER"),
});
exports.forgotPasswordValidation = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email("Invalid email address"),
});
exports.changePasswordValidation = zod_1.z.object({
    oldPassword: zod_1.z
        .string()
        .min(6, "Old password must be at least 6 characters long"),
    newPassword: zod_1.z
        .string()
        .min(6, "New password must be at least 6 characters long"),
});
//# sourceMappingURL=auth.validator.js.map