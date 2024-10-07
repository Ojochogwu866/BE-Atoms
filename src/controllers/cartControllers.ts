import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { ApplicationError } from '../middlewares/errorHandler';
import * as cartService from '../services/cartService';

export const getCart = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.userId;
		if (!userId) throw new ApplicationError('User not authenticated', 401);

		const cart = await cartService.getCartByUserId(userId);
		res.status(200).json({
			status: 'success',
			data: { cart },
		});
	} catch (error) {
		next(error);
	}
};

export const addToCart = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.userId;
		if (!userId) throw new ApplicationError('User not authenticated', 401);

		const { productId, quantity } = req.body;
		const cart = await cartService.addToCart(userId, productId, quantity);
		res.status(200).json({
			status: 'success',
			data: { cart },
		});
	} catch (error) {
		next(error);
	}
};

export const removeFromCart = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.userId;
		if (!userId) throw new ApplicationError('User not authenticated', 401);

		const { productId } = req.params;
		const cart = await cartService.removeFromCart(userId, productId);
		res.status(200).json({
			status: 'success',
			data: { cart },
		});
	} catch (error) {
		next(error);
	}
};

export const clearCart = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.userId;
		if (!userId) throw new ApplicationError('User not authenticated', 401);

		await cartService.clearCart(userId);
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		next(error);
	}
};
