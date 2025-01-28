import { Request, Response, NextFunction } from "express";
export declare const createNewsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllNewsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getNewsByIdController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getNewsByTitleController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateNewsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteNewsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
