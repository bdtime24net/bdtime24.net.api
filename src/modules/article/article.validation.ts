import { z } from "zod";

export const articleValidationSchema = z.object({
  id: z.string().optional(),
  authorId: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().optional().default(false),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
  tags: z.array(z.string()).optional(),
});
