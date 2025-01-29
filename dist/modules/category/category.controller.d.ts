import { Request, Response, NextFunction } from "express";
export declare const categoryController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCategoriesController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const updateCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
