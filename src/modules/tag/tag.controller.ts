import { NextFunction, Request, Response } from "express";
import {createTagService} from './tag.service'
import {tagValidationSchema} from './tag.validation'


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
        const tagData = await createTagService(parsedBody.data);
        return res.status(201).json({
            success: true,
            data: tagData,
            message: "Tag created successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    }
}