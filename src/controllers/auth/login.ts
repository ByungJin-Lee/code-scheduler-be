import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import env from "../../configs/env";
import { Service } from "../../constants/service";
import passport from "../../middlewares/passport";
/**
 * @swagger
 *  /auth/login:
 *    post:
 *      tags:
 *      - auth
 *      description: 로그인합니다.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *      responses:
 *       200:
 *        description: 로그인 성공
 *       400:
 *        description: 로그인 실패
 */
export const login: RequestHandler = async (req, res) => {
  passport.authenticate("local", (error, user, info) => {
    if (error || !user) {
      return res
        .status(400)
        .retJson(Service.AUTH, false, { reason: info.message });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        console.error(error);
        return res
          .status(400)
          .retJson(Service.AUTH, false, { reason: info.message });
      }
    });

    const payloadJwt = {
      email: user.email,
    };

    const token: string = sign(payloadJwt, env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    const refresh: string = sign(payloadJwt, env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });

    return res.status(200).retJson(Service.AUTH, true, { token, refresh });
  })(req, res);
};