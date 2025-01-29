import { z } from "zod";

// Article Schema
export const ArticleSchema = z.object({
  headline: z
    .string({ required_error: "Headline is required" })
    .min(1, "Headline cannot be empty"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description cannot be empty"),
    reporter: z
    .string({ required_error: "Reporter name is required" })
    .min(1, "Reporter name cannot be empty")
    .optional(),
  keywords: z.array(z.string()).optional(),
  sourceName: z
    .string({ required_error: "Source name is required" })
    .min(1, "Source name cannot be empty"),
  url: z
    .string({ required_error: "URL is required" })
    .url("Invalid URL format"),
  urlToImage: z.array(z.string().url("Invalid image URL format")).optional(),
  categoryId: z
    .string({ required_error: "Category ID is required" })
    .min(1, "Category ID cannot be empty"),
  userId: z
    .string({ required_error: "User ID is required" })
    .min(1, "User ID cannot be empty"),
  tagId: z.string().min(1, "Tag ID cannot be empty").optional(), // Single tag
  tags: z.array(z.string()).optional(), // For many-to-many relationship
  publishedAt: z.string().datetime().optional(), // Ensure ISO 8601 datetime format
  updatedAt: z.string().datetime().optional(),
});

export type IArticle = z.infer<typeof ArticleSchema>;


// Sorting Schema
const SortSchema = z.object({
  field: z.string().default("createdAt"), // Default sorting field
  order: z.enum(["asc", "desc"]).default("desc"), // Sorting order
});

// Date Range Schema (for filtering)
const DateRangeSchema = z.object({
  from: z.date().optional(),
  to: z.date().optional(),
});

// **Query Options Schema**
export const GetArticlesOptionsSchema = z.object({
  page: z
    .number({ invalid_type_error: "Page must be a number" })
    .int()
    .min(1, "Page must be at least 1")
    .default(1), // Default to page 1

  limit: z
    .number({ invalid_type_error: "Limit must be a number" })
    .int()
    .min(1, "Limit must be at least 1")
    .default(10), // Default to 10 items per page

  fields: z.array(z.string()).optional(), // Specify which fields to return
  sort: SortSchema.optional(), // Sorting options
  query: z.string().optional(), // General search query
  search: z.string().optional(), // Specific search term
  filter: z.record(z.any()).optional(), // General filters
  category: z.string().optional(), // Filter by category
  author: z.string().optional(), // Filter by author
  date: DateRangeSchema.optional(), // Filter by date range
  syncMode: z.boolean().default(false), // Default to false
});

export type IGetArticlesOptions = z.infer<typeof GetArticlesOptionsSchema>;


// **Update Article Schema**
export const updateArticleSchema = z.object({
  headline: z.string().optional(),
  description: z.string().optional(),
  reporter: z.string().optional(),
  sourceName: z.string().optional(),
  url: z.string().url().optional(),
  urlToImage: z.array(z.string().url()).optional(),
  categoryId: z.string().optional(),
  userId: z.string().optional(),
  tagId: z.string().optional(), // Single tag
  tags: z.array(z.string()).optional(), // Multi-tag support
  keywords: z.array(z.string()).optional(),
  updatedAt: z.string().datetime().optional(),
});
