import { PassportStatic } from "passport";
import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-jwt";
import env from "../../configs/env";
import { UserDTO } from "../../models/user";
import UserService from "../../services/UserService";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET_KEY,
};

const verify: VerifyCallback = async (jwtPayload: { email: string }, done) => {
  try {
    let user = await UserService.get(jwtPayload.email);
    if (!user) {
      return done(null, false, {
        message: "Invalid JWT!",
      });
    }
    return done(null, user.dataValues);
  } catch (error) {
    console.error(error);
  }
};

const JwtStrategy = new Strategy(options, verify);

export default JwtStrategy;
