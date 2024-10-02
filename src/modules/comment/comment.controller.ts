import { Request, Response, NextFunction } from "express";
import {commentValidationSchema} from './comment.validations'
import { createCommentService } from './comment.services'


export const createCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await createCommentService(req.body);
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
}