import { Request, Response } from "express";
import { updateToken, removeToken } from "../services/token.service";

/**
 * Function to generate new access token from refresh token.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const refresh = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const response = updateToken(refreshToken);

  return res.status(response.status).json(response.data);
};

/**
 * Function to remove refresh token from cookies.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const remove = (req: Request, res: Response) => {
  const response = removeToken(res);

  return res.status(response.status).json(response.data);
};
