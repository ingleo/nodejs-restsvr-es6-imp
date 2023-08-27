import { Router } from 'express';
import { check } from 'express-validator';

import { createProduct } from '../controllers/products.js';
import {
  categoryIdExists,
  fieldsValidators,
  validateJwt,
} from '../middlewares/index.js';

const router = Router();

router.post(
  '/',
  [
    validateJwt,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('category', 'Not a valid id').isMongoId(),
    check('category').custom(categoryIdExists),
    fieldsValidators,
  ],
  createProduct
);

export { router as productsRouter };
