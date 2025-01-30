"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
exports.default = (req, res, next) => {
    (0, express_session_1.default)({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        name: 'sid',
        proxy: true
    })(req, res, next);
};
//# sourceMappingURL=Session.js.map