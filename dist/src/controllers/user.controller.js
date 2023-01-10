"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.unpublish = exports.get = exports.signin = exports.signup = void 0;
const user_service_1 = require("../services/user.service");
/**
 * Function to handle user signup
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const signup = async (req, res) => {
    const response = await (0, user_service_1.userSignup)(req.body);
    return res.status(response.status).json(response.data);
};
exports.signup = signup;
/**
 * Function to handle user signin
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const signin = async (req, res) => {
    const response = await (0, user_service_1.userSignin)(req.body);
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
    };
    return res
        .status(response.status)
        .cookie("refreshToken", response.data.refreshToken, options)
        .json(response.data);
};
exports.signin = signin;
/**
 * Function to get all users.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const get = async (req, res) => {
    const response = await (0, user_service_1.getUsers)();
    return res.status(response.status).json(response.data);
};
exports.get = get;
/**
 * Function to delete user
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const unpublish = async (req, res) => {
    const payload = req.body;
    const response = await (0, user_service_1.deleteUser)(payload);
    return res.status(response.status).json(response.data);
};
exports.unpublish = unpublish;
/**
 * Function to send reset link on forgetting password.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const forgetPassword = async (req, res) => {
    const email = req.body.email;
    const response = await (0, user_service_1.forget_password)(email);
    return res.status(response.status).json(response.data);
};
exports.forgetPassword = forgetPassword;
/**
 * Function to reset password.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
const resetPassword = async (req, res) => {
    const token = req.query.token;
    const password = req.body.password;
    const response = await (0, user_service_1.reset_password)(token, password);
    return res.status(response.status).json(response.data);
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=user.controller.js.map