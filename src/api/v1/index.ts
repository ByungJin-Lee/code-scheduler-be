import { Router } from 'express';
import auth from './auth';

const router = Router();

// API 진입점
router.get('/', (req, res) => {
	return res.send("<h1>Welcome to Api!</h1>");
});

router.use('/api/v1/login', auth);

export default router;