require("dotenv").config({
  path: ".env",
});

import { userModel } from "../models/user.model";
import { deleteUser } from "../services/user.service";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "../apiConfig";

jest.mock("../models/user.model");

const dummy_data = {
  userid: "1",
  username: "Jone Doe",
  password: "jone123",
};

const another_data = {
  userid: "1",
  username: ADMIN_USERNAME || "",
  password: ADMIN_PASSWORD || "",
};

describe("delete user details", () => {
  it("should return a status code of 400 when username or password incorrect", async () => {
    (userModel.findByIdAndRemove as jest.Mock).mockResolvedValueOnce(
      dummy_data
    );

    const response = await deleteUser(dummy_data);

    expect(response.status).toBe(400);
    expect(response.data).toEqual({
      message: "Username or password incorrect.",
    });
  });

  it("should return a status code of 202 when user delete successfully", async () => {
    (userModel.findByIdAndRemove as jest.Mock).mockResolvedValue(dummy_data);

    const response = await deleteUser(another_data);

    expect(response.status).toBe(202);
    expect(response.data).toBe(dummy_data);
  });

  it("should return status code of 500 on bad request.", async () => {
    (userModel.findByIdAndRemove as jest.Mock).mockRejectedValueOnce(undefined);

    const response = await deleteUser(another_data);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ message: "Something went wrong." });
  });
});
