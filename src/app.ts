require('dotenv').config();
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { connectDatabase } from './config/database';
import { errorHandler } from './middlewares/errorHandler';
import { rateLimiterMiddleware } from './middlewares/rateLimiter';
import { sessionMiddleware } from './middlewares/sessionHandler';
import { authRoutes, cartRoutes, productRoutes } from './routes';
import { logger } from './utils/logger';

const app: Application = express();

app.use(express.json());
app.use(sessionMiddleware);
app.use(helmet());
app.use(cors());
app.use(rateLimiterMiddleware());

app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

connectDatabase()
	.then(() => {
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			logger.info(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		logger.error('Failed to connec to database. Exiting now...', error);
		process.exit(1);
	});

export default app;
