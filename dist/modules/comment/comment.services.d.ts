import { TComment } from "./comment.validations";
export declare const createCommentService: (payload: TComment) => Promise<{
    id: string;
    body: string;
    articleId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
