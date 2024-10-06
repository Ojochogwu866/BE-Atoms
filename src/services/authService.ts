import User, { IUser } from '../models/User'
import { ApplicationError } from '../middlewares/errorHandler'
import { generateToken } from '../config/auth'

export const signup = async(email: string, password: string): Promise<{user: IUser; token: string}> => {
    const existingUser = await User.findOne({ email });
    if (existingUser){
        throw new ApplicationError('Email already in use', 400)
    }

    const user = await User.create({ email, password });
    const token = generateToken(user._id)

    return { user, token };
}

export const signIn = async (email: string, password: string): Promise<{ user: IUser; token: string}> => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new ApplicationError('Invalid email or password', 401);
    }

    const token = generateToken(user._id);

    return { user, token}
}