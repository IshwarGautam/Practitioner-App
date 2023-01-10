"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.refresh = void 0;
const token_service_1 = require("../services/token.service");
/**
 * Function to generate new access token from refresh token.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const refresh = (req, res) => {
    const { refreshToken } = req.cookies;
    const response = (0, token_service_1.updateToken)(refreshToken);
    return res.status(response.status).json(response.data);
};
exports.refresh = refresh;
/**
 * Function to remove refresh token from cookies.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const remove = (req, res) => {
    const response = (0, token_service_1.removeToken)(res);
    return res.status(response.status).json(response.data);
};
exports.remove = remove;
//# sourceMappingURL=token.controller.js.map