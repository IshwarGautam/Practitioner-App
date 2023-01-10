"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user.model");
const payload = {
    email: "martinluthar@gmail.com",
    password: "martin98776",
};
describe("test signin function", () => {
    it("should send a status of 404 when no user is found during sign in", async () => {
        user_model_1.userModel.findOne.mockResolvedValueOnce(undefined);
        const response = await (0, user_service_1.userSignin)(payload);
        expect(response.status).toBe(404);
        expect(response.data.message).toBe("User not found.");
    });
    it("should send a status of 400 on invalid credentials", async () => {
        user_model_1.userModel.findOne.mockResolvedValueOnce(payload);
        bcrypt_1.default.compare.mockResolvedValueOnce(false);
        const response = await (0, user_service_1.userSignin)(payload);
        expect(response.status).toBe(400);
        expect(response.data.message).toBe("Invalid Credentials.");
    });
    it("should send a status of 201 when user is verified", async () => {
        user_model_1.userModel.findOne.mockResolvedValueOnce(payload);
        bcrypt_1.default.compare.mockResolvedValueOnce(true);
        jsonwebtoken_1.default.sign.mockReturnValue("some_token");
        const response = await (0, user_service_1.userSignin)(payload);
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty("user");
        expect(response.data).toHaveProperty("accessToken");
        expect(response.data).toHaveProperty("refreshToken");
        expect(response.data.user).toEqual(payload);
        expect(response.data.accessToken).toBe("some_token");
        expect(response.data.refreshToken).toBe("some_token");
    });
    it("should return status code of 500 on bad request.", async () => {
        user_model_1.userModel.findOne.mockRejectedValueOnce(undefined);
        const response = await (0, user_service_1.userSignin)(payload);
        expect(response.status).toBe(500);
        expect(response.data.message).toBe("Something went wrong.");
    });
});
//# sourceMappingURL=signin.test.js.map