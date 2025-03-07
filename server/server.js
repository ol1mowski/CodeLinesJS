import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import fs from 'fs';

process.on('uncaughtException', (err) => {
});

process.on('unhandledRejection', (err) => {
});

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

app.use(express.json({ limit: config.limits.jsonBodySize }));
app.use(express.urlencoded({ extended: true, limit: config.limits.jsonBodySize }));

app.use(cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use((req, res, next) => {
  if (req.headers.referer && req.headers.referer.includes('accounts.google.com')) {
    res.setHeader('Access-Control-Allow-Origin', 'https://accounts.google.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://accounts.google.com", "https://*.gstatic.com"],
      connectSrc: ["'self'", "https://accounts.google.com", "https://*.googleapis.com"],
      frameSrc: ["'self'", "https://accounts.google.com"],
      imgSrc: ["'self'", "data:", "https://*.googleusercontent.com", "https://*.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false
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

app.use(cookieParser());

app.use(mongoSanitize());

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

app.options('/google-signin-proxy', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(204).end();
});

app.use('/google-signin-proxy', async (req, res) => {
  try {
    const targetUrl = 'https://accounts.google.com/gsi/transform';

    try {
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': req.headers['user-agent'],
          'Origin': req.headers.origin || process.env.FRONTEND_URL
        },
        body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
      });

      const data = await response.text();

      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      res.status(response.status).send(data);
    } catch (fetchError) {

      res.status(502).json({
        status: 'error',
        message: 'Błąd komunikacji z serwerem Google',
        error: fetchError.message
      });
    }
  } catch (error) {

    res.status(500).json({
      status: 'error',
      message: 'Błąd proxy',
      error: error.message
    });
  }
});

app.get(['/auth/google/callback', '/login/google/callback', '/oauth/google/callback'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.all('/api/*', (req, res) => {
  return res.status(404).json({ error: 'API endpoint not found' });
});

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.get([
  '/assets/*',
  '*.js',
  '*.css',
  '*.png',
  '*.svg',
  '*.ico',
  '*.json',
  '/favicon.ico',
  '/manifest.json'
], (req, res, next) => {
  const filePath = path.join(__dirname, 'public', req.path);

  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  } else if (req.path.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  } else if (req.path.endsWith('.json')) {
    res.setHeader('Content-Type', 'application/json');
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      next();
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      res.status(500).send('Błąd serwera');
    }
  });
});

app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri, config.db.options);
    initializeModels();
  } catch (err) {
    if (isProduction) {
      setTimeout(connectDB, 5000);
    }
  }
};

connectDB();

const PORT = process.env.PORT || config.app.port || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
