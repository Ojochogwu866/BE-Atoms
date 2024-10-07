import { generateToken } from '../config/auth';
import { ApplicationError } from '../middlewares/errorHandler';
import User, { IUser } from '../models/User';

interface UserResponse {
	user: {
		id: string;
		email: string;
		role: string;
	};
	token: string;
}

export const signup = async (
	email: string,
	password: string,
	role: 'user' | 'admin' | 'superuser' = 'user'
): Promise<UserResponse> => {
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new ApplicationError('Email already in use', 400);
	}
	const user = await User.create({ email, password, role });
	const token = generateToken(user._id);
	return {
		user: {
			id: user._id,
			email: user.email,
			role: user.role,
		},
		token,
	};
};

export const signIn = async (
	email: string,
	password: string
): Promise<UserResponse> => {
	const user = await User.findOne({ email });
	if (!user || !(await user.comparePassword(password))) {
		throw new ApplicationError('Invalid email or password', 401);
	}
	const token = generateToken(user._id);
	return {
		user: {
			id: user._id,
			email: user.email,
			role: user.role,
		},
		token,
	};
};

export const createSuperUser = async (
	email: string,
	password: string,
	secretKey: string
): Promise<UserResponse> => {
	if (secretKey !== process.env.SUPER_USER_SECRET_KEY) {
		throw new ApplicationError('Not authorized to create superuser', 403);
	}

	const existingSuperUser = await User.findOne({ role: 'superuser' });
	if (existingSuperUser) {
		throw new ApplicationError('Superuser already exists', 400);
	}

	return signup(email, password, 'superuser');
};

export const getUserById = async (userId: string): Promise<IUser> => {
	const user = await User.findById(userId);
	if (!user) {
		throw new ApplicationError('User not found', 404);
	}
	return user;
};
