"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagsRoutes = (0, express_1.Router)();
const tag_controller_1 = require("./tag.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
tagsRoutes.post("/tag/create", auth_middleware_1.default, tag_controller_1.createTageController);
tagsRoutes.get("/tag", tag_controller_1.getTagsController);
tagsRoutes.delete("/tag/:id", auth_middleware_1.default, tag_controller_1.deleteTagController);
tagsRoutes.put("/tag/:id", auth_middleware_1.default, tag_controller_1.updateTagController);
tagsRoutes.get("/tag/search", auth_middleware_1.default, tag_controller_1.searchTagsController);
exports.default = tagsRoutes;
//# sourceMappingURL=tag.routes.js.map