import { practitionerModel } from "../models/practitioner.model";
import { updatePractitioner } from "../services/practitioner.service";

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

describe("update practitioner details", () => {
  it("should return a status code of 409 when practitioner already exist in the database.", async () => {
    (practitionerModel.find as jest.Mock).mockResolvedValueOnce([
      { ...payload, _id: 1 },
      { ...payload, _id: 2, email: "joe@gmail.com" },
    ]);

    const response = await updatePractitioner(payload, 1);

    expect(response.status).toBe(409);
    expect(response.data).toEqual({ message: "Practitioner already exists." });
  });

  it("should return a status code of 200 on updating partitioner details.", async () => {
    (practitionerModel.find as jest.Mock).mockResolvedValueOnce([]);
    (practitionerModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(
      payload
    );

    const response = await updatePractitioner(payload, 1);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(payload);
  });

  it("should return status code of 500 on bad request.", async () => {
    (practitionerModel.find as jest.Mock).mockRejectedValueOnce(undefined);

    const response = await updatePractitioner(payload, 1);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ message: "Something went wrong." });
  });
});
