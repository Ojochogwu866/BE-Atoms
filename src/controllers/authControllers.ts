import { Request, Response, NextFunction } from 'express'
import * as authService from '../services/authService'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.signup(email, password);
        res.status(201).json({
            status: 'success',
            data: {user: { id: user._id, email: user.email }, token}
        });
    } catch (error) {
        next(error)
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.signIn(email, password);

        res.status(200).json({
            status: 'success',
            data: { user: {id: user._id, email: user.email }, token}
        });
    } catch(error){
        next(error)
    }
}