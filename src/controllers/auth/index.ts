import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import env from "../../configs/env";
import UserService from "../../services/UserService";
import { UserDTO, UserModel } from "../../models/user";
import { validators } from "../../middlewares/validator";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Auth:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: hello
 *        password:
 *          type: string
 *          description: hello
 */

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
router.post("/login", ...validators.user_login, async (req, res) => {
  passport.authenticate("local", (error, user, info) => {
    if (error || !user) {
      return res.status(400).retJson(0, false, { reason: info.message });
    }

    req.login(user, (error) => {
      if (error) {
        console.error(error);
        return res.status(400).retJson(0, false, { reason: info.message });
      }
    });

    const token = jwt.sign(
      { email: user.email },
      env.JWT_SECRET_KEY as jwt.Secret,
      { expiresIn: "10m" }
    );

    return res.status(200).retJson(0, true, { token });
  })(req, res);
});

/**
 * @swagger
 *  /auth/signup:
 *    post:
 *      tags:
 *      - auth
 *      description: 회원가입합니다.
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
router.post("/signup", ...validators.user_signup, async (req, res) => {
  if (await UserService.signup(req.body as UserDTO))
    return res.status(200).retJson(0, true);
  else
    return res.status(400).retJson(0, false, { reason: "user already exists" });
});

export default router;
