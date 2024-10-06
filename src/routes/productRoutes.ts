import express from 'express';
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

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.get('/categories', getCategories);
router.get('/category/:category', getProductsByCategory);

export default router;