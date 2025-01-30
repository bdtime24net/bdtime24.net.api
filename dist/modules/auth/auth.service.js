"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutService = exports.forgotPasswordService = exports.changePasswordService = exports.deleteAccountService = exports.updateService = exports.signinService = exports.signupService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
const crypto_1 = __importDefault(require("crypto"));
const generateJWT_1 = require("../../utils/generateJWT");
const signupService = async (signupData, req) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email: signupData.email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(signupData.password, salt);
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"] || "";
    const user = await prisma_1.default.user.create({
        data: {
            ...signupData,
            password: hashedPassword,
            ipAddress,
            userAgent,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return user;
};
exports.signupService = signupService;
const signinService = async (signinData, req) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email: signinData.email,
        },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcryptjs_1.default.compare(signinData.password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const token = (0, generateJWT_1.generateJWT)({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"] || "";
    await prisma_1.default.user.update({
        where: { id: user.id },
        data: {
            ipAddress,
            userAgent,
        },
    });
    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        token,
    };
};
exports.signinService = signinService;
const updateService = async (id, updateData) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        role: user.role,
    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    const updatedUser = await prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            ...updateData,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return {
        user: updatedUser,
        token,
    };
};
exports.updateService = updateService;
const deleteAccountService = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    await prisma_1.default.user.delete({
        where: { id: userId },
    });
};
exports.deleteAccountService = deleteAccountService;
const changePasswordService = async (userId, oldPassword, newPassword) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordMatch = await bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
        throw new Error("Old password is incorrect");
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
    await prisma_1.default.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
};
exports.changePasswordService = changePasswordService;
const forgotPasswordService = async (email) => {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }
    const resetToken = crypto_1.default.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;
    await prisma_1.default.user.update({
        where: { email },
        data: {
            resetPasswordToken: resetToken,
            resetPasswordExpires: new Date(resetTokenExpiry),
        },
    });
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await (0, sendEmail_1.sendEmail)({
        to: email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    });
};
exports.forgotPasswordService = forgotPasswordService;
const logoutService = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
};
exports.logoutService = logoutService;
//# sourceMappingURL=auth.service.js.map