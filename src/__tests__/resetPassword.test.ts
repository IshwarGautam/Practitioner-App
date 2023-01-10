import bcrypt from "bcrypt";
import { userModel } from "../models/user.model";
import { reset_password } from "../services/user.service";

jest.mock("bcrypt");
jest.mock("../models/user.model");

const dummy_data = {
  _id: 1,
  username: "Jone Doe",
  email: "jonedoe@gmail.com",
};

describe("Reset password", () => {
  it("should return status code of 200 on resetting password successfully.", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(dummy_data);

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hash_password");

    (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(dummy_data);

    const response = await reset_password("some-token", "new-pswd");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      message: "Password reset successfully.",
    });
  });

  it("should return status code of 400 on invalid token. ", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(undefined);

    const response = await reset_password("some-token", "new-pswd");

    expect(response.status).toBe(400);
    expect(response.data).toEqual({
      message: "The token is not valid.",
    });
  });

  it("should return status code of 500 on bad request.", async () => {
    (userModel.findOne as jest.Mock).mockRejectedValueOnce(undefined);

    const response = await reset_password("some-token", "new-pswd");

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ message: "Something went wrong." });
  });
});
