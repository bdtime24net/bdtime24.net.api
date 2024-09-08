"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsService = exports.updateNewsService = exports.getNewsByIdService = exports.getAllNewsService = exports.createNewsService = void 0;
const news_model_1 = require("./news.model");
const news_validation_1 = require("./news.validation");
const CustomError_1 = require("../../errors/CustomError");
const createNewsService = async (newsData) => {
    const parsedBody = news_validation_1.newsValidationSchema.safeParse({ body: newsData });
    if (!parsedBody.success) {
        throw new CustomError_1.CustomError(400, parsedBody.error.errors[0].message);
    }
    const existingArticle = await news_model_1.Article.findOne({
        title: parsedBody.data.body.title,
    });
    if (existingArticle) {
        throw new CustomError_1.CustomError(409, "Article already exists");
    }
    const newArticle = new news_model_1.Article(parsedBody.data.body);
    const result = await newArticle.save();
    return result;
};
exports.createNewsService = createNewsService;
const getAllNewsService = async (page, limit, sortField, sortOrder, filter, searchQuery) => {
    const skip = (page - 1) * limit;
    const sort = { [sortField]: sortOrder === "asc" ? 1 : -1 };
    const sortObject = {};
    Object.entries(sort).forEach(([key, value]) => {
        sortObject[key] = value;
    });
    const filterObject = {};
    Object.entries(filter).forEach(([key, value]) => {
        if (value) {
            filterObject[key] = value;
        }
    });
    if (searchQuery) {
        filterObject.$text = { $search: searchQuery };
    }
    const articles = await news_model_1.Article.find(filterObject)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const total = await news_model_1.Article.countDocuments(filterObject);
    const nextPage = skip + limit < total
        ? `/api/v1/news?page=${page + 1}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`
        : null;
    const prevPage = page > 1
        ? `/api/v1/news?page=${page - 1}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`
        : null;
    return {
        total,
        nextPage,
        prevPage,
        articles,
    };
};
exports.getAllNewsService = getAllNewsService;
const getNewsByIdService = async (id) => {
    const article = await news_model_1.Article.findById(id);
    if (!article) {
        throw new CustomError_1.CustomError(404, "Article not found");
    }
    return article;
};
exports.getNewsByIdService = getNewsByIdService;
const updateNewsService = async (id, newsData) => {
    const parsedBody = news_validation_1.newsValidationSchema
        .partial()
        .safeParse({ body: newsData });
    if (!parsedBody.success) {
        throw new CustomError_1.CustomError(400, parsedBody.error.errors[0].message);
    }
    const article = await news_model_1.Article.findByIdAndUpdate(id, parsedBody.data.body, {
        new: true,
    });
    if (!article) {
        throw new CustomError_1.CustomError(404, "Article not found");
    }
    return article;
};
exports.updateNewsService = updateNewsService;
const deleteNewsService = async (id) => {
    const article = await news_model_1.Article.findByIdAndDelete(id);
    if (!article) {
        throw new CustomError_1.CustomError(404, "Article not found");
    }
    return article;
};
exports.deleteNewsService = deleteNewsService;
//# sourceMappingURL=news.service.js.map