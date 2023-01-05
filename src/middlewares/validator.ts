import { NextFunction, Request, Response } from "express";
import { body, param, query, validationResult } from "express-validator";

export function ValidateErrorHandler(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).retJson(1, false, { errors: errors.array() });
  }
  next();
}

export const validators = {
	user_signup: [
		body("email").isEmail(),
		body("password").exists(),
		ValidateErrorHandler,
	],
	user_login: [
		body("email").isEmail(),
		body("password").exists(),
		ValidateErrorHandler,
	]
}