import { Router } from 'express';
import { check } from 'express-validator';

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js';

import {
  validateJwt,
  fieldsValidators,
  categoryIdExists,
  isAdminRole,
} from '../middlewares/index.js';

const router = Router();

router.get('/', getCategories);

router.get(
  '/:id',
  [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categoryIdExists),
    fieldsValidators,
  ],
  getCategoryById
);

router.post(
  '/',
  [
    validateJwt,
    check('name', 'Name is mandatory').not().isEmpty(),
    fieldsValidators,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJwt,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categoryIdExists),
    check('name', 'The Name is mandatory').not().isEmpty(),
    fieldsValidators,
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    validateJwt,
    isAdminRole,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categoryIdExists),
    fieldsValidators,
  ],
  deleteCategory
);

export { router as categoriesRouter };
