"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const practitioner_model_1 = require("../models/practitioner.model");
const practitioner_service_1 = require("../services/practitioner.service");
jest.mock("../models/practitioner.model");
const payload = {
    _id: 1,
    fullName: "Martin Luthar",
    email: "martin@gmail.com",
    contact: "9855555111",
    dob: "2022-12-07",
    workingDays: 5,
    startTime: "09:00",
    endTime: "18:00",
};
describe("Get practitioner/s details", () => {
    it("should return a status code of 202 when a practitioner detail is fetched successfully.", async () => {
        practitioner_model_1.practitionerModel.find.mockResolvedValueOnce(payload);
        const response = await (0, practitioner_service_1.getPractitioner)(payload._id);
        expect(response.status).toBe(202);
        expect(response.data).toEqual(payload);
    });
    it("should return a status code of 202 when all practitioner details get fetched successfully.", async () => {
        practitioner_model_1.practitionerModel.find.mockResolvedValueOnce([
            { ...payload },
        ]);
        const response = await (0, practitioner_service_1.getAllPractitioner)();
        expect(response.status).toBe(200);
        expect(response.data).toEqual([{ ...payload }]);
    });
    it("should return status code of 500 on bad request while trying to get single practitioner detail.", async () => {
        practitioner_model_1.practitionerModel.find.mockRejectedValueOnce(undefined);
        const response = await (0, practitioner_service_1.getPractitioner)(payload._id);
        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: "Something went wrong." });
    });
    it("should return status code of 500 on bad request when trying to get all practitioner details.", async () => {
        practitioner_model_1.practitionerModel.find.mockRejectedValueOnce(undefined);
        const response = await (0, practitioner_service_1.getAllPractitioner)();
        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: "Something went wrong." });
    });
});
//# sourceMappingURL=getPractitioner.test.js.map