"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
});
const rateLimitMiddleware = (req, res, next) => {
    rateLimiter(req, res, next);
};
exports.default = rateLimitMiddleware;
//# sourceMappingURL=rateLimitMiddleware.js.map