"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const practitioner_model_1 = require("../models/practitioner.model");
const practitioner_service_1 = require("../services/practitioner.service");
jest.mock("../models/practitioner.model");
const payload = {
    _id: 1,
    fullName: "Martin Luthar",
    email: "martin@gmail.com",
    contact: 9855555111,
    dob: "2022-12-07",
    workingDays: 5,
    startTime: "09:00",
    endTime: "18:00",
};
describe("delete practitioner details", () => {
    it("should return a status code of 202 when partitioner detail successfully deleted", async () => {
        practitioner_model_1.practitionerModel.findByIdAndRemove.mockResolvedValueOnce(payload);
        const response = await (0, practitioner_service_1.deletePractitioner)(1);
        expect(response.status).toBe(202);
        expect(response.data).toEqual(payload);
    });
    it("should return status code of 500 on bad request.", async () => {
        practitioner_model_1.practitionerModel.findByIdAndRemove.mockRejectedValueOnce(undefined);
        const response = await (0, practitioner_service_1.deletePractitioner)(1);
        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: "Something went wrong." });
    });
});
//# sourceMappingURL=deletePractitioner.test.js.map