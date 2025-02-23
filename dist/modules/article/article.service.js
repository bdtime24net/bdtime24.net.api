"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleService = exports.updateArticleService = exports.getArticleByIdService = exports.getArticlesService = exports.createArticleService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createArticleService = async (articleData) => {
    const existingArticle = await prisma_1.default.article.findFirst({
        where: {
            headline: articleData.headline,
        },
    });
    if (existingArticle) {
        throw new Error("Article already exists");
    }
    const article = await prisma_1.default.article.create({
        data: articleData,
        select: {
            headline: true,
        },
    });
    return article;
};
exports.createArticleService = createArticleService;
const getArticlesService = async (articleData) => {
    const { page = 1, limit = 10, fields = [], sort = { field: "updatedAt", order: "desc" }, query = "", search = "", filter = {}, category = "", tag = "", author = "", date = {}, } = articleData;
    const skip = (page - 1) * limit;
    const where = {
        ...(query && {
            OR: [
                { headline: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
            ],
        }),
        ...(search && {
            headline: { contains: search, mode: "insensitive" },
        }),
        ...(category && { categoryId: { in: Array.isArray(category) ? category : [category] } }),
        ...(tag && { tagId: { in: Array.isArray(tag) ? tag : [tag] } }),
        ...(author && { userId: author }),
        ...(date.from || date.to) && {
            createdAt: {
                ...(date.from && { gte: new Date(date.from) }),
                ...(date.to && { lte: new Date(date.to) }),
            },
        },
        ...filter,
    };
    const select = fields.length > 0
        ? fields.reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {})
        : {
            id: true,
            headline: true,
            description: true,
            sourceName: true,
            url: true,
            urlToImage: true,
            categoryId: true,
            userId: true,
            tagId: true,
            keywords: true,
            publishedAt: true,
            updatedAt: true,
        };
    const [totalCount, articles] = await Promise.all([
        prisma_1.default.article.count({ where }),
        prisma_1.default.article.findMany({
            where,
            skip,
            take: limit,
            select,
            orderBy: {
                [sort.field]: sort.order,
            },
        }),
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    return {
        metadata: {
            totalCount,
            totalPages,
            currentPage: page,
            hasNextPage,
            hasPrevPage,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null,
            articles,
        },
    };
};
exports.getArticlesService = getArticlesService;
const getArticleByIdService = async (id) => {
    return prisma_1.default.article.findUnique({ where: { id } });
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