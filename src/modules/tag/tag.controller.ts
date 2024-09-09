import { NextFunction, Request, Response } from "express";
import {createTagService, deleteTagService, getTagsService, updateTagService} from './tag.service'
import {tagValidationSchema} from './tag.validation'

// Controller function to create a tag
export const createTageController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const parsedBody = tagValidationSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.errors[0].message });
        }

    const tagName = parsedBody.data.name;
    
    
    if (!tagName) {
        return res
            .status(400)
            .json({ error: 'Tag name is required' });
    }

    const tagData = await createTagService(parsedBody.data);
    return res.status(201).json({
      success: true,
      data: tagData,
      message: 'Tag created successfully',
      error: null,
    });
    } catch (error) {
        next(error);
    }
}

// Controller function to get all tags
export const getTagsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tags = await getTagsService();
        return res.status(200).json({
            success: true,
            data: tags,
            message: "Tags fetched successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    }
}


// Controller function to update a tag
export const updateTagController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tagId = req.params.id; // Assuming tag ID is provided in URL params
        const parsedBody = tagValidationSchema.safeParse(req.body);

        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.errors[0].message });
        }

        const updatedTag = await updateTagService(tagId, parsedBody.data);
        return res.status(200).json({
            success: true,
            data: updatedTag,
            message: "Tag updated successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    } 
}

// Controller function to delete a tag
export const deleteTagController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tagId = req.params.id; // Assuming tag ID is provided in URL params
        await deleteTagService(tagId);
        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    }
}