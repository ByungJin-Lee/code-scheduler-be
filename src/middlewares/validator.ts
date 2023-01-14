import { NextFunction, Request, Response } from "express";
import { body, cookie, param, validationResult } from "express-validator";
import { Service } from "../constants/service";
import passport from "./passport";

function ValidateErrorHandler(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .retJson(Service.VALID, false, { errors: errors.array() });
  }
  next();
}

export const user_signup = [
  body("email").isEmail(),
  body("password").exists(),
  ValidateErrorHandler,
];
export const user_login = [
  body("email").isEmail(),
  body("password").exists(),
  ValidateErrorHandler,
];
export const user_refresh = [
  cookie("refreshToken").exists(),
  ValidateErrorHandler,
];
export const authorization = [passport.authenticate("jwt")];
export const evaluate_without = [body("code").exists(), ValidateErrorHandler];
export const evaluate_with = [param("id").exists(), ValidateErrorHandler];
