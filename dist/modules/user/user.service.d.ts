export declare const getUsersService: () => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    role: import(".prisma/client").$Enums.Role;
}[]>;
export declare const getUserDashboardService: (userId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    role: import(".prisma/client").$Enums.Role;
}[]>;
export declare const getUserProfileService: (userId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    role: import(".prisma/client").$Enums.Role;
}[]>;
