"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
jest.mock("bcrypt");
jest.mock("../models/user.model");
const dummy_data = {
    _id: 1,
    username: "Jone Doe",
    email: "jonedoe@gmail.com",
};
describe("Reset password", () => {
    it("should return status code of 200 on resetting password successfully.", async () => {
        user_model_1.userModel.findOne.mockResolvedValue(dummy_data);
        bcrypt_1.default.hash.mockResolvedValueOnce("hash_password");
        user_model_1.userModel.findByIdAndUpdate.mockResolvedValue(dummy_data);
        const response = await (0, user_service_1.reset_password)("some-token", "new-pswd");
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            message: "Password reset successfully.",
        });
    });
    it("should return status code of 400 on invalid token. ", async () => {
        user_model_1.userModel.findOne.mockResolvedValue(undefined);
        const response = await (0, user_service_1.reset_password)("some-token", "new-pswd");
        expect(response.status).toBe(400);
        expect(response.data).toEqual({
            message: "The token is not valid.",
        });
    });
    it("should return status code of 500 on bad request.", async () => {
        user_model_1.userModel.findOne.mockRejectedValueOnce(undefined);
        const response = await (0, user_service_1.reset_password)("some-token", "new-pswd");
        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: "Something went wrong." });
    });
});
//# sourceMappingURL=resetPassword.test.js.map