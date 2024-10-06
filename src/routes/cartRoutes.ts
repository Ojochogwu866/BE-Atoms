import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cartControllers'
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

export default router;