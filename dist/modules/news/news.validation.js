"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsValidationSchema = void 0;
const zod_1 = require("zod");
exports.newsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        })
            .min(1, "Title cannot be empty"),
        subtitle: zod_1.z
            .string({
            required_error: "Subtitle is required",
            invalid_type_error: "Subtitle must be a string",
        })
            .min(1, "Subtitle cannot be empty"),
        location: zod_1.z
            .string({
            invalid_type_error: "Location must be a string",
        })
            .optional(),
        category: zod_1.z
            .string({
            invalid_type_error: "Category must be a string",
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        })
            .min(1, "Description cannot be empty"),
        content: zod_1.z
            .string({
            invalid_type_error: "Content must be a string",
        })
            .optional(),
        authorId: zod_1.z
            .string({
            invalid_type_error: "Author ID must be a string",
        })
            .optional(),
        imageUrl: zod_1.z
            .string({
            invalid_type_error: "Image URL must be a string",
        })
            .url("Image URL must be a valid URL")
            .optional(),
        link: zod_1.z
            .string({
            invalid_type_error: "Link must be a string",
        })
            .url("Link must be a valid URL")
            .optional(),
        tags: zod_1.z
            .array(zod_1.z.string({
            invalid_type_error: "Each tag must be a string",
        }))
            .optional(),
        views: zod_1.z
            .number({
            invalid_type_error: "Views must be a number",
        })
            .int("Views must be an integer")
            .nonnegative("Views cannot be negative")
            .optional(),
        likes: zod_1.z
            .number({
            invalid_type_error: "Likes must be a number",
        })
            .int("Likes must be an integer")
            .nonnegative("Likes cannot be negative")
            .optional(),
        commentsCount: zod_1.z
            .number({
            invalid_type_error: "Comments count must be a number",
        })
            .int("Comments count must be an integer")
            .nonnegative("Comments count cannot be negative")
            .optional(),
    }),
});
//# sourceMappingURL=news.validation.js.map