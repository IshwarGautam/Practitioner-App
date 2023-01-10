import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import { userSignup } from "../services/user.service";
import { updateToken } from "../services/token.service";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user.model");

const payload = {
  username: "Martin Luthar",
  email: "martinluthar@gmail.com",
  password: "martin98776",
};

type ResponseType = {
  status: number;
  data: {
    user?: object;
    message?: string;
    token?: string;
    accessToken?: string;
    refreshToken?: string;
  };
};

describe("test signup function", () => {
  it("should send a status code of 409 when user exists", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(payload);

    const response: ResponseType = await userSignup(payload);

    expect(response.status).toBe(409);
    expect(response.data.message).toBe("User already exists.");
  });

  it("should send a status of 201 when new user is created", async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(undefined);

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hash_password");

    (userModel.create as jest.Mock).mockResolvedValueOnce({
      _id: 1,
      ...payload,
    });

    (jwt.sign as jest.Mock).mockReturnValue("some_token");

    const response: ResponseType = await userSignup(payload);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("user");
    expect(response.data).toHaveProperty("accessToken");
    expect(response.data).toHaveProperty("refreshToken");
    expect(response.data.user).toEqual({
      _id: 1,
      ...payload,
    });
    expect(response.data.accessToken).toBe("some_token");
    expect(response.data.refreshToken).toBe("some_token");
  });
});

describe("test refresh token", () => {
  it("should return status code of 200 when access token renewed.", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({
      user: {
        id: 1,
        email: "joe@gmail.com",
      },
    });

    (jwt.sign as jest.Mock).mockReturnValue("new-token");

    const response: ResponseType = await updateToken("some-token");

    expect(response.status).toBe(200);
    expect(response.data.token).toBe("new-token");
  });

  it("should return status code of 403 when access token failed to renew.", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({
      err: {},
    });

    const response: ResponseType = await updateToken("some-token");

    expect(response.status).toBe(403);
    expect(response.data.message).toBe("Invalid refresh token");
  });

  it("should return status code of 500 on bad request.", async () => {
    (userModel.findOne as jest.Mock).mockRejectedValueOnce(undefined);

    const response: ResponseType = await userSignup(payload);

    expect(response.status).toBe(500);
    expect(response.data.message).toBe("Something went wrong.");
  });
});
