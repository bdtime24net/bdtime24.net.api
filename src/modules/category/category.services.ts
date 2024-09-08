import prisma from "../../utils/prisma";
import { ICategory } from "./category.validation";



export const createCategoryService = async (categoryData: ICategory) => {
    // check if category already exists
    const existingCategory = await prisma.newsCategory.findUnique({
        where: {
            name: categoryData.name
        }
    });
    if (existingCategory) {
        throw new Error("Category already exists");
    }

    // create category

    const category = await prisma.newsCategory.create({
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


// Service function to get all categories
export const getCategoriesService = async () => {
    // 
    const categories = await prisma.newsCategory.findMany();
    return categories;
}


// Service function to update a category
export const updateCategoryService = async (id: string, categoryData: ICategory) => {
    const updatedCategory = await prisma.newsCategory.update({
        where: { id },
        data: { ...categoryData },
    });
    return updatedCategory;
}

// Service function to delete a category
export const deleteCategoryService = async (id: string) => {
    await prisma.newsCategory.delete({
        where: { id },
    });
}