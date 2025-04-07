import express from 'express';
import {
  addItem,
  getItems,
  updateItem,
  deleteItem,
  updateStock
} from '../controllers/admin.controller';

import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication & admin role
router.use(authenticate, authorize(['admin']));

router.post('/items', addItem);
router.get('/items', getItems);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.patch('/items/:id/stock', updateStock);

export default router;
