import { Router } from 'express';
import { check } from 'express-validator';

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/products.js';
import {
  categoryIdExists,
  productIdExists,
  fieldsValidators,
  validateJwt,
} from '../middlewares/index.js';

const router = Router();

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(productIdExists),
    fieldsValidators,
  ],
  getProductById
);

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

router.put(
  '/:id',
  [
    validateJwt,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(productIdExists),
    check('category', 'Not a valid category id').isMongoId(),
    check('category').custom(categoryIdExists),
    fieldsValidators,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    validateJwt,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(productIdExists),
    fieldsValidators,
  ],
  deleteProduct
);

export { router as productsRouter };
