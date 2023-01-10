"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PASSWORD = exports.DB_USERNAME = exports.REFRESH_TOKEN_SECRET_KEY = exports.ACCESS_TOKEN_SECRET_KEY = exports.PORT = void 0;
exports.PORT = process.env.PORT;
exports.ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || "";
exports.REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY || "";
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
//# sourceMappingURL=constant.js.map