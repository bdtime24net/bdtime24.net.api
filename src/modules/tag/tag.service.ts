import prisma from "../../utils/prisma";
import {ITag} from './tag.validation'



// Service function to create a new tag
export const createTagService = async (tagData: ITag) => {
    const tag = await prisma.tag.create({
        data: {
            ...tagData
        }
    })
    return tag
}


// Service function to get all tags
export const getTagsService = async () => {
    const tags = await prisma.tag.findMany()
    return tags
}


// Service function to update a tag
export const updateTagService = async (id: string, tagData: ITag) => {
    const updatedTag = await prisma.tag.update({
        where: { id },
        data: { ...tagData },
    });
    return updatedTag;
}

// Service function to delete a tag
export const deleteTagService = async (id: string) => {
    await prisma.tag.delete({
        where: { id },
    });
}