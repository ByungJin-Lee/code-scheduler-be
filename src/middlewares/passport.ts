import passport from "passport";
import Local from "passport-local";
import passportJwt, { ExtractJwt } from "passport-jwt";
import UserService from "../services/UserService";
import env from "../configs/env";

const localOptions: Local.IStrategyOptionsWithRequest = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
  session: false,
};

const localVerify: Local.VerifyFunctionWithRequest = async (
  req,
  email,
  password,
  done
) => {
  try {
    let user = await UserService.isValid(email, password);
    if (!user) {
      return done(null, false, {
        message: "Invalid Email or Password!",
      });
    }
    return done(null, user);
  } catch (error) {
    console.error(error);
  }
};

export default function setUpLocal() {
  passport.use("local", new Local.Strategy(localOptions, localVerify));
}
passport.use(
  "jwt",
  new passportJwt.Strategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: env.JWT_SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        console.log("run");

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
    }
  )
);
