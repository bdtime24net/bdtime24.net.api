import { z } from "zod";
export declare const tagValidationSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export type ITag = z.infer<typeof tagValidationSchema>;
