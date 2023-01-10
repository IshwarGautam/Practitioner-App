"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpSuccess = exports.HttpError = void 0;
exports.HttpError = {
    Invalid: (message) => {
        return {
            status: 400,
            data: {
                message: message,
            },
        };
    },
    Forbidden: (message) => {
        return {
            status: 403,
            data: {
                message: message,
            },
        };
    },
    NotFound: (message) => {
        return {
            status: 404,
            data: {
                message: message,
            },
        };
    },
    Conflict: (message) => {
        return {
            status: 409,
            data: {
                message: message,
            },
        };
    },
    BadRequest: (message) => {
        return {
            status: 500,
            data: {
                message: message,
            },
        };
    },
};
exports.HttpSuccess = {
    OK: (data) => {
        return {
            status: 200,
            data: data,
        };
    },
    Created: (data) => {
        return {
            status: 201,
            data: data,
        };
    },
    Accepted: (data) => {
        return {
            status: 202,
            data: data,
        };
    },
};
//# sourceMappingURL=error.js.map