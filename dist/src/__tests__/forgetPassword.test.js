"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const randomstring_1 = __importDefault(require("randomstring"));
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
jest.mock("randomstring");
jest.mock("../models/user.model");
jest.mock("nodemailer", () => ({
    createTransport: jest.fn().mockRejectedValue({
        sendMail: jest
            .fn()
            .mockReturnValue((mailoptions, callback) => { }),
    }),
}));
const dummy_data = {
    _id: 1,
    username: "Jone Doe",
    email: "jonedoe@gmail.com",
};
describe("Forget password", () => {
    it("should return status code of 200 on sending reset link to the mail.", async () => {
        user_model_1.userModel.findOne.mockResolvedValue(dummy_data);
        randomstring_1.default.generate.mockResolvedValue("randomstring");
        user_model_1.userModel.updateOne.mockResolvedValue({
            ...dummy_data,
            token: "some-token",
        });
        const response = await (0, user_service_1.forget_password)(dummy_data.email);
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
            message: "Please check your inbox and reset your password.",
        });
    });
    it("should return status code of 404 if the email doesn't exist in the database.", async () => {
        user_model_1.userModel.findOne.mockResolvedValue(undefined);
        const response = await (0, user_service_1.forget_password)(dummy_data.email);
        expect(response.status).toBe(404);
        expect(response.data).toEqual({ message: "This email doesn't exist." });
    });
    it("should return status code of 500 on bad request.", async () => {
        user_model_1.userModel.findOne.mockRejectedValueOnce(undefined);
        const response = await (0, user_service_1.forget_password)(dummy_data.email);
        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: "Something went wrong." });
    });
});
//# sourceMappingURL=forgetPassword.test.js.map