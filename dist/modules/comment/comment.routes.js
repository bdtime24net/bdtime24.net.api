"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commenRoutes = (0, express_1.Router)();
const comment_controller_1 = require("./comment.controller");
commenRoutes.post("/comment/create", comment_controller_1.createCommentController);
exports.default = commenRoutes;
//# sourceMappingURL=comment.routes.js.map