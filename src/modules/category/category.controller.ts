import { Request, Response, NextFunction } from "express";
import {categoryValidationSchema} from './category.validation'
import { createCategoryService, getCategoriesService } from "./category.services";

export const categoryController = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const parsedBody = categoryValidationSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res
            .status(400)
            .json({ error: parsedBody.error.errors[0].message });
    }
   
    const categoryData = await createCategoryService(parsedBody.data);
    return res.status(201).json({
        success: true,
        data: categoryData,
        message: "Category created successfully",
        error: null,
    });
   } catch (error) {
    next(error);
   }
};


// Controller function to get all categories
export const getCategoriesController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const categories = await getCategoriesService();
        return res.status(200).json({
            success: true,
            data: categories,
            message: "Categories retrieved successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    }
};
