import { Router } from 'express';
import { translate, getHistory, deleteTranslation } from '../controllers/translate.controller';
import { verifyToken } from '../middlewares/auth';
import { translateLimiter } from '../middlewares/rateLimit';

const router = Router();

router.post('/', verifyToken, translateLimiter, translate);
router.get('/history', verifyToken, getHistory);
router.delete('/:id', verifyToken, deleteTranslation);

export default router;