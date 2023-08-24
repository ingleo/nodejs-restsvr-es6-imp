import { Router } from 'express';
import { check } from 'express-validator';

import { postUser } from '../controllers/users.js';
import { emailExists, fieldsValidators } from '../middlewares/index.js';

const router = Router();

router.post(
  '/',
  [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password must be at least 6 letters long').isLength({
      min: 6,
    }),
    check('email', 'Invalid email format').isEmail(),
    check('email').custom(emailExists),
    fieldsValidators,
  ],
  postUser
);

export { router as usersRouter };
