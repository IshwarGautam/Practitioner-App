import randomstring from "randomstring";
import { userModel } from "../models/user.model";
import { forget_password } from "../services/user.service";

jest.mock("randomstring");
jest.mock("../models/user.model");

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockRejectedValue({
    sendMail: jest
      .fn()
      .mockReturnValue((mailoptions: object, callback: () => void) => {}),
  }),
}));

const dummy_data = {
  _id: 1,
  username: "Jone Doe",
  email: "jonedoe@gmail.com",
};

describe("Forget password", () => {
  it("should return status code of 200 on sending reset link to the mail.", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(dummy_data);

    (randomstring.generate as jest.Mock).mockResolvedValue("randomstring");

    (userModel.updateOne as jest.Mock).mockResolvedValue({
      ...dummy_data,
      token: "some-token",
    });

    const response = await forget_password(dummy_data.email);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      message: "Please check your inbox and reset your password.",
    });
  });

  it("should return status code of 404 if the email doesn't exist in the database.", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(undefined);

    const response = await forget_password(dummy_data.email);

    expect(response.status).toBe(404);
    expect(response.data).toEqual({ message: "This email doesn't exist." });
  });

  it("should return status code of 500 on bad request.", async () => {
    (userModel.findOne as jest.Mock).mockRejectedValueOnce(undefined);

    const response = await forget_password(dummy_data.email);

    expect(response.status).toBe(500);
    expect(response.data).toEqual({ message: "Something went wrong." });
  });
});
