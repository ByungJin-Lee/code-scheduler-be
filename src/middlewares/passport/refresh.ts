import { PassportStatic } from "passport";
import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-jwt";
import env from "../../configs/env";
import UserService from "../../services/UserService";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: env.JWT_SECRET_KEY,
};

const verify: VerifyCallback = async (jwtPayload, done) => {
  try {
    let user = await UserService.get(jwtPayload.email);
    if (!user) {
      return done(null, false, {
        message: "Invalid JWT!",
      });
    }
    return done(null, user);
  } catch (error) {
    console.error(error);
  }
};

export default function setUpJwt(passport: PassportStatic) {
  passport.use("jwt", new Strategy(options, verify));
}
