"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTagService = exports.updateTagService = exports.getTagsService = exports.createTagService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createTagService = async (tagData) => {
    const tag = await prisma_1.default.tag.create({
        data: {
            ...tagData
        }
    });
    return tag;
};
exports.createTagService = createTagService;
const getTagsService = async () => {
    const tags = await prisma_1.default.tag.findMany();
    return tags;
};
exports.getTagsService = getTagsService;
const updateTagService = async (id, tagData) => {
    const updatedTag = await prisma_1.default.tag.update({
        where: { id },
        data: { ...tagData },
    });
    return updatedTag;
};
exports.updateTagService = updateTagService;
const deleteTagService = async (id) => {
    await prisma_1.default.tag.delete({
        where: { id },
    });
};
exports.deleteTagService = deleteTagService;
//# sourceMappingURL=tag.service.js.map