"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryRoutes = (0, express_1.Router)();
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const category_controller_1 = require("./category.controller");
categoryRoutes.post("/category/create", auth_middleware_1.default, category_controller_1.categoryController);
categoryRoutes.get("/category", category_controller_1.getCategoriesController);
categoryRoutes.delete("/category/:id", auth_middleware_1.default, category_controller_1.deleteCategoryController);
categoryRoutes.put("/category/:id", auth_middleware_1.default, category_controller_1.updateCategoryController);
exports.default = categoryRoutes;
//# sourceMappingURL=category.routes.js.map