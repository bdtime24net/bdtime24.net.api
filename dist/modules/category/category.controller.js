"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.getCategoriesController = exports.categoryController = void 0;
const category_validation_1 = require("./category.validation");
const category_services_1 = require("./category.services");
const categoryController = async (req, res, next) => {
    try {
        const parsedBody = category_validation_1.categoryValidationSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.errors[0].message });
        }
        const categoryData = await (0, category_services_1.createCategoryService)(parsedBody.data);
        return res.status(201).json({
            success: true,
            data: categoryData,
            message: "Category created successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.categoryController = categoryController;
const getCategoriesController = async (req, res, next) => {
    try {
        const categories = await (0, category_services_1.getCategoriesService)();
        return res.status(200).json({
            success: true,
            data: categories,
            message: "Categories retrieved successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoriesController = getCategoriesController;
const updateCategoryController = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const parsedBody = category_validation_1.categoryValidationSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.errors[0].message });
        }
        const updatedCategory = await (0, category_services_1.updateCategoryService)(categoryId, parsedBody.data);
        return res.status(200).json({
            success: true,
            data: updatedCategory,
            message: "Category updated successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        await (0, category_services_1.deleteCategoryService)(categoryId);
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategoryController = deleteCategoryController;
//# sourceMappingURL=category.controller.js.map