import express, { Application, Request, Response } from 'express';
import { connectDB } from './config/db.config.js';
import { configureServer } from './config/server.config.js';
import errorHandler from './middleware/error.middleware.js';
import { configureGoogleSignIn } from './middleware/google.middleware.js';
import { configureStaticFiles } from './middleware/static.middleware.js';
import { configureRoutes } from './routes/index.js';
import { env } from './config/env.validator.js';

process.on('uncaughtException', (err) => {
  console.error('NIEOBSŁUŻONY WYJĄTEK! Zamykanie...');
  console.error(err.name, err.message);
  process.exit(1);
});

const app: Application = express();

if (env.NODE_ENV === 'production') {
  app.disable('x-powered-by');
}

app.use('/api', (req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

configureServer(app);

configureRoutes(app);

configureGoogleSignIn(app);

configureStaticFiles(app);

app.use(errorHandler);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Nie znaleziono trasy: ${req.originalUrl}`
  });
});

const PORT: number = parseInt(env.PORT, 10);

const server = app.listen(PORT, () => {
  console.log(`Serwer uruchomiony w trybie ${env.NODE_ENV} na porcie ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('NIEOBSŁUŻONE ODRZUCENIE PROMISE! Zamykanie...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('Otrzymano SIGTERM. Zamykanie serwera...');
  server.close(() => {
    console.log('Serwer zamknięty.');
  });
});

connectDB();
