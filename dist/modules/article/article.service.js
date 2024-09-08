"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleService = exports.updateArticleService = exports.getArticleByIdService = exports.getArticlesService = exports.createArticleService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createArticleService = async (aeticleData) => {
    const existingArticle = await prisma_1.default.article.findFirst({
        where: {
            headline: aeticleData.headline
        }
    });
    if (existingArticle) {
        throw new Error("Article already exists");
    }
    const article = await prisma_1.default.article.create({
        data: {
            ...aeticleData,
        },
        select: {
            headline: true
        }
    });
    return article;
};
exports.createArticleService = createArticleService;
const getArticlesService = async (articleData) => {
    const { page = 1, limit = 10, fields = [], sort = { field: 'updatedAt', order: 'desc' }, query = '', search = '', filter = {}, category = '', author = '', date = {} } = articleData;
    const skip = (page - 1) * limit;
    const where = {};
    if (query) {
        where.OR = [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
        ];
    }
    if (search) {
        where.AND = [
            { title: { contains: search, mode: 'insensitive' } }
        ];
    }
    if (filter) {
        Object.assign(where, filter);
    }
    if (category) {
        where.category = category;
    }
    if (author) {
        where.author = author;
    }
    if (date.from || date.to) {
        where.date = {
            ...(date.from && { gte: date.from }),
            ...(date.to && { lte: date.to }),
        };
    }
    const totalCount = await prisma_1.default.article.count({ where });
    const validSortFields = ['id', 'title', 'description', 'category', 'author', 'publishedAt', 'updatedAt'];
    const sortField = validSortFields.includes(sort.field) ? sort.field : 'updatedAt';
    const articles = await prisma_1.default.article.findMany({
        where,
        skip,
        take: limit,
        select: fields.length > 0 ? fields.reduce((acc, field) => {
            return acc;
        }, {}) : undefined,
        orderBy: {
            [sortField]: sort.order,
        },
    });
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextLink = hasNextPage ? `/articles?page=${page + 1}&limit=${limit}` : null;
    const prevLink = hasPrevPage ? `/articles?page=${page - 1}&limit=${limit}` : null;
    return {
        articles,
        totalCount,
        totalPages,
        nextLink,
        prevLink
    };
};
exports.getArticlesService = getArticlesService;
const getArticleByIdService = async (id) => {
    const article = await prisma_1.default.article.findUnique({
        where: { id },
    });
    if (!article) {
        throw new Error("Article not found");
    }
    return article;
};
exports.getArticleByIdService = getArticleByIdService;
const updateArticleService = async (id, articleData) => {
    const article = await prisma_1.default.article.update({
        where: { id },
        data: articleData,
    });
    if (!article) {
        throw new Error("Article not found");
    }
    return article;
};
exports.updateArticleService = updateArticleService;
const deleteArticleService = async (id) => {
    const article = await prisma_1.default.article.delete({
        where: { id },
    });
    if (!article) {
        throw new Error("Article not found");
    }
    return article;
};
exports.deleteArticleService = deleteArticleService;
//# sourceMappingURL=article.service.js.map