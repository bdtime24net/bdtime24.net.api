"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleController = exports.updateArticleController = exports.getArticleByIdController = exports.getArticlesController = exports.createArticleController = void 0;
const article_service_1 = require("./article.service");
const article_validation_1 = require("./article.validation");
const createArticleController = async (req, res, next) => {
    try {
        const parsedBody = article_validation_1.ArticleSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ error: parsedBody.error.message });
        }
        const article = await (0, article_service_1.createArticleService)(parsedBody.data);
        return res.status(201).json({
            success: true,
            data: article,
            message: "Article created successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createArticleController = createArticleController;
const getArticlesController = async (req, res, next) => {
    try {
        const queryParams = {
            ...req.query,
            page: req.query.page ? parseInt(req.query.page) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit) : undefined,
            fields: req.query.fields ? req.query.fields.split(",") : undefined,
            syncMode: req.query.syncMode === 'true'
        };
        const validatedOptions = article_validation_1.GetArticlesOptionsSchema.parse(queryParams);
        const result = await (0, article_service_1.getArticlesService)(validatedOptions);
        return res.status(200).json({
            success: true,
            totalCount: result.metadata.totalCount,
            totalPages: result.metadata.totalPages,
            currentPage: result.metadata.currentPage,
            hasNextPage: result.metadata.hasNextPage,
            hasPrevPage: result.metadata.hasPrevPage,
            nextPage: result.metadata.nextPage,
            prevPage: result.metadata.prevPage,
            articles: result.metadata.articles,
            message: "Articles retrieved successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getArticlesController = getArticlesController;
const getArticleByIdController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "id parameter is required" });
    }
    try {
        const article = await (0, article_service_1.getArticleByIdService)(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json(article);
    }
    catch (error) {
        console.error("Error in getArticleBySlugController:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getArticleByIdController = getArticleByIdController;
const updateArticleController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const parsedBody = article_validation_1.ArticleSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ error: parsedBody.error.message });
        }
        const article = await (0, article_service_1.updateArticleService)(id, parsedBody.data);
        return res.status(200).json({
            success: true,
            data: article,
            message: "Article updated successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateArticleController = updateArticleController;
const deleteArticleController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Article ID is required" });
        }
        const article = await (0, article_service_1.deleteArticleService)(id);
        return res.status(200).json({
            success: true,
            data: article,
            message: "Article deleted successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteArticleController = deleteArticleController;
//# sourceMappingURL=article.controller.js.map