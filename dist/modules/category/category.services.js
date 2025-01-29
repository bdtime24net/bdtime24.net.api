"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.getCategoriesService = exports.createCategoryService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createCategoryService = async (categoryData) => {
    const existingCategory = await prisma_1.default.newsCategory.findUnique({
        where: {
            name: categoryData.name
        }
    });
    if (existingCategory) {
        throw new Error("Category already exists");
    }
    const category = await prisma_1.default.newsCategory.create({
        data: {
            ...categoryData,
        },
        select: {
            id: true,
            name: true
        }
    });
    return category;
};
exports.createCategoryService = createCategoryService;
const getCategoriesService = async () => {
    const categories = await prisma_1.default.newsCategory.findMany();
    return categories;
};
exports.getCategoriesService = getCategoriesService;
const updateCategoryService = async (id, categoryData) => {
    const updatedCategory = await prisma_1.default.newsCategory.update({
        where: { id },
        data: { ...categoryData },
    });
    return updatedCategory;
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    await prisma_1.default.newsCategory.delete({
        where: { id },
    });
};
exports.deleteCategoryService = deleteCategoryService;
//# sourceMappingURL=category.services.js.map