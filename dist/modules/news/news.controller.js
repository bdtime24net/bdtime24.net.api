"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsController = exports.updateNewsController = exports.getNewsByIdController = exports.getAllNewsController = exports.createNewsController = void 0;
const news_service_1 = require("./news.service");
const createNewsController = async (req, res, next) => {
    try {
        const result = await (0, news_service_1.createNewsService)(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.createNewsController = createNewsController;
const getAllNewsController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const sortField = req.query.sortField || "publishDate";
        const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";
        const filter = {
            category: req.query.category,
            authorId: req.query.authorId,
        };
        const searchQuery = req.query.search || "";
        const { articles, total, nextPage, prevPage } = await (0, news_service_1.getAllNewsService)(page, limit, sortField, sortOrder, filter, searchQuery);
        res.status(200).json({
            total,
            limit,
            page,
            sortField,
            sortOrder,
            nextPage,
            prevPage,
            articles,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllNewsController = getAllNewsController;
const getNewsByIdController = async (req, res, next) => {
    try {
        const article = await (0, news_service_1.getNewsByIdService)(req.params.id);
        res.status(200).json(article);
    }
    catch (error) {
        next(error);
    }
};
exports.getNewsByIdController = getNewsByIdController;
const updateNewsController = async (req, res, next) => {
    try {
        const article = await (0, news_service_1.updateNewsService)(req.params.id, req.body);
        res.status(200).json(article);
    }
    catch (error) {
        next(error);
    }
};
exports.updateNewsController = updateNewsController;
const deleteNewsController = async (req, res, next) => {
    try {
        const article = await (0, news_service_1.deleteNewsService)(req.params.id);
        res.status(200).json(article);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteNewsController = deleteNewsController;
//# sourceMappingURL=news.controller.js.map