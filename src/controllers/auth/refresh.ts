import { RequestHandler } from "express";
import TokenService from "../../services/TokenService";
import { verify } from "jsonwebtoken";
import env from "../../configs/env";
import { issueJwtToken } from "../../utils/authHelper";
import { REFRESH_EXPIRE_NUMBER } from "../../constants/status";
import { REFRESH_TOKEN_NAME } from "../../constants/cookie";

export const refresh: RequestHandler = async (req, res) => {
  try {
    if (req.cookies[REFRESH_TOKEN_NAME]) {
      const token = req.cookies[REFRESH_TOKEN_NAME];

      const auth = verify(token, env.JWT_REFRESH_SECRET_KEY) as {
        email: string;
      };

      if (await TokenService.isValid(auth["email"], token)) {
        return issueJwtToken(res, auth.email);
      }
    }
  } catch {}
  return res.sendStatus(REFRESH_EXPIRE_NUMBER);
};
