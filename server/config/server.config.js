import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cookieParser from "cookie-parser";
import config from "./config.js";
import { responseEnhancer } from "../utils/response.js";
import { cacheMiddleware } from "../utils/cache.js";

export const configureServer = (app) => {
  
  app.set('trust proxy', 1);
  
  app.use(express.json({ limit: config.limits.jsonBodySize }));
  app.use(express.urlencoded({ extended: true, limit: config.limits.jsonBodySize }));
  
  app.use((req, res, next) => {
    const startTime = Date.now();
    
    const originalSend = res.send;
    res.send = function(body) {
      const responseTime = Date.now() - startTime;
      
      return originalSend.apply(this, arguments);
    };
    
    next();
  });
  
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
    res.setHeader('Permissions-Policy', 'identity-credentials-get=(self "https://accounts.google.com")');
    next();
  });
  
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://accounts.google.com", "https://*.gstatic.com"],
        connectSrc: ["'self'", "https://accounts.google.com", "https://*.googleapis.com", "https://codelinesjs.pl", "https://www.codelinesjs.pl", "http://localhost:*"],
        frameSrc: ["'self'", "https://accounts.google.com"],
        imgSrc: ["'self'", "data:", "https://*.googleusercontent.com", "https://*.gstatic.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://accounts.google.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
      }
    },
    permissionsPolicy: {
      features: {
        identityCredentialsGet: ["'self'", "https://accounts.google.com"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false
  }));
  
  app.use(compression());
  
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Zbyt wiele zapytań z tego adresu IP, spróbuj ponownie za 15 minut'
  });
  app.use('/api/', limiter);
  
  app.use(cookieParser());
  app.use(mongoSanitize());
  app.use(compression());
  app.use(responseEnhancer);
  
  app.use((req, res, next) => {
    if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
    next();
  });
  
  app.use('/api/stats', cacheMiddleware(60));
  app.use('/api/ranking', cacheMiddleware(300));
  app.use('/api/learning-paths', cacheMiddleware(600));
  app.use('/api/lessons', cacheMiddleware(600));
  app.use('/api/resources', cacheMiddleware(600));
  
  return app;
}; 