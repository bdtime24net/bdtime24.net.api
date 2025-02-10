"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("../routes");
const routes = (0, express_1.Router)();
routes_1.modulerRoutes.forEach(({ path, route }) => routes.use(path, route));
exports.default = routes;
//# sourceMappingURL=routes.js.map