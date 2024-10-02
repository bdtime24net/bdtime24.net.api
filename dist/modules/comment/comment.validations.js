"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidationSchema = void 0;
const zod_1 = require("zod");
exports.commentValidationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    body: zod_1.z.string(),
    articleId: zod_1.z.string(),
    userId: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    user: zod_1.z.object({
        id: zod_1.z.string(),
        username: zod_1.z.string(),
        avatar: zod_1.z.string(),
    }),
    article: zod_1.z.object({
        id: zod_1.z.string(),
        headline: zod_1.z.string(),
        description: zod_1.z.string(),
        sourceName: zod_1.z.string(),
        url: zod_1.z.string(),
        urlToImage: zod_1.z.array(zod_1.z.string()),
        categoryId: zod_1.z.string(),
        userId: zod_1.z.string(),
        tagId: zod_1.z.string(),
        keywords: zod_1.z.array(zod_1.z.string()),
        createdAt: zod_1.z.date(),
        updatedAt: zod_1.z.date(),
    }),
});
//# sourceMappingURL=comment.validations.js.map