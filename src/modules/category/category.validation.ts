import {z} from "zod";


export const categoryValidationSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
});

export type ICategory = z.infer<typeof categoryValidationSchema>;