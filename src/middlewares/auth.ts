import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/auth";
import { ApplicationError } from "./errorHandler";
import * as authService from '../services/authService';
import { IUser } from '../models/User';

export interface AuthRequest extends Request {
    userId?: string;
    user?: IUser;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return next(new ApplicationError('No token provided', 401));
    }
    try {
        const decoded = verifyToken(token);
        const user = await authService.getUserById(decoded.userId);
        
        req.userId = decoded.userId;
        req.user = user;
        next();
    } catch (error) {
        next(new ApplicationError('Not authorized', 401));
    }
};

export const restrictTo = (...roles: Array<'user' | 'admin' | 'superuser'>) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApplicationError('Not authorized for this action', 403));
        }
        next();
    };
};