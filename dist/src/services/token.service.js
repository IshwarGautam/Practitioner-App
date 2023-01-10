"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToken = exports.updateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const apiConfig_1 = require("../apiConfig");
/**
 * Service for generating new access token from refresh token.
 *
 * @param refreshToken string
 * @returns {object}
 */
const updateToken = (refreshToken) => {
    const response = jsonwebtoken_1.default.verify(refreshToken, apiConfig_1.REFRESH_TOKEN_SECRET_KEY, (err, user) => {
        return { err, user };
    });
    if (!response?.err) {
        const accessToken = jsonwebtoken_1.default.sign({ email: response?.user.email, id: response?.user.id }, apiConfig_1.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: "10m",
        });
        return error_1.HttpSuccess.OK({ token: accessToken });
    }
    else {
        return error_1.HttpError.Forbidden("Invalid refresh token");
    }
};
exports.updateToken = updateToken;
/**
 * Service for removing refresh token from cookies.
 *
 * @param res Response
 * @returns {object}
 */
const removeToken = (res) => {
    try {
        res.clearCookie("refreshToken");
        return error_1.HttpSuccess.OK({ message: "Token successfully cleared." });
    }
    catch {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.removeToken = removeToken;
//# sourceMappingURL=token.service.js.map