import express from 'express';
import { loginValidation, signupValidation } from '../middlewares/AuthValidation.js';
import { login, signUp } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signupValidation, signUp)

router.post('/login', loginValidation, login);


export default router;