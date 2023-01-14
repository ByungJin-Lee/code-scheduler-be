import { RequestHandler } from "express";
import { REFRESH_TOKEN_NAME } from "../../constants/cookie";
import { Service } from "../../constants/service";

export const logout: RequestHandler = (req, res) => {
  res.clearCookie(REFRESH_TOKEN_NAME);

  res.retJson(Service.AUTH, true);
};
