import { ICategory } from "./category.validation";
export declare const createCategoryService: (categoryData: ICategory) => Promise<{
    id: string;
    name: string;
}>;
export declare const getCategoriesService: () => Promise<{
    id: string;
    name: string;
}[]>;
export declare const updateCategoryService: (id: string, categoryData: ICategory) => Promise<{
    id: string;
    name: string;
}>;
export declare const deleteCategoryService: (id: string) => Promise<void>;
