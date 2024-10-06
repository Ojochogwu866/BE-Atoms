import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export class ApplicationError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(err);

    if(err instanceof ApplicationError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}
