import { z } from "zod";

export const ArticleSchema = z.object({
  sourceName: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
  urlToImage: z.string().url().optional(),
  content: z.string().optional(),
  categoryId: z.string().cuid(),
  userId: z.string().cuid().optional(),
  tagId: z.string().cuid(),
  publishedAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type IArticle = z.infer<typeof ArticleSchema>;
