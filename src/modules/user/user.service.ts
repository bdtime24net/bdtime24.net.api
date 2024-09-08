// src/modules/user/user.service.ts
import prisma from "../../utils/prisma";


// Service function to get all users
export const getUsersService = async () => {
    const users = await prisma.user.findMany(
        {
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        }
    );

    if (!users) {
        throw new Error("Users not found");
    }
    return users;
}

// Service function to user/dashboard
export const getUserDashboardService = async (userId: string) => {

    
    const user = await prisma.user.findMany({
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
}


// Service function to get a user/profile
export const getUserProfileService = async (userId: string) => {
    const user = await prisma.user.findMany({
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
}