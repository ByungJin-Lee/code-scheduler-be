import LocalStrategy from "./local";
import JwtStrategy from "./jwt";
import passport from "passport";

passport.use("local", LocalStrategy);
passport.use("jwt", JwtStrategy);

export default passport;
