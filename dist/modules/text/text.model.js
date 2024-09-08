"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const mongoose_1 = require("mongoose");
const textSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
});
exports.Text = (0, mongoose_1.model)('Text', textSchema);
//# sourceMappingURL=text.model.js.map