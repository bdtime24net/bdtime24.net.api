"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("./middleware"));
const routes_1 = __importDefault(require("./routes"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const errors_1 = require("./errors");
const notFoundError_1 = require("../errors/notFoundError");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const doc = yamljs_1.default.load(`${process.cwd()}/src/docs/swagger.yaml`);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(doc));
middleware_1.default.forEach((mw) => app.use(mw));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", routes_1.default);
app.use((0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    message: 'Too many requests from this IP, please try again later.',
    headers: true,
}));
app.use(notFoundError_1.notFoundHandler);
app.use(errors_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map