import { IArticle, IGetArticlesOptions } from "./article.validation";
export declare const createArticleService: (aeticleData: IArticle) => Promise<{
    headline: string;
}>;
export declare const getArticlesService: (articleData: IGetArticlesOptions) => Promise<{
    articles: {
        id: string;
        headline: string;
        slug: string;
        keywords: string[];
        sourceName: string;
        url: string;
        urlToImage: string[];
        description: string;
        categoryId: string;
        userId: string;
        tagId: string;
        publishedAt: Date;
        updatedAt: Date;
    }[];
    totalCount: number;
    totalPages: number;
    nextLink: string | null;
    prevLink: string | null;
}>;
export declare const getArticleBySlugService: (slug: string) => Promise<IArticle | null>;
export declare const getLatestArticlesService: (limit?: number) => Promise<IArticle[]>;
export declare const updateArticleService: (id: string, articleData: IArticle) => Promise<{
    id: string;
    headline: string;
    slug: string;
    keywords: string[];
    sourceName: string;
    url: string;
    urlToImage: string[];
    description: string;
    categoryId: string;
    userId: string;
    tagId: string;
    publishedAt: Date;
    updatedAt: Date;
}>;
export declare const deleteArticleService: (id: string) => Promise<{
    id: string;
    headline: string;
    slug: string;
    keywords: string[];
    sourceName: string;
    url: string;
    urlToImage: string[];
    description: string;
    categoryId: string;
    userId: string;
    tagId: string;
    publishedAt: Date;
    updatedAt: Date;
}>;
