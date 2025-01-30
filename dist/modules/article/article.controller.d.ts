import { Request, Response, NextFunction } from "express";
export declare const createArticleController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const getArticlesController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const getArticleByIdController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateArticleController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const deleteArticleController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
