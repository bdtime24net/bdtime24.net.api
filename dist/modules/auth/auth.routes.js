"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = __importDefault(require("./auth.middleware"));
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", auth_controller_1.signupController);
authRoutes.post("/signin", auth_controller_1.signinController);
authRoutes.put("/update/:id", auth_middleware_1.default, auth_controller_1.updateController);
authRoutes.put("/change-password/:id", auth_middleware_1.default, auth_controller_1.changePasswordController);
authRoutes.delete("/delete/:id", auth_middleware_1.default, auth_controller_1.deleteAccountController);
authRoutes.post("/forgot-password", auth_controller_1.forgotPasswordController);
authRoutes.post("/logout", auth_middleware_1.default, auth_controller_1.logoutController);
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map