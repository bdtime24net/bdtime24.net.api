import prisma from "../../utils/prisma";
import {ITag} from './tag.validation'




export const createTagService = async (tagData: ITag) => {
    const tag = await prisma.tag.create({
        data: {
            ...tagData
        }
    })
    return tag
}