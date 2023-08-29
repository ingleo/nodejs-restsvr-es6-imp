import { Router } from 'express';
import { check } from 'express-validator';

import { fileValidator } from '../middlewares/index.js';
import {
  getImg,
  updateImg,
  uploadFile,
  updateCloudinaryImg,
  getCloudinaryImg,
} from '../controllers/uploads.js';
import { isValidCollection } from '../middlewares/db-validators.js';
import { fieldsValidators } from '../middlewares/fields-validators.js';

const router = Router();

router.post('/', fileValidator, uploadFile);

router.put(
  '/:collection/:id',
  [
    fileValidator,
    check('id', 'Not a valid id').isMongoId(),
    check('collection').custom((c) =>
      isValidCollection(c, ['users', 'products'])
    ),
    fieldsValidators,
  ],
  updateImg
);

router.get(
  '/:collection/:id',
  [
    check('id', 'Not a valid id').isMongoId(),
    check('collection').custom((c) =>
      isValidCollection(c, ['users', 'products'])
    ),
    fieldsValidators,
  ],
  getImg
);

router.put(
  '/cloudinary/:collection/:id',
  [
    fileValidator,
    check('id', 'Not a valid id').isMongoId(),
    check('collection').custom((c) =>
      isValidCollection(c, ['users', 'products'])
    ),
    fieldsValidators,
  ],
  updateCloudinaryImg
);

router.get(
  '/cloudinary/:collection/:id',
  [
    check('id', 'Not a valid id').isMongoId(),
    check('collection').custom((c) =>
      isValidCollection(c, ['users', 'products'])
    ),
    fieldsValidators,
  ],
  getCloudinaryImg
);

export { router as uploadsRouter };
