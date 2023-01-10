"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const user_service_1 = require("../services/user.service");
jest.mock("../models/user.model");
const dummy_data = {
    _id: 1,
    username: "Jone Doe",
    email: "jonedoe@gmail.com",
};
describe("Get User's detail", () => {
    it("should return status code of 200 on fetching users successfully", async () => {
        user_model_1.userModel.find.mockResolvedValueOnce([{ ...dummy_data }]);
        const response = await (0, user_service_1.getUsers)();
        expect(response.status).toBe(200);
        expect(response.data).toEqual([{ ...dummy_data }]);
    });
    it("should return status code of 500 on bad request.", async () => {
        user_model_1.userModel.find.mockRejectedValueOnce(undefined);
        const response = await (0, user_service_1.getUsers)();
        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: "Something went wrong." });
    });
});
//# sourceMappingURL=getUsers.test.js.map