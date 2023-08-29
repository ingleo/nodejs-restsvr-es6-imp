import { Router } from 'express';
import { check } from 'express-validator';

import { fileValidator } from '../middlewares/index.js';
import { updateImg, uploadFile } from '../controllers/uploads.js';
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

export { router as uploadsRouter };
