import {
  validateAdmin,
  validateSignin,
  validateSignup,
  validatePractitioner,
} from "../validator";
import { Request, Response, NextFunction } from "express";

export const validation = (req: Request, res: Response, next: NextFunction) => {
  let error;

  switch (req.url) {
    case "/signin":
      ({ error } = validateSignin(req.body));
      break;
    case "/signup":
      ({ error } = validateSignup(req.body));
      break;
    case "/delete": //requires admin access to delete users
      ({ error } = validateAdmin(req.body));
      break;
    default:
      ({ error } = validatePractitioner(req.body));
      break;
  }

  if (error) {
    return res.status(422).json({ message: error.details });
  } else {
    next();
  }
};
