import { z } from "zod";
export declare const categoryValidationSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export type ICategory = z.infer<typeof categoryValidationSchema>;
