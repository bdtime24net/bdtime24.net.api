import {z} from "zod";


export const commentValidationSchema = z.object({
        id: z.string(),
        body: z.string(),
        articleId: z.string(),
        userId: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        user: z.object({
            id: z.string(),
            username: z.string(),
            avatar: z.string(),
        }),
        article: z.object({
            id: z.string(),
            headline: z.string(),
            description: z.string(),
            sourceName: z.string(),
            url: z.string(),
            urlToImage: z.array(z.string()),
            categoryId: z.string(),
            userId: z.string(),
            tagId: z.string(),
            keywords: z.array(z.string()),
            createdAt: z.date(),
            updatedAt: z.date(),
        }),
    });



export type TComment = z.infer<typeof commentValidationSchema>;