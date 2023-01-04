import passport from "passport";
import passportLocal from "passport-local";
import passportJwt, { ExtractJwt } from "passport-jwt";
import UserService from "../services/UserService";
import { Request } from "express";
import env from "../configs/env";

passport.use('local', new passportLocal.Strategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
async (req: Request, email: string, password: string, done) => {
	try {
		let user = await UserService.isValid(email, password);
		if (!user) {
			return done(null, false, {
				message: "Invalid Email or Password!"
			});
		}
		return done(null, user);
	}
	catch (error) {
		console.error(error);
	}
}
))

passport.use('jwt', new passportJwt.Strategy(
	{
	  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	  secretOrKey: env.JWT_SECRET_KEY
	},
	async (jwtPayload, done) => {
	  try {
			let user = await UserService.get(jwtPayload.email);
			if (!user) {
				return done(null, false, {
					message: "Invalid JWT!"
				});
			}
			return done(null, user);
	  }
	  catch (error) {
			console.error(error);
	  }
	}
))

passport.serializeUser((id, done) => {
  return done(null, id);
})

passport.deserializeUser(async (id, done) => {
  let user = await UserService.get(id as string);

  if (user)
    done(null, user);
  else
    done(null, false);
})

export default passport;