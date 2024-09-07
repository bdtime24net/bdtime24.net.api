import { z } from "zod";

export const ArticleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title cannot be empty"),

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
    .string({
      required_error: "Url to image is required",
      invalid_type_error: "Url to image must be a string",
    })
    .min(1, "Url to image cannot be empty"),
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