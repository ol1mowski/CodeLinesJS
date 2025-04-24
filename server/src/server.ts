import express, { Application } from 'express';

import { connectDB } from './config/db.config.js';
import { setupErrorHandlers } from './config/errorHandlers.config.js';
import { setupLogger } from './config/logger.config.js';
import { configureServer } from './config/server.config.js';
import { startServer } from './config/startServer.config.js';
import errorHandler from './middleware/error.middleware.js';
import { configureGoogleSignIn } from './middleware/google.middleware.js';
import { configureStaticFiles } from './middleware/static.middleware.js';
import { configureRoutes } from './routes/index.js';

const app: Application = express();

setupLogger(app);

configureServer(app);
configureRoutes(app);
configureGoogleSignIn(app);
configureStaticFiles(app);

app.use(errorHandler);
setupErrorHandlers(app);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

startServer(app, PORT);

connectDB();
