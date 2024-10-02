import { TComment } from "./comment.validations";
import prisma from "../../utils/prisma";

export const createCommentService = async (payload: TComment) => {
    const comment = await prisma.comment.create({
        data: {
            ...payload
        },
    });
    return comment;
}