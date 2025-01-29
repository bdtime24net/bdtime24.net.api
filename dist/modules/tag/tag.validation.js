"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagValidationSchema = void 0;
const zod_1 = require("zod");
exports.tagValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
});
//# sourceMappingURL=tag.validation.js.map