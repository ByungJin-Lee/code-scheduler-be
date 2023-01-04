import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import env from '../../configs/env';
import UserService from '../../services/UserService';
import { UserDTO, UserModel } from '../../models/user';
import { validators } from '../../middlewares/validator';

const router = Router();

router.post('/login', ...validators.user_login, async (req, res) => {
	passport.authenticate('local', (error, user, info) => {
		if (error || !user) {
		  return res.status(400).retJson(0, false, {reason: info.message});
		}
	
		req.login(user, (error) => {
		  if (error) {
			console.error(error);
			return res.status(400).retJson(0, false, {reason: info.message});
		  }
		})
	
		const token = jwt.sign(
		  {email: user.email},
		  env.JWT_SECRET_KEY as jwt.Secret,
		  {expiresIn: '10m'}
		);
	
		return res.status(200).retJson(0, true, {token});
	})(req, res);
})

router.post('/signup', ...validators.user_signup, async (req, res) => {
	if (await UserService.signup(req.body as UserDTO))
		return res.status(200).retJson(0, true);
	else
		return res.status(400).retJson(0, false, {reason: "user already exists"});
})

export default router;