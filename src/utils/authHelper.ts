import { Response } from "express";
import { sign } from "jsonwebtoken";
import env from "../configs/env";
import { Service } from "../constants/service";
import TokenService from "../services/TokenService";
import { afterDay } from "./dateHelper";

export const issueJwtToken = (res: Response, email: string) => {
  const payloadJwt = {
    email: email,
  };

  const token: string = sign(payloadJwt, env.JWT_SECRET_KEY, {
    expiresIn: "10m",
  });

  const refresh: string = sign(payloadJwt, env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });

  // Refresh Token Update
  TokenService.register({ email: email, token: refresh });

  // refresh token httpOnly Cookie
  res.cookie("refreshToken", refresh, {
    secure: true,
    httpOnly: true,
    expires: afterDay(30),
    sameSite: "none",
  });

  res.retJson(Service.AUTH, true, { token: token });
};
