import { z } from "zod";
export declare const newsValidationSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        subtitle: z.ZodString;
        location: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        content: z.ZodOptional<z.ZodString>;
        authorId: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        views: z.ZodOptional<z.ZodNumber>;
        likes: z.ZodOptional<z.ZodNumber>;
        commentsCount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        subtitle: string;
        description: string;
        location?: string | undefined;
        category?: string | undefined;
        content?: string | undefined;
        authorId?: string | undefined;
        imageUrl?: string | undefined;
        link?: string | undefined;
        tags?: string[] | undefined;
        views?: number | undefined;
        likes?: number | undefined;
        commentsCount?: number | undefined;
    }, {
        title: string;
        subtitle: string;
        description: string;
        location?: string | undefined;
        category?: string | undefined;
        content?: string | undefined;
        authorId?: string | undefined;
        imageUrl?: string | undefined;
        link?: string | undefined;
        tags?: string[] | undefined;
        views?: number | undefined;
        likes?: number | undefined;
        commentsCount?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        title: string;
        subtitle: string;
        description: string;
        location?: string | undefined;
        category?: string | undefined;
        content?: string | undefined;
        authorId?: string | undefined;
        imageUrl?: string | undefined;
        link?: string | undefined;
        tags?: string[] | undefined;
        views?: number | undefined;
        likes?: number | undefined;
        commentsCount?: number | undefined;
    };
}, {
    body: {
        title: string;
        subtitle: string;
        description: string;
        location?: string | undefined;
        category?: string | undefined;
        content?: string | undefined;
        authorId?: string | undefined;
        imageUrl?: string | undefined;
        link?: string | undefined;
        tags?: string[] | undefined;
        views?: number | undefined;
        likes?: number | undefined;
        commentsCount?: number | undefined;
    };
}>;
