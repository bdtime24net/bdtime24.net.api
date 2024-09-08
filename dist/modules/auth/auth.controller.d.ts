import { Request, Response, NextFunction } from "express";
export declare const signupController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const signinController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const updateController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const deleteAccountController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const changePasswordController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const forgotPasswordController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const logoutController: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
