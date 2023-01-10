import { Request, Response } from "express";
import {
  getUsers,
  userSignin,
  userSignup,
  deleteUser,
  forget_password,
  reset_password,
} from "../services/user.service";

/**
 * Function to handle user signup
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signup = async (req: Request, res: Response) => {
  const response = await userSignup(req.body);

  return res.status(response.status).json(response.data);
};

/**
 * Function to handle user signin
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const signin = async (req: Request, res: Response) => {
  type responseType = {
    status: number;
    data: {
      refreshToken?: string;
    };
  };

  const response: responseType = await userSignin(req.body);

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 3600000),
  };

  return res
    .status(response.status)
    .cookie("refreshToken", response.data.refreshToken, options)
    .json(response.data);
};

/**
 * Function to get all users.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const get = async (req: Request, res: Response) => {
  const response = await getUsers();

  return res.status(response.status).json(response.data);
};

/**
 * Function to delete user
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const unpublish = async (req: Request, res: Response) => {
  const payload = req.body;

  const response = await deleteUser(payload);

  return res.status(response.status).json(response.data);
};

/**
 * Function to send reset link on forgetting password.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const forgetPassword = async (req: Request, res: Response) => {
  const email = req.body.email;

  const response = await forget_password(email);

  return res.status(response.status).json(response.data);
};

/**
 * Function to reset password.
 *
 * @param req Request
 * @param res Response
 * @returns {Promise<Response>}
 */
export const resetPassword = async (req: Request, res: Response) => {
  const token = req.query.token;
  const password = req.body.password;

  const response = await reset_password(token as string, password);

  return res.status(response.status).json(response.data);
};
