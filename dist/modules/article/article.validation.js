"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleSchema = exports.GetArticlesOptionsSchema = exports.ArticleSchema = void 0;
const zod_1 = require("zod");
exports.ArticleSchema = zod_1.z.object({
    headline: zod_1.z
        .string({
        required_error: "Headline is required",
        invalid_type_error: "Headline must be a string",
    })
        .min(1, "Headline cannot be empty"),
    slug: zod_1.z
        .string({
        required_error: "Slug is required",
        invalid_type_error: "Slug must be a string",
    })
        .min(1, "Slug cannot be empty"),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z
        .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    })
        .min(1, "Description cannot be empty"),
    sourceName: zod_1.z
        .string({
        required_error: "Source name is required",
        invalid_type_error: "Source name must be a string",
    })
        .min(1, "Source name cannot be empty"),
    url: zod_1.z
        .string({
        required_error: "Url is required",
        invalid_type_error: "Url must be a string",
    })
        .min(1, "Url cannot be empty"),
    urlToImage: zod_1.z.array(zod_1.z.string()).optional(),
    categoryId: zod_1.z
        .string({
        required_error: "Category id is required",
        invalid_type_error: "Category id must be a string",
    })
        .min(1, "Category id cannot be empty"),
    userId: zod_1.z
        .string({
        required_error: "User id is required",
        invalid_type_error: "User id must be a string",
    })
        .min(1, "User id cannot be empty"),
    tagId: zod_1.z
        .string({
        required_error: "Tag id is required",
        invalid_type_error: "Tag id must be a string",
    })
        .min(1, "Tag id cannot be empty"),
});
const SortSchema = zod_1.z.object({
    field: zod_1.z.string().default('createdAt'),
    order: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
const DateRangeSchema = zod_1.z.object({
    from: zod_1.z.string().datetime().optional(),
    to: zod_1.z.string().datetime().optional(),
});
exports.GetArticlesOptionsSchema = zod_1.z.object({
    page: zod_1.z
        .number({
        invalid_type_error: "Page must be a number",
    })
        .int("Page must be an integer")
        .min(1, "Page must be at least 1")
        .optional()
        .default(1),
    limit: zod_1.z
        .number({
        invalid_type_error: "Limit must be a number",
    })
        .min(1, "Limit must be at least 1")
        .optional()
        .default(10),
    fields: zod_1.z.array(zod_1.z.string()).optional(),
    sort: SortSchema.optional(),
    query: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    filter: zod_1.z.record(zod_1.z.any()).optional(),
    category: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    date: DateRangeSchema.optional(),
    syncMode: zod_1.z.boolean().optional().default(false),
});
exports.updateArticleSchema = zod_1.z.object({
    headline: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    sourceName: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    urlToImage: zod_1.z.array(zod_1.z.string()).optional(),
    categoryId: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional(),
    tagId: zod_1.z.string().optional(),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=article.validation.js.map