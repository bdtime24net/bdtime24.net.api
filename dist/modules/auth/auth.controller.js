"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.forgotPasswordController = exports.changePasswordController = exports.deleteAccountController = exports.updateController = exports.signinController = exports.signupController = void 0;
const auth_service_1 = require("./auth.service");
const auth_validaton_1 = require("./auth.validaton");
const signupController = async (req, res, next) => {
    try {
        const parsedBody = auth_validaton_1.signupValidation.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ error: parsedBody.error.errors });
        }
        const user = await (0, auth_service_1.signupService)(parsedBody.data, req);
        res.status(201).json({
            success: true,
            data: user,
            message: "User created successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signupController = signupController;
const signinController = async (req, res, next) => {
    try {
        const parsedBody = auth_validaton_1.signinValidation.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ error: parsedBody.error.errors });
        }
        const { token } = await (0, auth_service_1.signinService)(parsedBody.data, req);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success: true,
            token: token,
            message: "User signed in successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signinController = signinController;
const updateController = async (req, res, next) => {
    try {
        const parsedBody = auth_validaton_1.updateValidation.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.errors[0].message });
        }
        const userId = req.params.id;
        const { user: updatedUser, token } = await (0, auth_service_1.updateService)(userId, parsedBody.data);
        res.status(200).json({
            success: true,
            data: {
                user: updatedUser,
                token: token,
            },
            message: "User updated successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateController = updateController;
const deleteAccountController = async (req, res, next) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
                error: null,
            });
        }
        await (0, auth_service_1.deleteAccountService)(userId);
        res.status(200).json({
            success: true,
            message: "Account deleted successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAccountController = deleteAccountController;
const changePasswordController = async (req, res, next) => {
    try {
        const parsedBody = auth_validaton_1.changePasswordValidation.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ error: parsedBody.error.errors });
        }
        const userId = req.params.id;
        await (0, auth_service_1.changePasswordService)(userId, parsedBody.data.oldPassword, parsedBody.data.newPassword);
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.changePasswordController = changePasswordController;
const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body;
        await (0, auth_service_1.forgotPasswordService)(email);
        res.status(200).json({
            success: true,
            message: "Password reset email sent",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPasswordController = forgotPasswordController;
const logoutController = async (req, res, next) => {
    try {
        await (0, auth_service_1.logoutService)(req, res);
        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logoutController = logoutController;
//# sourceMappingURL=auth.controller.js.map