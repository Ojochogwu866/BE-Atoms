import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
	try {
		const dbUri = process.env.MONGODB_URI as string;
		await mongoose.connect(dbUri);
		logger.info('Connected to MongoDB');
	} catch (error) {
		logger.error('MongoDB connection error:', error);
		process.exit(1);
	}
};

export const closeDatabase = async (): Promise<void> => {
	await mongoose.connection.close();
	logger.info('MongoDB connection closed');
};
