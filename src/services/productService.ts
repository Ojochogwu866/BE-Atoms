import { ApplicationError } from '../middlewares/errorHandler';
import Product, { IProduct } from '../models/Product';

export const getAllProducts = async (limit?: number): Promise<IProduct[]> => {
	return Product.find().limit(limit || 0);
};

export const getProductById = async (id: string): Promise<IProduct> => {
	const product = await Product.findById(id);
	if (!product) {
		throw new ApplicationError('Product not found', 404);
	}
	return product;
};

export const getProductsByCategories = async (): Promise<string[]> => {
	return Product.distinct('category');
};

export const getProductsByCategory = async (
	category: string
): Promise<IProduct[]> => {
	return Product.find({ category });
};

export const createProduct = async (
	productData: Partial<IProduct>
): Promise<IProduct> => {
	return Product.create(productData);
};

export const updateProduct = async (
	id: string,
	productData: Partial<IProduct>
): Promise<IProduct> => {
	const product = await Product.findByIdAndUpdate(id, productData, {
		new: true,
		runValidators: true,
	});
	if (!product) {
		throw new ApplicationError('Product not found', 404);
	}
	return product;
};

export const deleteProduct = async (id: string): Promise<void> => {
	const product = await Product.findByIdAndDelete(id);
	if (!product) {
		throw new ApplicationError('Product not found', 404);
	}
};
