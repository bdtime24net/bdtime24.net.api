import { ITag } from './tag.validation';
export declare const createTagService: (tagData: ITag) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
}>;
export declare const getTagsService: () => Promise<{
    id: string;
    name: string;
    createdAt: Date;
}[]>;
export declare const updateTagService: (id: string, tagData: ITag) => Promise<{
    id: string;
    name: string;
    createdAt: Date;
}>;
export declare const deleteTagService: (id: string) => Promise<void>;
