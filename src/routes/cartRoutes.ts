import express from 'express';
import {
    addToCart,
    clearCart,
    getCart,
    removeFromCart,
    mergeGuestCart
} from '../controllers/cartControllers';
import { authMiddleware } from '../middlewares/auth';
import { sessionMiddleware } from '../middlewares/sessionHandler';

const router = express.Router();

router.use(sessionMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);

router.use(authMiddleware);
router.post('/merge', mergeGuestCart);
router.delete('/clear', clearCart);

export default router;