"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const mongoose_1 = require("mongoose");
const articleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    authorId: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    link: {
        type: String,
    },
    tags: {
        type: [String],
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Article = (0, mongoose_1.model)("Article", articleSchema);
//# sourceMappingURL=news.model.js.map