"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controller_1 = require("./article.controller");
const articleRoutes = (0, express_1.Router)();
articleRoutes.post("/article/create", article_controller_1.createArticleController);
articleRoutes.get("/article", article_controller_1.getArticlesController);
articleRoutes.get("/article/:id", article_controller_1.getArticleByIdController);
articleRoutes.put("/article/:id", article_controller_1.updateArticleController);
articleRoutes.delete("/article/:id", article_controller_1.deleteArticleController);
exports.default = articleRoutes;
//# sourceMappingURL=article.routes.js.map