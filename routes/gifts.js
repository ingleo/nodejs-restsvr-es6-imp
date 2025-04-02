import { Router } from 'express';
import { check } from 'express-validator';

import { getGifts, getGiftById, createGift } from '../controllers/gifts.js';
import {
  giftIdExists,
  fieldsValidators,
  validateJwt,
} from '../middlewares/index.js';

const router = Router();

router.get('/', getGifts);

router.get(
  '/:id',
  [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(giftIdExists),
    fieldsValidators,
  ],
  getGiftById
);

router.post(
  '/',
  [
    validateJwt,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('units', 'Units is mandatory').not().isEmpty(),
    fieldsValidators,
  ],
  createGift
);

export { router as giftsRouter };
