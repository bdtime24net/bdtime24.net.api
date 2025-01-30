import { IArticle, IGetArticlesOptions } from "./article.validation";
export declare const createArticleService: (articleData: IArticle) => Promise<{
    headline: string;
}>;
export declare const getArticlesService: (articleData: IGetArticlesOptions) => Promise<{
    metadata: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        nextPage: number | null;
        prevPage: number | null;
        articles: {
            [x: string]: {
                id: string;
                body: string;
                articleId: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        }[];
    };
}>;
export declare const getArticleByIdService: (id: string) => Promise<IArticle | null>;
export declare const updateArticleService: (id: string, articleData: IArticle) => Promise<{
    id: string;
    headline: string;
    description: string;
    reporter: string;
    keywords: string[];
    sourceName: string;
    url: string;
    urlToImage: string[];
    categoryId: string;
    userId: string;
    tagId: string;
    publishedAt: Date;
    updatedAt: Date;
}>;
export declare const deleteArticleService: (id: string) => Promise<{
    id: string;
    headline: string;
    description: string;
    reporter: string;
    keywords: string[];
    sourceName: string;
    url: string;
    urlToImage: string[];
    categoryId: string;
    userId: string;
    tagId: string;
    publishedAt: Date;
    updatedAt: Date;
}>;
