"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset_password = exports.forget_password = exports.deleteUser = exports.getUsers = exports.userSignup = exports.userSignin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const randomstring_1 = __importDefault(require("randomstring"));
const user_model_1 = require("../models/user.model");
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
const error_1 = require("../utils/error");
const apiConfig_1 = require("../apiConfig");
/**
 * Service for handling user sign in
 *
 * @param payload payloadType
 * @returns {object}
 */
const userSignin = async (payload) => {
    const { email, password } = payload;
    try {
        const existingUser = await user_model_1.userModel.findOne({ email });
        if (!existingUser) {
            return error_1.HttpError.NotFound("User not found.");
        }
        const matchPassword = await bcrypt_1.default.compare(password, existingUser.password);
        if (!matchPassword) {
            return error_1.HttpError.Invalid("Invalid Credentials.");
        }
        const accessToken = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, apiConfig_1.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "10m" });
        const refreshToken = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, apiConfig_1.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" });
        return error_1.HttpSuccess.Created({
            user: existingUser,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.userSignin = userSignin;
/**
 * Service for handling user sign up
 *
 * @param payload payloadType
 * @returns {object}
 */
const userSignup = async (payload) => {
    const { username, email, password } = payload;
    try {
        const existingUser = await user_model_1.userModel.findOne({ email });
        if (existingUser) {
            return error_1.HttpError.Conflict("User already exists.");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const userData = await user_model_1.userModel.create({
            username,
            email,
            password: hashedPassword,
        });
        const accessToken = jsonwebtoken_1.default.sign({ email: userData.email, id: userData._id }, apiConfig_1.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "10m" });
        const refreshToken = jsonwebtoken_1.default.sign({ email: userData.email, id: userData._id }, apiConfig_1.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" });
        return error_1.HttpSuccess.Created({ user: userData, accessToken, refreshToken });
    }
    catch (error) {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.userSignup = userSignup;
/**
 * Service for fetching user
 * @returns {object}
 */
const getUsers = async () => {
    try {
        const users = await user_model_1.userModel.find();
        return error_1.HttpSuccess.OK(users);
    }
    catch (error) {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.getUsers = getUsers;
/**
 * Service for handling delete user
 *
 * @param payload adminPayloadType
 * @returns {object}
 */
const deleteUser = async (payload) => {
    try {
        if (payload.username !== apiConfig_1.ADMIN_USERNAME ||
            payload.password !== apiConfig_1.ADMIN_PASSWORD) {
            return error_1.HttpError.Invalid("Username or password incorrect.");
        }
        const user = await user_model_1.userModel.findByIdAndRemove(payload.userid);
        return error_1.HttpSuccess.Accepted(user);
    }
    catch {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.deleteUser = deleteUser;
/**
 * Service for generating reset link on forgetting password.
 *
 * @param email string
 * @returns {object}
 */
const forget_password = async (email) => {
    try {
        const userData = await user_model_1.userModel.findOne({ email });
        if (userData) {
            const randomString = randomstring_1.default.generate();
            await user_model_1.userModel.updateOne({ email }, { $set: { token: randomString } });
            await sendResetPasswordMail(userData.username, userData.email, randomString);
            return error_1.HttpSuccess.OK({
                message: "Please check your inbox and reset your password.",
            });
        }
        else {
            return error_1.HttpError.NotFound("This email doesn't exist.");
        }
    }
    catch {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.forget_password = forget_password;
/**
 * Service for sending reset password link
 *
 * @param name string
 * @param email string
 * @param token string
 * @returns {object}
 */
const sendResetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: apiConfig_1.EMAIL_USERNAME,
                pass: apiConfig_1.EMAIL_PASSWORD,
            },
        }));
        const mailOptions = {
            from: apiConfig_1.EMAIL_USERNAME,
            to: email,
            subject: "For Reset Password",
            html: `<p>Hi ${name} , Please reset your password by clicking <a href="http://localhost:${apiConfig_1.CLIENT_PORT}/users/resetPassword?token=${token}">here</a>`,
        };
        transporter.sendMail(mailOptions);
    }
    catch {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
/**
 * Service for resetting password
 *
 * @param token string
 * @param password string
 * @returns {object}
 */
const reset_password = async (token, password) => {
    try {
        const data = await user_model_1.userModel.findOne({ token });
        if (data) {
            const newHashedPassword = await bcrypt_1.default.hash(password, 10);
            await user_model_1.userModel.findByIdAndUpdate({ _id: data._id }, { $set: { password: newHashedPassword, token: "" } }, { new: true });
            return error_1.HttpSuccess.OK({ message: "Password reset successfully." });
        }
        else {
            return error_1.HttpError.Invalid("The token is not valid.");
        }
    }
    catch {
        return error_1.HttpError.BadRequest("Something went wrong.");
    }
};
exports.reset_password = reset_password;
//# sourceMappingURL=user.service.js.map