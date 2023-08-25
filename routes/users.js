import { Router } from 'express';
import { check } from 'express-validator';

import {
  postUser,
  putUser,
  deleteUser,
  getUsers,
} from '../controllers/users.js';
import {
  emailExists,
  fieldsValidators,
  isValidRole,
  userIdExists,
  validateJwt,
  isAdminRole,
  //hasRole,
} from '../middlewares/index.js';

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password must be at least 6 letters long').isLength({
      min: 6,
    }),
    check('email', 'Invalid email format').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    fieldsValidators,
  ],
  postUser
);

router.put(
  '/:id',
  [
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(userIdExists),
    check('role').custom(isValidRole),
    fieldsValidators,
  ],
  putUser
);

router.delete(
  '/:id',
  [
    validateJwt,
    isAdminRole,
    //hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(userIdExists),
    fieldsValidators,
  ],
  deleteUser
);

export { router as usersRouter };
