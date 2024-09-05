import { z } from "zod";

export const articleValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
  authorId: z.string().optional(),
  sourceName: z.string().optional(),
  author: z.string().optional(),
  url: z.string().optional(),
  urlToImage: z.string().optional(),
  categoryId: z.number(),
  tagId: z.string().optional(),
});

export type IArticle = z.infer<typeof articleValidationSchema>;
