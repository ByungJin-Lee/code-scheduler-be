import { PassportStatic } from "passport";
import {
  IStrategyOptionsWithRequest,
  Strategy,
  VerifyFunctionWithRequest,
} from "passport-local";
import UserService from "../../services/UserService";

const options: IStrategyOptionsWithRequest = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
  session: false,
};

const verify: VerifyFunctionWithRequest = async (
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

const LocalStrategy = new Strategy(options, verify);

export default LocalStrategy;
