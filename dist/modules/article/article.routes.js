"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controller_1 = require("./article.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const articleRoutes = (0, express_1.Router)();
articleRoutes.post("/article/create", auth_middleware_1.default, article_controller_1.createArticleController);
articleRoutes.get("/article", article_controller_1.getArticlesController);
articleRoutes.get("/article/:id", article_controller_1.getArticleByIdController);
articleRoutes.put("/article/:id", auth_middleware_1.default, article_controller_1.updateArticleController);
articleRoutes.delete("/article/:id", auth_middleware_1.default, article_controller_1.deleteArticleController);
exports.default = articleRoutes;
//# sourceMappingURL=article.routes.js.map