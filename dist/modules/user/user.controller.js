"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileController = exports.getUserDashboardController = exports.getUsersController = void 0;
const user_service_1 = require("./user.service");
const getUsersController = async (req, res, next) => {
    try {
        const users = await (0, user_service_1.getUsersService)();
        return res.status(200).json({
            success: true,
            data: users,
            message: "Users retrieved successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsersController = getUsersController;
const getUserDashboardController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.getUserDashboardService)(id);
        return res.status(200).json({
            success: true,
            data: user,
            message: "User dashboard retrieved successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserDashboardController = getUserDashboardController;
const getUserProfileController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.getUserProfileService)(id);
        res.status(200).json({
            success: true,
            data: user,
            message: "User profile retrieved successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserProfileController = getUserProfileController;
//# sourceMappingURL=user.controller.js.map