"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulerRoutes = void 0;
const news_routes_1 = __importDefault(require("../modules/news/news.routes"));
const article_routes_1 = __importDefault(require("../modules/article/article.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const category_routes_1 = __importDefault(require("../modules/category/category.routes"));
const tag_routes_1 = __importDefault(require("../modules/tag/tag.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
exports.modulerRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.default,
    },
    {
        path: "/",
        route: user_routes_1.default,
    },
    {
        path: "/",
        route: news_routes_1.default,
    },
    {
        path: "/",
        route: article_routes_1.default,
    },
    {
        path: "/",
        route: category_routes_1.default,
    },
    {
        path: "/",
        route: tag_routes_1.default,
    }
];
//# sourceMappingURL=index.js.map