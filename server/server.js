import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";
import cookieParser from "cookie-parser";

import config from "./config/config.js";
import { responseEnhancer } from "./utils/response.js";
import authRoutes from "./routes/auth.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import groupsRoutes from "./routes/groups.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import postsRoutes from './routes/posts.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import learningPathsRoutes from './routes/learningPaths.routes.js';
import lessonsRoutes from './routes/lessons.routes.js';
import { initializeModels } from './models/index.js';
import resourcesRoutes from './routes/resources.routes.js';
import usersRoutes from './routes/users.routes.js';
import gamesRoutes from './routes/games.routes.js';
import progressRoutes from './routes/progress.routes.js';

const app = express();
const { isProduction } = config.app;

app.use(helmet({
  contentSecurityPolicy: isProduction ? undefined : false,
  crossOriginEmbedderPolicy: isProduction ? undefined : false,
}));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Zbyt wiele zapytań z tego adresu IP, spróbuj ponownie za 15 minut'
});
app.use('/api/', limiter);

app.use(express.json({ limit: config.limits.jsonBodySize }));
app.use(express.urlencoded({ extended: true, limit: config.limits.jsonBodySize }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());

app.use(hpp({
  whitelist: [
    'points', 'level', 'streak', 'limit', 'page', 'sort'
  ]
}));

app.use(compression());

app.use(cors({
  origin: isProduction ? config.cors.origin : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}));

app.use(responseEnhancer);

if (!isProduction) {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV });
});

app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/learning-paths", learningPathsRoutes);
app.use("/api/lessons", lessonsRoutes);
app.use("/api/resources", resourcesRoutes);
app.use('/api/users', usersRoutes);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Nie znaleziono trasy: ${req.originalUrl}`
  });
});

app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri, config.db.options);
    console.log("Connected to MongoDB");
    initializeModels();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    if (isProduction) {
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectDB, 5000);
    }
  }
};

connectDB();

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...', err.name, err.message);
  if (isProduction) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...', err.name, err.message);
  if (isProduction) {
    process.exit(1);
  }
});

const PORT = process.env.PORT || config.app.port || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;