"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTextByIdService = exports.deleteTextByIdService = exports.getTextByIdService = exports.getAllTextService = exports.createTextService = void 0;
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const text_model_1 = require("./text.model");
const createTextService = async (payload) => {
    const result = await text_model_1.Text.create(payload);
    return result;
};
exports.createTextService = createTextService;
const getAllTextService = async (query) => {
    const textQueries = new QueryBuilder_1.QueryBuilder(text_model_1.Text.find(), query)
        .sort()
        .filter()
        .search([
        'name',
        'category',
        'description',
    ])
        .fields()
        .paginate();
    const result = await textQueries.modelQuery;
    return result;
};
exports.getAllTextService = getAllTextService;
const getTextByIdService = async (id) => {
    const result = await text_model_1.Text.findById(id);
    return result;
};
exports.getTextByIdService = getTextByIdService;
const deleteTextByIdService = async (id) => {
    const result = await text_model_1.Text.findByIdAndDelete(id);
    return result;
};
exports.deleteTextByIdService = deleteTextByIdService;
const updateTextByIdService = async (id, payload) => {
    const result = await text_model_1.Text.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
exports.updateTextByIdService = updateTextByIdService;
//# sourceMappingURL=text.service.js.map