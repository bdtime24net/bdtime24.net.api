import { Request, Response, NextFunction } from "express";
import {categoryValidationSchema} from './category.validation'
import { createCategoryService, deleteCategoryService, getCategoriesService, updateCategoryService } from "./category.services";

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


// Controller function to update a category
export const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id; // Assuming category ID is provided in URL params
        const parsedBody = categoryValidationSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.errors[0].message });
        }

        const updatedCategory = await updateCategoryService(categoryId, parsedBody.data);
        return res.status(200).json({
            success: true,
            data: updatedCategory,
            message: "Category updated successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    } 
}


// Controller function to delete a category
export const deleteCategoryController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categoryId = req.params.id; // Assuming category ID is provided in URL params
        await deleteCategoryService(categoryId);
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    }
};
