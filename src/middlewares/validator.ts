import { NextFunction, Request, Response } from "express";
import { body, param, query, validationResult } from "express-validator";
import { Service } from "../constants/service";

export function ValidateErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .retJson(Service.VALID, false, { errors: errors.array() });
  }
  next();
}

const validator = {
  user_signup: [
    body("email").isEmail(),
    body("password").exists(),
    ValidateErrorHandler,
  ],
  user_login: [
    body("email").isEmail(),
    body("password").exists(),
    ValidateErrorHandler,
  ],
  user_refresh: [ValidateErrorHandler],
};

export default validator;
