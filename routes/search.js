import { Router } from 'express';

import { search } from '../controllers/search.js';

const router = Router();
router.get('/:collection/:term', search);

export { router as searchRouter };
