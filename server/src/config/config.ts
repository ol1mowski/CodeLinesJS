import dotenv from 'dotenv';

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
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    frontendUrl: process.env.FRONTEND_URL,
    isProduction: process.env.NODE_ENV === 'production',
  },
  db: {
    uri: process.env.MONGODB_URI,
    options: {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    cookieExpiresIn: parseInt(process.env.JWT_COOKIE_EXPIRES_IN),
  },
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Requested-With'],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
    max: parseInt(process.env.RATE_LIMIT_MAX),
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Zbyt wiele zapytań z tego adresu IP, spróbuj ponownie za 15 minut'
  },
  email: {
    host: process.env.EMAIL_HOST,
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
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