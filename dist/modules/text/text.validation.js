"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textValidationSchema = void 0;
const zod_1 = require("zod");
exports.textValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        name: zod_1.z.string(),
        avatar: zod_1.z.string(),
    }),
});
//# sourceMappingURL=text.validation.js.map