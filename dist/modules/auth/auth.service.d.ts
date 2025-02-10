import { Isignin, Isignup, Iupdate } from "./auth.validator";
export declare const signupService: (signupData: Isignup, req: any) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    role: import(".prisma/client").$Enums.Role;
}>;
export declare const signinService: (signinData: Isignin, req: any) => Promise<{
    user: {
        id: string;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
}>;
export declare const updateService: (id: string, updateData: Iupdate) => Promise<{
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    };
    token: string;
}>;
export declare const deleteAccountService: (userId: string) => Promise<void>;
export declare const changePasswordService: (userId: string, oldPassword: string, newPassword: string) => Promise<void>;
export declare const forgotPasswordService: (email: string) => Promise<void>;
export declare const logoutService: (req: any, res: any) => Promise<void>;
