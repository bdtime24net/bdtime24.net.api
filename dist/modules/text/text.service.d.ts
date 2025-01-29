import { IText } from "./text.interface";
export declare const createTextService: (payload: IText) => Promise<import("mongoose").Document<unknown, {}, IText> & IText & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const getAllTextService: (query: Record<string, unknown>) => Promise<IText[]>;
export declare const getTextByIdService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IText> & IText & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
export declare const deleteTextByIdService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IText> & IText & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
export declare const updateTextByIdService: (id: string, payload: Partial<IText>) => Promise<(import("mongoose").Document<unknown, {}, IText> & IText & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
