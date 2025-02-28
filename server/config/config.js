import dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5001,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
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
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    cookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN || 24 * 60 * 60 * 1000, 
  },

  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Zbyt wiele zapytań z tego adresu IP, spróbuj ponownie za 15 minut'
  },

  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || 'noreply@codelinejs.com',
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