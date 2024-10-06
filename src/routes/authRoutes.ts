import express from 'express';
import { signup, signin, createSuperUser } from '../controllers/authControllers'

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/superuser', createSuperUser);

export default router;