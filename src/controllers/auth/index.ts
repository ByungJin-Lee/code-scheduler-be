import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import env from "../../configs/env";
import UserService from "../../services/UserService";
import { UserDTO, UserModel } from "../../models/user";
import validator from "../../middlewares/validator";
import { Service } from "../../constants/service";
import check from "./check";
import { signup } from "./signup";
import { login } from "./login";
import { refresh } from "./refresh";

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
router.post("/login", validator.user_login, login);

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
router.post("/signup", validator.user_signup, signup);

router.post("/refresh", validator.user_refresh, refresh);

router.use(check);

export default router;
