// src/modules/user/user.controller.ts

import { Request, Response, NextFunction } from "express";
import {getUserDashboardService, getUserProfileService, getUsersService} from './user.service'


// Controller function to get all users
export const getUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const users = await getUsersService();

        return res.status(200).json({
            success: true,
            data: users,
            message: "Users retrieved successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    }
}

// Controller function to get a user/dashboard
export const getUserDashboardController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Assuming req.user is populated by the authentication middleware
          // req.params
    const { id } = req.params;


    const user = await getUserDashboardService(id);
    return res.status(200).json({
        success: true,
        data: user,
        message: "User dashboard retrieved successfully",
        error: null,
    });

    } catch (error) {
        next(error);
    }
}


// Controller function to get a Profile
export const getUserProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const user = await getUserProfileService(id);
        res.status(200).json({
            success: true,
            data: user,
            message: "User profile retrieved successfully",
            error: null,
        });
    } catch (error) {
        next(error);
    }
}


// 



