import Router from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth.js';
import { fieldsValidators } from '../middlewares/index.js';

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    fieldsValidators,
  ],
  login
);

export { router as authRouter };
