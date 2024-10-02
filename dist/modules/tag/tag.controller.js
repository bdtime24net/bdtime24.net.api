"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTagController = exports.updateTagController = exports.searchTagsController = exports.getTagsController = exports.createTageController = void 0;
const tag_service_1 = require("./tag.service");
const tag_validation_1 = require("./tag.validation");
const createTageController = async (req, res, next) => {
    try {
        const parsedBody = tag_validation_1.tagValidationSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.errors[0].message });
        }
        const tagName = parsedBody.data.name;
        if (!tagName) {
            return res
                .status(400)
                .json({ error: 'Tag name is required' });
        }
        const tagData = await (0, tag_service_1.createTagService)(parsedBody.data);
        return res.status(201).json({
            success: true,
            data: tagData,
            message: 'Tag created successfully',
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createTageController = createTageController;
const getTagsController = async (req, res, next) => {
    try {
        const tags = await (0, tag_service_1.getTagsService)();
        return res.status(200).json({
            success: true,
            data: tags,
            message: "Tags fetched successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTagsController = getTagsController;
const searchTagsController = async (req, res, next) => {
    try {
        const { name } = req.query;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Name query parameter is required",
                error: "Invalid request",
            });
        }
        const tags = await (0, tag_service_1.searchTagsService)(name);
        return res.status(200).json({
            success: true,
            data: tags,
            message: "Tags fetched successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.searchTagsController = searchTagsController;
const updateTagController = async (req, res, next) => {
    try {
        const tagId = req.params.id;
        const parsedBody = tag_validation_1.tagValidationSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res
                .status(400)
                .json({ error: parsedBody.error.errors[0].message });
        }
        const updatedTag = await (0, tag_service_1.updateTagService)(tagId, parsedBody.data);
        return res.status(200).json({
            success: true,
            data: updatedTag,
            message: "Tag updated successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateTagController = updateTagController;
const deleteTagController = async (req, res, next) => {
    try {
        const tagId = req.params.id;
        await (0, tag_service_1.deleteTagService)(tagId);
        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTagController = deleteTagController;
//# sourceMappingURL=tag.controller.js.map