import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import randomstring from "randomstring";
import { userModel } from "../models/user.model";
import smtpTransport from "nodemailer-smtp-transport";
import { HttpError, HttpSuccess } from "../utils/error";
import {
  CLIENT_PORT,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} from "../apiConfig";

type payloadType = {
  username?: string;
  email: string;
  password: string;
};

type adminPayloadType = {
  userid: string;
  username: string;
  password: string;
};

/**
 * Service for handling user sign in
 *
 * @param payload payloadType
 * @returns {object}
 */
export const userSignin = async (payload: payloadType) => {
  const { email, password } = payload;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return HttpError.NotFound("User not found.");
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return HttpError.Invalid("Invalid Credentials.");
    }

    const accessToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return HttpSuccess.Created({
      user: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for handling user sign up
 *
 * @param payload payloadType
 * @returns {object}
 */
export const userSignup = async (payload: payloadType) => {
  const { username, email, password } = payload;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return HttpError.Conflict("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { email: userData.email, id: userData._id },
      ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { email: userData.email, id: userData._id },
      REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return HttpSuccess.Created({ user: userData, accessToken, refreshToken });
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for fetching user
 * @returns {object}
 */
export const getUsers = async () => {
  try {
    const users = await userModel.find();

    return HttpSuccess.OK(users);
  } catch (error) {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for handling delete user
 *
 * @param payload adminPayloadType
 * @returns {object}
 */
export const deleteUser = async (payload: adminPayloadType) => {
  try {
    if (
      payload.username !== ADMIN_USERNAME ||
      payload.password !== ADMIN_PASSWORD
    ) {
      return HttpError.Invalid("Username or password incorrect.");
    }

    const user = await userModel.findByIdAndRemove(payload.userid);

    return HttpSuccess.Accepted(user!);
  } catch {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for generating reset link on forgetting password.
 *
 * @param email string
 * @returns {object}
 */
export const forget_password = async (email: string) => {
  try {
    const userData = await userModel.findOne({ email });

    if (userData) {
      const randomString = randomstring.generate();

      await userModel.updateOne({ email }, { $set: { token: randomString } });

      await sendResetPasswordMail(
        userData.username,
        userData.email,
        randomString
      );

      return HttpSuccess.OK({
        message: "Please check your inbox and reset your password.",
      });
    } else {
      return HttpError.NotFound("This email doesn't exist.");
    }
  } catch {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for sending reset password link
 *
 * @param name string
 * @param email string
 * @param token string
 * @returns {object}
 */
const sendResetPasswordMail = async (
  name: string,
  email: string,
  token: string
) => {
  try {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: EMAIL_USERNAME,
          pass: EMAIL_PASSWORD,
        },
      })
    );

    const mailOptions = {
      from: EMAIL_USERNAME,
      to: email,
      subject: "For Reset Password",
      html: `<p>Hi ${name} , Please reset your password by clicking <a href="http://localhost:${CLIENT_PORT}/users/resetPassword?token=${token}">here</a>`,
    };

    transporter.sendMail(mailOptions);
  } catch {
    return HttpError.BadRequest("Something went wrong.");
  }
};

/**
 * Service for resetting password
 *
 * @param token string
 * @param password string
 * @returns {object}
 */
export const reset_password = async (token: string, password: string) => {
  try {
    const data = await userModel.findOne({ token });

    if (data) {
      const newHashedPassword = await bcrypt.hash(password, 10);

      await userModel.findByIdAndUpdate(
        { _id: data._id },
        { $set: { password: newHashedPassword, token: "" } },
        { new: true }
      );

      return HttpSuccess.OK({ message: "Password reset successfully." });
    } else {
      return HttpError.Invalid("The token is not valid.");
    }
  } catch {
    return HttpError.BadRequest("Something went wrong.");
  }
};
