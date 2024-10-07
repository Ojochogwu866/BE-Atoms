import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
	points: 10,
	duration: 1,
});

export const rateLimiterMiddleware = () => {
	return (req: Request, res: Response, next: NextFunction) => {
		rateLimiter
			.consume(req.ip || '')
			.then(() => {
				next();
			})
			.catch(() => {
				res.status(429).json({
					status: 'error',
					message: 'Too many requests',
				});
			});
	};
};
