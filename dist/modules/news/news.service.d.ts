import { INews } from "./news.interface";
export declare const createNewsService: (newsData: INews) => Promise<INews>;
export declare const getAllNewsService: (page: number, limit: number, sortField: string, sortOrder: "asc" | "desc", filter: Partial<INews>, searchQuery: string) => Promise<{
    articles: INews[];
    total: number;
    nextPage: string | null;
    prevPage: string | null;
}>;
export declare const getNewsByIdService: (id: string) => Promise<INews | null>;
export declare const updateNewsService: (id: string, newsData: Partial<INews>) => Promise<INews | null>;
export declare const deleteNewsService: (id: string) => Promise<INews | null>;
