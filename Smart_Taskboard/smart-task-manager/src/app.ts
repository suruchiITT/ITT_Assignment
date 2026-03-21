import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import env from './config/env';

const app: Express = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json());

// Health check (mirrors Spring Actuator)
app.get('/actuator/health', (req: Request, res: Response): void => {
  res.json({ status: 'UP' });
});

// All API routes
app.use('/api', routes);

// 404 fallback
app.use((req: Request, res: Response): void => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler (4 params required by Express)
app.use(errorHandler);

export default app;
