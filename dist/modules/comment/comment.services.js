"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createCommentService = async (payload) => {
    const comment = await prisma_1.default.comment.create({
        data: {
            ...payload
        },
    });
    return comment;
};
exports.createCommentService = createCommentService;
//# sourceMappingURL=comment.services.js.map