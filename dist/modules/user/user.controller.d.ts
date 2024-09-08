import { Request, Response, NextFunction } from "express";
export declare const getUsersController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const getUserDashboardController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const getUserProfileController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
