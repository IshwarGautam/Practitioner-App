"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
const token_service_1 = require("../services/token.service");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user.model");
const payload = {
    username: "Martin Luthar",
    email: "martinluthar@gmail.com",
    password: "martin98776",
};
describe("test signup function", () => {
    it("should send a status code of 409 when user exists", async () => {
        user_model_1.userModel.findOne.mockResolvedValueOnce(payload);
        const response = await (0, user_service_1.userSignup)(payload);
        expect(response.status).toBe(409);
        expect(response.data.message).toBe("User already exists.");
    });
    it("should send a status of 201 when new user is created", async () => {
        user_model_1.userModel.findOne.mockResolvedValueOnce(undefined);
        bcrypt_1.default.hash.mockResolvedValueOnce("hash_password");
        user_model_1.userModel.create.mockResolvedValueOnce({
            _id: 1,
            ...payload,
        });
        jsonwebtoken_1.default.sign.mockReturnValue("some_token");
        const response = await (0, user_service_1.userSignup)(payload);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty("user");
        expect(response.data).toHaveProperty("accessToken");
        expect(response.data).toHaveProperty("refreshToken");
        expect(response.data.user).toEqual({
            _id: 1,
            ...payload,
        });
        expect(response.data.accessToken).toBe("some_token");
        expect(response.data.refreshToken).toBe("some_token");
    });
});
describe("test refresh token", () => {
    it("should return status code of 200 when access token renewed.", async () => {
        jsonwebtoken_1.default.verify.mockReturnValue({
            user: {
                id: 1,
                email: "joe@gmail.com",
            },
        });
        jsonwebtoken_1.default.sign.mockReturnValue("new-token");
        const response = await (0, token_service_1.updateToken)("some-token");
        expect(response.status).toBe(200);
        expect(response.data.token).toBe("new-token");
    });
    it("should return status code of 403 when access token failed to renew.", async () => {
        jsonwebtoken_1.default.verify.mockReturnValue({
            err: {},
        });
        const response = await (0, token_service_1.updateToken)("some-token");
        expect(response.status).toBe(403);
        expect(response.data.message).toBe("Invalid refresh token");
    });
    it("should return status code of 500 on bad request.", async () => {
        user_model_1.userModel.findOne.mockRejectedValueOnce(undefined);
        const response = await (0, user_service_1.userSignup)(payload);
        expect(response.status).toBe(500);
        expect(response.data.message).toBe("Something went wrong.");
    });
});
//# sourceMappingURL=signup.test.js.map