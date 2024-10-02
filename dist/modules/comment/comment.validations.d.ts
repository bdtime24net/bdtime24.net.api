import { z } from "zod";
export declare const commentValidationSchema: z.ZodObject<{
    id: z.ZodString;
    body: z.ZodString;
    articleId: z.ZodString;
    userId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    user: z.ZodObject<{
        id: z.ZodString;
        username: z.ZodString;
        avatar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        username: string;
        avatar: string;
    }, {
        id: string;
        username: string;
        avatar: string;
    }>;
    article: z.ZodObject<{
        id: z.ZodString;
        headline: z.ZodString;
        description: z.ZodString;
        sourceName: z.ZodString;
        url: z.ZodString;
        urlToImage: z.ZodArray<z.ZodString, "many">;
        categoryId: z.ZodString;
        userId: z.ZodString;
        tagId: z.ZodString;
        keywords: z.ZodArray<z.ZodString, "many">;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        url: string;
        id: string;
        description: string;
        headline: string;
        keywords: string[];
        sourceName: string;
        urlToImage: string[];
        categoryId: string;
        userId: string;
        tagId: string;
        createdAt: Date;
        updatedAt: Date;
    }, {
        url: string;
        id: string;
        description: string;
        headline: string;
        keywords: string[];
        sourceName: string;
        urlToImage: string[];
        categoryId: string;
        userId: string;
        tagId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    body: string;
    userId: string;
    createdAt: Date;
    article: {
        url: string;
        id: string;
        description: string;
        headline: string;
        keywords: string[];
        sourceName: string;
        urlToImage: string[];
        categoryId: string;
        userId: string;
        tagId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    updatedAt: Date;
    user: {
        id: string;
        username: string;
        avatar: string;
    };
    articleId: string;
}, {
    id: string;
    body: string;
    userId: string;
    createdAt: Date;
    article: {
        url: string;
        id: string;
        description: string;
        headline: string;
        keywords: string[];
        sourceName: string;
        urlToImage: string[];
        categoryId: string;
        userId: string;
        tagId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    updatedAt: Date;
    user: {
        id: string;
        username: string;
        avatar: string;
    };
    articleId: string;
}>;
export type TComment = z.infer<typeof commentValidationSchema>;
