import express from 'express';
import {
    addToCart,
    clearCart,
    getCart,
    mergeGuestCart,
    removeFromCart,
} from '../controllers/cartControllers';
import { authMiddleware } from '../middlewares/auth';
import { sessionMiddleware } from '../middlewares/sessionHandler';

const router = express.Router();

// Apply session middleware to all cart routes
router.use(sessionMiddleware);

// Public routes (both authenticated and guest users)
router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove/:productId', authMiddleware, removeFromCart); // Adding auth here since your controller requires userId

// Protected routes (authenticated users only)
router.use(authMiddleware);
router.post('/merge', mergeGuestCart);
router.delete('/clear', clearCart);

export default router;