"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASSWORD = exports.EMAIL_USERNAME = exports.ADMIN_PASSWORD = exports.ADMIN_USERNAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.REFRESH_TOKEN_SECRET_KEY = exports.ACCESS_TOKEN_SECRET_KEY = exports.CLIENT_PORT = exports.PORT = void 0;
exports.PORT = process.env.PORT;
exports.CLIENT_PORT = process.env.CLIENT_PORT;
exports.ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || "";
exports.REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY || "";
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME;
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
exports.EMAIL_USERNAME = process.env.EMAIL_USERNAME;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
//# sourceMappingURL=apiConfig.js.map