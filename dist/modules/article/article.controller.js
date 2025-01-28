"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleController = exports.updateArticleController = exports.getLatestArticlesController = exports.getArticleBySlugController = exports.getArticlesController = exports.createArticleController = void 0;
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
            page: parseInt(req.query.page, 10) || undefined,
            limit: parseInt(req.query.limit, 10) || undefined,
            fields: req.query.fields ? (Array.isArray(req.query.fields) ? req.query.fields : [req.query.fields]) : undefined,
            sort: req.query.sort ? JSON.parse(req.query.sort) : undefined,
            query: req.query.query,
            search: req.query.search,
            filter: req.query.filter ? JSON.parse(req.query.filter) : undefined,
            category: req.query.category,
            author: req.query.author,
            date: req.query.date ? JSON.parse(req.query.date) : undefined
        };
        const parsedQuery = article_validation_1.GetArticlesOptionsSchema.safeParse(queryParams);
        if (!parsedQuery.success) {
            return res.status(400).json({ error: parsedQuery.error.errors });
        }
        const options = {
            page: parsedQuery.data.page ?? 1,
            limit: parsedQuery.data.limit ?? 10,
            fields: parsedQuery.data.fields,
            sort: parsedQuery.data.sort,
            query: parsedQuery.data.query,
            search: parsedQuery.data.search,
            filter: parsedQuery.data.filter,
            category: parsedQuery.data.category,
            author: parsedQuery.data.author,
            date: parsedQuery.data.date
        };
        const result = await (0, article_service_1.getArticlesService)(options);
        return res.status(200).json({
            success: true,
            totalCount: result.totalCount,
            totalPages: result.totalPages,
            nextLink: result.nextLink,
            prevLink: result.prevLink,
            message: "Articles retrieved successfully",
            error: null,
            data: result.articles,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getArticlesController = getArticlesController;
const getArticleBySlugController = async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
        return res.status(400).json({ message: "Slug parameter is required" });
    }
    try {
        const article = await (0, article_service_1.getArticleBySlugService)(slug);
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
exports.getArticleBySlugController = getArticleBySlugController;
const getLatestArticlesController = async (req, res) => {
    const { limit } = req.query;
    const limitNumber = limit ? parseInt(limit) : 10;
    try {
        const articles = await (0, article_service_1.getLatestArticlesService)(limitNumber);
        return res.status(200).json({
            success: true,
            data: articles,
            message: "Latest articles fetched successfully",
        });
    }
    catch (error) {
        console.error("Error in getLatestArticlesController:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getLatestArticlesController = getLatestArticlesController;
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