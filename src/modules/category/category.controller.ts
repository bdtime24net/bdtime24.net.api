import { Request, Response, NextFunction } from "express";
import {categoryValidationSchema} from './category.validation'


export const categoryController = (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = categoryValidationSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res
            .status(400)
            .json({ error: parsedBody.error.errors[0].message });
    }
   
    const categoryData = parsedBody.data;
    res.status(201).json({
        success: true,
        data: categoryData
    });
};
