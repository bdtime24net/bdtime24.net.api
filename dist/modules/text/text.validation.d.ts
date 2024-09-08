import { z } from 'zod';
export declare const textValidationSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodString;
        avatar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        avatar: string;
    }, {
        name: string;
        email: string;
        avatar: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        email: string;
        avatar: string;
    };
}, {
    body: {
        name: string;
        email: string;
        avatar: string;
    };
}>;
