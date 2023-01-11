import { RequestHandler } from "express";
import TokenService from "../../services/TokenService";
import { CookiesProps } from "../../types/express";
import { verify } from "jsonwebtoken";
import env from "../../configs/env";
import { issueJwtToken } from "../../utils/authHelper";
import { REFRESH_EXPIRE_NUMBER } from "../../constants/status";

export const refresh: RequestHandler = async (req, res) => {
  const cookies = req.cookies as CookiesProps;

  try {
    if (cookies.refreshToken) {
      const token = cookies.refreshToken;

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
