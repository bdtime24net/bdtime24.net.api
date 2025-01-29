"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidationSchema = void 0;
const zod_1 = require("zod");
exports.categoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
});
//# sourceMappingURL=category.validation.js.map