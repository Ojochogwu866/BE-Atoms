import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../middlewares/errorHandler';
import * as productService from '../services/productService';

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const product = await productService.createProduct(req.body);
		res.status(201).json({
			status: 'success',
			data: { product },
		});
	} catch (error) {
		next(new ApplicationError('Error Creating Product', 400));
	}
};

export const getProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const limit = req.query.limit
			? parseInt(req.query.limit as string)
			: undefined;
		const products = await productService.getAllProducts(limit);
		res.status(200).json({
			status: 'success',
			data: { products },
		});
	} catch (error) {
		next(error);
	}
};

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const product = await productService.getProductById(req.params.id);
		res.status(200).json({
			status: 'success',
			data: { product },
		});
	} catch (error) {
		next(error);
	}
};

export const getCategories = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const categories = await productService.getProductsByCategories();
		res.status(200).json({
			status: 'success',
			data: { categories },
		});
	} catch (error) {
		next(error);
	}
};

export const getProductsByCategory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const category = req.params.category;
		const products = await productService.getProductsByCategory(category);
		res.status(200).json({
			status: 'success',
			data: { products },
		});
	} catch (error) {
		next(error);
	}
};

export const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const product = await productService.updateProduct(req.params.id, req.body);
		res.status(200).json({
			status: 'success',
			data: { product },
		});
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await productService.deleteProduct(req.params.id);
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		next(error);
	}
};
