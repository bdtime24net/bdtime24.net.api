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
    const categories = await prisma.newsCategory.findMany();
    return categories;
}