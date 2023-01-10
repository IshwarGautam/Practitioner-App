"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const practitioner_model_1 = require("../models/practitioner.model");
const practitioner_service_1 = require("../services/practitioner.service");
jest.mock("../models/practitioner.model");
const payload = {
    fullName: "Martin Luthar",
    email: "martin@gmail.com",
    contact: 9855555111,
    dob: "2022-12-07",
    workingDays: 5,
    startTime: "09:00",
    endTime: "18:00",
    icuSpecialist: false,
    assetUrl: "",
};
describe("add practitioner", () => {
    it("should return a status code of 409 when partitioner already exist in the database.", async () => {
        practitioner_model_1.practitionerModel.findOne.mockResolvedValueOnce(payload);
        const response = await (0, practitioner_service_1.addPractitioner)(payload);
        expect(response.status).toBe(409);
        expect(response.data.message).toBe("Practitioner already exists.");
    });
    it("should return a status code of 201 on adding new practitioner.", async () => {
        practitioner_model_1.practitionerModel.findOne.mockResolvedValueOnce(undefined);
        const newPractitioner = new practitioner_model_1.practitionerModel({ ...payload });
        newPractitioner.save.mockResolvedValueOnce("");
        const response = await (0, practitioner_service_1.addPractitioner)(payload);
        expect(response.status).toBe(201);
    });
    it("should return status code of 500 on bad request.", async () => {
        practitioner_model_1.practitionerModel.findOne.mockRejectedValueOnce(undefined);
        const response = await (0, practitioner_service_1.addPractitioner)(payload);
        expect(response.status).toBe(500);
        expect(response.data).toEqual({ message: "Something went wrong." });
    });
});
//# sourceMappingURL=addPractitioner.test.js.map