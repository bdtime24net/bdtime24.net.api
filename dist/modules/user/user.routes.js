"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const express_1 = require("express");
const userRoutes = (0, express_1.Router)();
const user_controller_1 = require("./user.controller");
userRoutes.get('/user/dashboard', auth_middleware_1.default, user_controller_1.getUserDashboardController);
userRoutes.get('/user/profile', auth_middleware_1.default, user_controller_1.getUserProfileController);
userRoutes.get('/user', auth_middleware_1.default, user_controller_1.getUsersController);
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map