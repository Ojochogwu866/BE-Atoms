import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

export class ApplicationError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, ApplicationError.prototype);
	}
}

export const errorHandler: ErrorRequestHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
): void => {
	logger.error(err);

	if (err instanceof ApplicationError) {
		res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
		return;
	}

	res.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
	return;
};
