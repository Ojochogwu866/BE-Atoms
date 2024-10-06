import express from 'express';
import { authMiddleware, restrictTo } from '../middlewares/auth'
import {
    createProduct,
    getProducts,
    getProduct,
    getCategories,
    getProductsByCategory,
    updateProduct,
    deleteProduct
} from '../controllers/productControllers';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

router.get('/categories', getCategories);
router.get('/category/:category', getProductsByCategory);

router.use(authMiddleware);
router.use(restrictTo('admin', 'superuser'));

router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;