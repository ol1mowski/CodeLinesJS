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
const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

app.use(cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

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

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use(express.json({ limit: config.limits.jsonBodySize }));
app.use(express.urlencoded({ extended: true, limit: config.limits.jsonBodySize }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(compression());

app.use(responseEnhancer);

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

app.get('*', (req, res) => {
  if (req.path.startsWith('/assets/') || req.path.endsWith('.js') || req.path.endsWith('.css') || req.path.endsWith('.png') || req.path.endsWith('.svg')) {
    const filePath = path.join(__dirname, 'public', req.path);
    console.log('Próba serwowania pliku statycznego:', filePath);
    
    if (req.path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (req.path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    
    return res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Błąd serwowania pliku statycznego:', err);
        return res.status(404).send('Nie znaleziono pliku');
      }
    });
  }
  
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
