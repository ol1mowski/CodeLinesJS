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
import path from 'path';
import { fileURLToPath } from 'url';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const { isProduction } = config.app;

app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Zbyt wiele zapytań z tego adresu IP, spróbuj ponownie za 15 minut'
});
app.use('/api/', limiter);

app.use(express.static(path.join(__dirname, 'public')));
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

app.options('*', (req, res) => {
  console.log('Obsługa żądania OPTIONS bezpośrednio');
  
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  
  res.status(200).end();
});

app.use((req, res, next) => {
  const host = req.headers.host;
  
  console.log('Host:', host);
  console.log('Origin:', req.headers.origin);
  console.log('Referer:', req.headers.referer);
  
  const allowedOrigins = [
    'https://codelinesjs.pl',
    'https://www.codelinesjs.pl',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    console.log('Obsługa żądania OPTIONS');
    return res.status(200).end();
  }
  
  next();
});

app.use(responseEnhancer);

app.use((req, res, next) => {
  console.log('Request origin:', req.headers.origin);
  console.log('Request method:', req.method);
  console.log('Request path:', req.path);
  next();
});

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

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
