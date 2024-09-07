import prisma from "../../utils/prisma";
import { ICategory } from "./category.validation";
export const createCategoryService = async (payload: ICategory) => {
    const result = await prisma.category.create(payload);
};