"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({
    path: ".env",
});
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
const apiConfig_1 = require("../apiConfig");
jest.mock("../models/user.model");
const dummy_data = {
    userid: "1",
    username: "Jone Doe",
    password: "jone123",
};
const another_data = {
    userid: "1",
    username: apiConfig_1.ADMIN_USERNAME || "",
    password: apiConfig_1.ADMIN_PASSWORD || "",
};
describe("delete user details", () => {
    it("should return a status code of 400 when username or password incorrect", async () => {
        user_model_1.userModel.findByIdAndRemove.mockResolvedValueOnce(dummy_data);
        const response = await (0, user_service_1.deleteUser)(dummy_data);
        expect(response.status).toBe(400);
        expect(response.data).toEqual({
            message: "Username or password incorrect.",
        });
    });
    it("should return a status code of 202 when user delete successfully", async () => {
        user_model_1.userModel.findByIdAndRemove.mockResolvedValue(dummy_data);
        const response = await (0, user_service_1.deleteUser)(another_data);
        expect(response.status).toBe(202);
        expect(response.data).toBe(dummy_data);
    });
    it("should return status code of 500 on bad request.", async () => {
        user_model_1.userModel.findByIdAndRemove.mockRejectedValueOnce(undefined);
        const response = await (0, user_service_1.deleteUser)(another_data);
        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: "Something went wrong." });
    });
});
//# sourceMappingURL=deleteUser.test.js.map