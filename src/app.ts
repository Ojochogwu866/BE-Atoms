import express, { Application } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import { errorHandler, rateLimiterMiddleware } from './middlewares'
import {productRoutes, authRoutes, cartRoutes} from './routes';
import { logger } from './utils/logger';
import { connectDatabase } from './config/database'

dotenv.config();

const app: Application = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(rateLimiterMiddleware())

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/carts', cartRoutes)

app.use(errorHandler);

connectDatabase().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`)
    });
}).catch((error) => {
    logger.error('Failed to connec to database. Exiting now...', error);
    process.exit(1)
})


export default app;