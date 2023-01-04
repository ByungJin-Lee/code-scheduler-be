import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
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
		  process.env.JWT_SECRET_KEY as jwt.Secret,
		  {expiresIn: '10m'}
		);
	
		return res.status(200).retJson(0, true, {token});
	})(req, res);
})

export default router;