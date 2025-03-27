import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import config from "./config.js";
import { responseEnhancer } from "../utils/response.js";
import { cacheMiddleware } from "../utils/cache.js";

export const configureServer = (app) => {
  
  app.set('trust proxy', 1);
  
  app.use(express.json({ limit: config.limits.jsonBodySize }));
  app.use(express.urlencoded({ extended: true, limit: config.limits.jsonBodySize }));
  
  app.use(hpp());
  
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
    origin: config.cors.origin === '*' ? true : config.cors.origin.split(','),
    methods: config.cors.methods,
    allowedHeaders: config.cors.allowedHeaders,
    exposedHeaders: config.cors.exposedHeaders,
    credentials: config.cors.credentials,
    maxAge: config.cors.maxAge,
    preflightContinue: config.cors.preflightContinue,
    optionsSuccessStatus: config.cors.optionsSuccessStatus
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
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://accounts.google.com", "https://*.gstatic.com", "https://cdn.jsdelivr.net", "https://*.jsdelivr.net"],
        scriptSrcElem: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://accounts.google.com", "https://*.gstatic.com", "https://cdn.jsdelivr.net", "https://*.jsdelivr.net"],
        connectSrc: ["'self'", "https://accounts.google.com", "https://*.googleapis.com", "https://codelinesjs.pl", "https://www.codelinesjs.pl", "http://localhost:*", "https://fonts.gstatic.com", "https://*.jsdelivr.net"],
        frameSrc: ["'self'", "https://accounts.google.com"],
        imgSrc: ["'self'", "data:", "https://*.googleusercontent.com", "https://*.gstatic.com", "https://*.jsdelivr.net", "https://res.cloudinary.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://accounts.google.com", "https://cdn.jsdelivr.net", "https://*.jsdelivr.net"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://*.jsdelivr.net", "data:"],
        workerSrc: ["'self'", "blob:", "https://*.jsdelivr.net"],
      }
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    permissionsPolicy: {
      features: {
        identityCredentialsGet: ["'self'", "https://accounts.google.com"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: false,
    noSniff: true,
    xssFilter: true,
    hsts: {
      maxAge: 15552000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: {
      action: 'deny'
    }
  }));
  
  app.use((req, res, next) => {
    if (req.url.includes('fonts.gstatic.com') || req.url.match(/\.(woff|woff2|ttf|eot)$/)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    next();
  });
  
  app.use(compression());
  
  const apiLimiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: config.rateLimit.standardHeaders,
    legacyHeaders: config.rateLimit.legacyHeaders,
    message: config.rateLimit.message,
    skipSuccessfulRequests: false,
    keyGenerator: (req) => {
      return req.ip + '-' + (req.headers['user-agent'] || '');
    }
  });
  
  app.use('/api/', apiLimiter);
  
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',
    standardHeaders: true
  });
  
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
  app.use('/api/auth/forgot-password', authLimiter);
  
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