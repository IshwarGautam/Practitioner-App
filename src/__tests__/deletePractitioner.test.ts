import { practitionerModel } from "../models/practitioner.model";
import { deletePractitioner } from "../services/practitioner.service";

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
    (practitionerModel.findByIdAndRemove as jest.Mock).mockResolvedValueOnce(
      payload
    );

    const response = await deletePractitioner(1);

    expect(response.status).toBe(202);
    expect(response.data).toEqual(payload);
  });

  it("should return status code of 500 on bad request.", async () => {
    (practitionerModel.findByIdAndRemove as jest.Mock).mockRejectedValueOnce(
      undefined
    );

    const response = await deletePractitioner(1);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ message: "Something went wrong." });
  });
});
