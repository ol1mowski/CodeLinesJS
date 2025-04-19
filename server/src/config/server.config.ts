import express, { NextFunction, Request, Response, Application } from "express";
import cors from "cors";
import helmet, { HelmetOptions } from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import config from "./config.js";
import { responseEnhancer } from "../utils/response.js";
import { cacheMiddleware } from "../utils/cache.js";

export const configureServer = (app: Application): Application => {
  
  app.set('trust proxy', 1);
  app.use(express.json({ limit: config.limits.jsonBodySize }));
  app.use(express.urlencoded({ extended: true, limit: config.limits.jsonBodySize }));
  
  app.use(hpp());
  
  app.use((req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    res.send = function(body: any) {
      return originalSend.call(this, body);
    };
    
    next();
  });
  
  const helmetConfig = {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.google-analytics.com", "https://www.googletagmanager.com", "https://cdn.jsdelivr.net", "https://accounts.google.com", "https://*.gstatic.com"],
        scriptSrcElem: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.google-analytics.com", "https://www.googletagmanager.com", "https://cdn.jsdelivr.net", "https://accounts.google.com", "https://*.gstatic.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://accounts.google.com"],
        imgSrc: ["'self'", "data:", "https://www.google-analytics.com", "https://www.googletagmanager.com", "https://res.cloudinary.com", "https://*.googleusercontent.com", "https://*.gstatic.com"],
        connectSrc: ["'self'", "https://www.google-analytics.com", "https://www.googletagmanager.com", "https://accounts.google.com", "https://*.googleapis.com", "http://localhost:*", "https://codelinesjs.pl", "https://www.codelinesjs.pl"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net", "data:"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        frameSrc: ["'self'", "https://accounts.google.com"],
        formAction: ["'self'"],
        baseUri: ["'self'"],
        manifestSrc: ["'self'"],
        upgradeInsecureRequests: [],
        workerSrc: ["'self'", "blob:"]
      }
    },
    xssFilter: true,
    frameguard: {
      action: 'deny'
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    referrerPolicy: {
      policy: "strict-origin-when-cross-origin" as "strict-origin-when-cross-origin"
    },
    permissionsPolicy: {
      features: {
        geolocation: ["'self'"],
        camera: ["'none'"],
        microphone: ["'none'"],
        speaker: ["'none'"],
        fullscreen: ["'self'"]
      }
    },
    noCache: process.env.NODE_ENV === 'production' ? false : true,
    dnsPrefetchControl: {
      allow: false
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false
  };
  
  app.use(helmet(helmetConfig as HelmetOptions));
  
  app.use(cors({
    origin: config.cors.origin === '*' ? true : config.cors.origin?.split(','),
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
  
  app.use((req, res, next) => {
    if (req.url.includes('fonts.gstatic.com') || req.url.match(/\.(woff|woff2|ttf|eot)$/)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    next();
  });
  
  app.use(compression());
  
  app.use(cookieParser());
  
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 'error',
      message: 'Zbyt wiele żądań, spróbuj ponownie później',
    }
  });
  
  const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 'error',
      message: 'Zbyt wiele prób logowania, spróbuj ponownie później',
    }
  });
  
  app.use('/api/', apiLimiter);
  app.use('/api/auth', authLimiter);
  
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