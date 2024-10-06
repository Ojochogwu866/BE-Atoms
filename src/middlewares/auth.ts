import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/auth";
import { ApplicationError } from "./errorHandler";

export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer', '');

    if (!token) {
        return next(new ApplicationError('No verifiable token', 401))
    }

    try {
        const decoded = verifyToken(token)
        req.userId = decoded.userId;
        next();
    }catch(error){
        next(new ApplicationError('Token not valid', 401))
    }
};