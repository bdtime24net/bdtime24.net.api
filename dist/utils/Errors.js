"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationError = exports.authenticationError = exports.serverError = exports.badRequest = exports.notFound = void 0;
exports.invalidInput = invalidInput;
exports.unauthorized = unauthorized;
class HTTPError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}
const notFound = (msg = "Resource not found") => {
    return new HTTPError(msg, 404);
};
exports.notFound = notFound;
const badRequest = (msg = "Bad Request") => {
    return new HTTPError(msg, 400);
};
exports.badRequest = badRequest;
const serverError = (msg = "Internal Server Error") => {
    return new HTTPError(msg, 500);
};
exports.serverError = serverError;
const authenticationError = (msg = "Authentication Failed") => {
    return new HTTPError(msg, 401);
};
exports.authenticationError = authenticationError;
const authorizationError = (msg = "Permission Denied") => {
    return new HTTPError(msg, 403);
};
exports.authorizationError = authorizationError;
function invalidInput(invalidInput) {
    throw new Error("Function not implemented.");
}
function unauthorized(unauthorized) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=Errors.js.map