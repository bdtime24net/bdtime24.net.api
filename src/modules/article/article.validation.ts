import { z } from "zod";

export const ArticleSchema = z.object({
  headline: z
    .string({
      required_error: "Headline is required",
      invalid_type_error: "Headline must be a string",
    })
    .min(1, "Headline cannot be empty"),
    keywords: z.array(z.string()).optional(),
    description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description cannot be empty"),
    sourceName: z
    .string({
      required_error: "Source name is required",
      invalid_type_error: "Source name must be a string",
    })
    .min(1, "Source name cannot be empty"),
    url: z
    .string({
      required_error: "Url is required",
      invalid_type_error: "Url must be a string",
    })
    .min(1, "Url cannot be empty"),

    urlToImage: z
    .array(z.string()).optional(),
    categoryId: z
    .string({
      required_error: "Category id is required",
      invalid_type_error: "Category id must be a string",
    })
    .min(1, "Category id cannot be empty"),
    userId: z
    .string({
      required_error: "User id is required",
      invalid_type_error: "User id must be a string",
    })
    .min(1, "User id cannot be empty"),
    tagId: z
    .string({
      required_error: "Tag id is required",
      invalid_type_error: "Tag id must be a string",
    })
    .min(1, "Tag id cannot be empty")
  
})

export type IArticle = z.infer<typeof ArticleSchema>;




// Define schemas for more complex types
const SortSchema = z.object({
  field: z.string().default('createdAt'), // Default sorting field
  order: z.enum(['asc', 'desc']).default('desc'), // Sorting order
});

const DateRangeSchema = z.object({
  from: z.date().optional(),
  to: z.date().optional(),
});

// Main schema for GetArticlesOptions
export const GetArticlesOptionsSchema = z.object({
  page: z
    .number({
      invalid_type_error: "Page must be a number",
    })
    .int("Page must be an integer")
    .min(1, "Page must be at least 1")
    .optional(),
    
  limit: z
    .number({
      invalid_type_error: "Limit must be a number",
    })
    .min(1, "Limit must be at least 1")
    .optional(),
  fields: z.array(z.string()).optional(), // Specify which fields to return
  sort: SortSchema.optional(), // Sorting options
  query: z.string().optional(), // General search query
  search: z.string().optional(), // Specific search term
  filter: z.record(z.any()).optional(), // General filters
  category: z.string().optional(), // Filter by category
  author: z.string().optional(), // Filter by author
  date: DateRangeSchema.optional(), // Filter by date range
});


export type IGetArticlesOptions = z.infer<typeof GetArticlesOptionsSchema>;





export const articleData = {
  
}