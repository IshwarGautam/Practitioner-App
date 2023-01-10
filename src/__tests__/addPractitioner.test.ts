import { practitionerModel } from "../models/practitioner.model";
import { addPractitioner } from "../services/practitioner.service";

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

type ResponseType = {
  status: number;
  data: {
    message?: string;
    token?: string;
  };
};

describe("add practitioner", () => {
  it("should return a status code of 409 when partitioner already exist in the database.", async () => {
    (practitionerModel.findOne as jest.Mock).mockResolvedValueOnce(payload);

    const response: ResponseType = await addPractitioner(payload);

    expect(response.status).toBe(409);
    expect(response.data.message).toBe("Practitioner already exists.");
  });

  it("should return a status code of 201 on adding new practitioner.", async () => {
    (practitionerModel.findOne as jest.Mock).mockResolvedValueOnce(undefined);

    const newPractitioner = new practitionerModel({ ...payload });

    (newPractitioner.save as jest.Mock).mockResolvedValueOnce("");

    const response = await addPractitioner(payload);

    expect(response.status).toBe(201);
  });

  it("should return status code of 500 on bad request.", async () => {
    (practitionerModel.findOne as jest.Mock).mockRejectedValueOnce(undefined);

    const response = await addPractitioner(payload);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ message: "Something went wrong." });
  });
});
