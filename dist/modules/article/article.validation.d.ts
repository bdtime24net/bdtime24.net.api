import { z } from "zod";
export declare const ArticleSchema: z.ZodObject<{
    headline: z.ZodString;
    slug: z.ZodString;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    description: z.ZodString;
    sourceName: z.ZodString;
    url: z.ZodString;
    urlToImage: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    categoryId: z.ZodString;
    userId: z.ZodString;
    tagId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    description: string;
    headline: string;
    slug: string;
    sourceName: string;
    categoryId: string;
    userId: string;
    tagId: string;
    keywords?: string[] | undefined;
    urlToImage?: string[] | undefined;
}, {
    url: string;
    description: string;
    headline: string;
    slug: string;
    sourceName: string;
    categoryId: string;
    userId: string;
    tagId: string;
    keywords?: string[] | undefined;
    urlToImage?: string[] | undefined;
}>;
export type IArticle = z.infer<typeof ArticleSchema>;
export declare const GetArticlesOptionsSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    fields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    sort: z.ZodOptional<z.ZodObject<{
        field: z.ZodDefault<z.ZodString>;
        order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        field: string;
        order: "asc" | "desc";
    }, {
        field?: string | undefined;
        order?: "asc" | "desc" | undefined;
    }>>;
    query: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    filter: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    category: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodObject<{
        from: z.ZodOptional<z.ZodDate>;
        to: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        from?: Date | undefined;
        to?: Date | undefined;
    }, {
        from?: Date | undefined;
        to?: Date | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
    category?: string | undefined;
    sort?: {
        field: string;
        order: "asc" | "desc";
    } | undefined;
    filter?: Record<string, any> | undefined;
    date?: {
        from?: Date | undefined;
        to?: Date | undefined;
    } | undefined;
    search?: string | undefined;
    fields?: string[] | undefined;
    page?: number | undefined;
    query?: string | undefined;
    author?: string | undefined;
}, {
    limit?: number | undefined;
    category?: string | undefined;
    sort?: {
        field?: string | undefined;
        order?: "asc" | "desc" | undefined;
    } | undefined;
    filter?: Record<string, any> | undefined;
    date?: {
        from?: Date | undefined;
        to?: Date | undefined;
    } | undefined;
    search?: string | undefined;
    fields?: string[] | undefined;
    page?: number | undefined;
    query?: string | undefined;
    author?: string | undefined;
}>;
export type IGetArticlesOptions = z.infer<typeof GetArticlesOptionsSchema>;
export declare const updateArticleSchema: z.ZodObject<{
    headline: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    sourceName: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    urlToImage: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    categoryId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    tagId: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    description?: string | undefined;
    headline?: string | undefined;
    keywords?: string[] | undefined;
    sourceName?: string | undefined;
    urlToImage?: string[] | undefined;
    categoryId?: string | undefined;
    userId?: string | undefined;
    tagId?: string | undefined;
}, {
    url?: string | undefined;
    description?: string | undefined;
    headline?: string | undefined;
    keywords?: string[] | undefined;
    sourceName?: string | undefined;
    urlToImage?: string[] | undefined;
    categoryId?: string | undefined;
    userId?: string | undefined;
    tagId?: string | undefined;
}>;
