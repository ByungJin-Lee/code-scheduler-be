import passport from "passport";
import passportLocal from "passport-local";
import passportJwt, { ExtractJwt } from "passport-jwt";
import UserService from "../services/UserService";
import { Request } from "express";

passport.use('local', new passportLocal.Strategy({
	usernameField: 'id',
	passwordField: 'password',
	passReqToCallback: true
},
async (req: Request, id: string, password: string, done) => {
	try {
		let user = await UserService.isValid(id, password);
		if (!user) {
			return done(null, false, {
				message: "Invalid ID or Password!"
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
	  secretOrKey: process.env.JWT_SECRET_KEY
	},
	async (jwtPayload, done) => {
	  try {
			let user = await UserService.getInfo(jwtPayload.email);
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

export default passport;