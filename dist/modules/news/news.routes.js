"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("./news.controller");
const newsRoutes = (0, express_1.Router)();
newsRoutes.post("/news/create", news_controller_1.createNewsController);
newsRoutes.get("/news", news_controller_1.getAllNewsController);
newsRoutes.get("/news/:id", news_controller_1.getNewsByIdController);
newsRoutes.put("/news/:id", news_controller_1.updateNewsController);
newsRoutes.delete("/news/:id", news_controller_1.deleteNewsController);
exports.default = newsRoutes;
//# sourceMappingURL=news.routes.js.map