import jwt from "jsonwebtoken";
import { updateToken } from "../services/token.service";

jest.mock("jsonwebtoken");

type ResponseType = {
  status: number;
  data: {
    message?: string;
    token?: string;
  };
};

describe("Refresh token", () => {
  it("should return status code of 403 on invalid refresh token.", () => {
    (jwt.verify as jest.Mock).mockReturnValue({ err: true, user: {} });

    const invalidToken = "hdf87f";

    const response: ResponseType = updateToken(invalidToken);

    expect(response.status).toBe(403);
    expect(response.data.message).toBe("Invalid refresh token");
  });

  it("should return status code of 200 when refresh token is found.", () => {
    (jwt.verify as jest.Mock).mockReturnValue({ err: false, user: {} });

    const validToken = "vfgf56";

    (jwt.sign as jest.Mock).mockReturnValue("some_token");

    const response: ResponseType = updateToken(validToken);

    expect(response.status).toBe(200);
    expect(response.data.token).toBe("some_token");
  });
});
