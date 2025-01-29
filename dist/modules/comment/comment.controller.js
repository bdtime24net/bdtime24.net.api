"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentController = void 0;
const comment_services_1 = require("./comment.services");
const createCommentController = async (req, res, next) => {
    try {
        const comment = await (0, comment_services_1.createCommentService)(req.body);
        res.status(201).json(comment);
    }
    catch (error) {
        next(error);
    }
};
exports.createCommentController = createCommentController;
//# sourceMappingURL=comment.controller.js.map