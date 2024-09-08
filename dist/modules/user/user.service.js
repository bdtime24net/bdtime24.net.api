"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileService = exports.getUserDashboardService = exports.getUsersService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const getUsersService = async () => {
    const users = await prisma_1.default.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!users) {
        throw new Error("Users not found");
    }
    return users;
};
exports.getUsersService = getUsersService;
const getUserDashboardService = async (userId) => {
    const user = await prisma_1.default.user.findMany({
        where: {
            id: userId,
        },
        select: {
            id: true,
            username: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
exports.getUserDashboardService = getUserDashboardService;
const getUserProfileService = async (userId) => {
    const user = await prisma_1.default.user.findMany({
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
    return user;
};
exports.getUserProfileService = getUserProfileService;
//# sourceMappingURL=user.service.js.map