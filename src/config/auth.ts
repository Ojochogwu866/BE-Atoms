import jwt, { JwtPayload } from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || '';
export const JWT_EXPIRES_IN = '1d';

export const generateToken = (userId: string): string => {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): jwt.JwtPayload => {
	return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
