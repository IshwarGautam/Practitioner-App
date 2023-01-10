import jwt from "jsonwebtoken";
import { Response } from "express";
import { HttpError, HttpSuccess } from "../utils/error";
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} from "../apiConfig";

/**
 * Service for generating new access token from refresh token.
 *
 * @param refreshToken string
 * @returns {object}
 */
export const updateToken = (refreshToken: string) => {
  type ResponseType = {
    err: string | null;
    user: {
      email: string;
      id: string;
    };
  };

  const response: ResponseType | any = jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET_KEY,
    (err, user) => {
      return { err, user };
    }
  );

  if (!response?.err) {
    const accessToken = jwt.sign(
      { email: response?.user.email, id: response?.user.id },
      ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );

    return HttpSuccess.OK({ token: accessToken });
  } else {
    return HttpError.Forbidden("Invalid refresh token");
  }
};

/**
 * Service for removing refresh token from cookies.
 *
 * @param res Response
 * @returns {object}
 */
export const removeToken = (res: Response) => {
  try {
    res.clearCookie("refreshToken");

    return HttpSuccess.OK({ message: "Token successfully cleared." });
  } catch {
    return HttpError.BadRequest("Something went wrong.");
  }
};
