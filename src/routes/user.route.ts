import express from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { getAvailableItems, placeOrder } from '../controllers/user.controller';

const router = express.Router();

router.use(authenticate, authorize(['user']));

router.get('/items', getAvailableItems);
router.post('/orders', placeOrder);

export default router;
