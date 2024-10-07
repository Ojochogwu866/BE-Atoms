import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ApplicationError } from './errorHandler';

export const validate = (schema: Joi.ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);
		if (error) {
			const errorMessage = error.details
				.map((detail) => detail.message)
				.join(', ');
			return next(new ApplicationError(errorMessage, 400));
		}
		next();
	};
};
