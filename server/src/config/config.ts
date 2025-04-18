import dotenv from 'dotenv';
import { env } from './env.validator.js';

dotenv.config();

interface AppConfig {
  env: string;
  port: string | number;
  frontendUrl: string;
  isProduction: boolean;
}

interface DbConfig {
  uri: string;
  options: {
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
  };
}

interface JwtConfig {
  secret: string;
  expiresIn: string;
  cookieExpiresIn: number;
}

interface CorsConfig {
  origin: string;
  credentials: boolean;
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge: number;
  preflightContinue: boolean;
  optionsSuccessStatus: number;
}

interface RateLimitConfig {
  windowMs: number;
  max: number;
  standardHeaders: boolean;
  legacyHeaders: boolean;
  message: string;
}

interface EmailConfig {
  host: string;
  sendgridApiKey: string;
  port: string;
  user: string;
  password: string;
  from: string;
}

interface LimitsConfig {
  jsonBodySize: string;
  fileUploadSize: string;
}

interface SecurityConfig {
  bcryptSaltRounds: number;
  passwordResetTokenExpiresIn: number;
}

interface Config {
  app: AppConfig;
  db: DbConfig;
  jwt: JwtConfig;
  cors: CorsConfig;
  rateLimit: RateLimitConfig;
  email: EmailConfig;
  limits: LimitsConfig;
  security: SecurityConfig;
}

const config: Config = {
  app: {
    env: env.NODE_ENV,
    port: env.PORT,
    frontendUrl: env.FRONTEND_URL,
    isProduction: env.NODE_ENV === 'production',
  },
  db: {
    uri: env.MONGODB_URI,
    options: {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
    cookieExpiresIn: parseInt(env.JWT_COOKIE_EXPIRES_IN),
  },
  cors: {
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'],
    exposedHeaders: ['Content-Length', 'X-Requested-With'],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
  },
  rateLimit: {
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS),
    max: parseInt(env.RATE_LIMIT_MAX),
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Zbyt wiele zapytań z tego adresu IP, spróbuj ponownie za 15 minut'
  },
  email: {
    host: env.EMAIL_HOST,
    sendgridApiKey: env.SENDGRID_API_KEY,
    port: env.EMAIL_PORT,
    user: env.EMAIL_USER,
    password: env.EMAIL_PASSWORD,
    from: env.EMAIL_FROM,
  },
  limits: {
    jsonBodySize: '10kb',
    fileUploadSize: '5mb',
  },
  security: {
    bcryptSaltRounds: 12,
    passwordResetTokenExpiresIn: 60 * 60 * 1000,
  }
};

export default config; 