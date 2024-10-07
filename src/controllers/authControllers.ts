import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/authService';

export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const result = await authService.signup(email, password);
		res.status(201).json({
			status: 'success',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const signin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const result = await authService.signIn(email, password);
		res.status(200).json({
			status: 'success',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const createSuperUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password, secretKey } = req.body;
		const result = await authService.createSuperUser(
			email,
			password,
			secretKey
		);
		res.status(201).json({
			status: 'success',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
