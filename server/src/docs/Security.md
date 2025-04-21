# Security Implementation

This document provides a comprehensive overview of the security measures implemented in the CodeLinesJS server application.

## Table of Contents

- [Authentication](#authentication)
- [Authorization](#authorization)
- [Data Protection](#data-protection)
- [Input Validation](#input-validation)
- [Rate Limiting](#rate-limiting)
- [CORS Protection](#cors-protection)
- [HTTP Security Headers](#http-security-headers)
- [Error Handling](#error-handling)
- [Secrets Management](#secrets-management)
- [Audit Logging](#audit-logging)

## Authentication

### JWT Implementation

The application uses JSON Web Tokens (JWT) for authentication:

```typescript
// src/services/token.service.ts
export class TokenService {
  generateToken(user: IUser, expiresIn: string = '24h'): string {
    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
      accountType: user.accountType,
      role: user.role || 'user'
    };
    
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn,
        jwtid: crypto.randomBytes(16).toString('hex')
      }
    );
    
    return token;
  }
  
  verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
```

### Token Extraction and Verification

The authentication middleware extracts and verifies JWTs:

```typescript
// src/api/middlewares/auth.middleware.ts
export const extractToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = tokenService.verifyToken(token);
    
    if (!decoded) {
      return next();
    }
    
    // Attach user data to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    next();
  }
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.fail('Authentication required', [
      { code: 'UNAUTHORIZED', message: 'You must be logged in to access this resource' }
    ], 401);
  }
  next();
};
```

### Password Management

User passwords are securely hashed using bcrypt:

```typescript
// src/models/user.model.ts
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(12);
    
    // Hash the password along with the new salt
    this.password = await bcrypt.hash(this.password, salt);
    
    // Record when password was changed
    this.passwordChangedAt = new Date();
    
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
```

## Authorization

### Role-Based Access Control

The application implements role-based access control to protect resources:

```typescript
// src/api/middlewares/auth.middleware.ts
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.fail('Authentication required', [
      { code: 'UNAUTHORIZED', message: 'You must be logged in to access this resource' }
    ], 401);
  }
  
  if (req.user.role !== 'admin') {
    return res.fail('Access denied', [
      { code: 'FORBIDDEN', message: 'You do not have permission to access this resource' }
    ], 403);
  }
  
  next();
};
```

### Resource Ownership Validation

Controllers verify resource ownership before allowing operations:

```typescript
// src/api/controllers/resource.controller.ts
export const updateResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    // Find the resource and check ownership
    const resource = await Resource.findById(id);
    
    if (!resource) {
      return res.fail('Resource not found', [
        { code: 'RESOURCE_NOT_FOUND', message: 'The requested resource does not exist' }
      ], 404);
    }
    
    // Check if the user owns this resource
    if (resource.userId.toString() !== userId && req.user?.role !== 'admin') {
      return res.fail('Access denied', [
        { code: 'FORBIDDEN', message: 'You do not have permission to modify this resource' }
      ], 403);
    }
    
    // Update the resource
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    return res.success(updatedResource, 'Resource updated successfully');
  } catch (error) {
    next(error);
  }
};
```

## Data Protection

### Sensitive Data Handling

The application carefully filters sensitive data before sending responses:

```typescript
// src/services/user.service.ts
export class UserService {
  sanitizeUser(user: IUser | IUserDocument) {
    const sanitizedUser = user.toObject ? user.toObject() : { ...user };
    
    // Remove sensitive fields
    delete sanitizedUser.password;
    delete sanitizedUser.resetPasswordToken;
    delete sanitizedUser.resetPasswordExpires;
    delete sanitizedUser.__v;
    
    return sanitizedUser;
  }
}
```

### Data Encryption

Sensitive environment variables are encrypted:

```typescript
// src/config/encryption.ts
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;
  
  constructor() {
    // Use environment key or generate one
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY environment variable is required');
    }
    
    this.key = crypto.scryptSync(encryptionKey, 'salt', 32);
  }
  
  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }
  
  decrypt(text: string): string {
    const [ivHex, authTagHex, encryptedText] = text.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

## Input Validation

### Request Validation

All request inputs are validated using Zod schemas:

```typescript
// src/api/validators/user.validator.ts
import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  profile: z.object({
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
    company: z.string().max(100).optional(),
    website: z.string().url().optional(),
    location: z.string().max(100).optional()
  }).optional()
});

// Validation middleware that uses the schema
export const validateUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateProfileSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.errors.map(err => ({
        code: 'VALIDATION_ERROR',
        field: err.path.join('.'),
        message: err.message
      }));
      
      return res.fail('Validation error', validationErrors, 400);
    }
    next(error);
  }
};
```

### Content Security

User-generated content is sanitized to prevent XSS attacks:

```typescript
// src/utils/sanitizer.ts
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

export const sanitizeHtml = (content: string): string => {
  return purify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    FORCE_BODY: true
  });
};

// Usage in a controller
export const createContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, body } = req.body;
    const sanitizedBody = sanitizeHtml(body);
    
    // Create content with sanitized body
    const content = await Content.create({
      title,
      body: sanitizedBody,
      userId: req.user?.userId
    });
    
    return res.success(content, 'Content created successfully', 201);
  } catch (error) {
    next(error);
  }
};
```

## Rate Limiting

The application implements rate limiting to prevent abuse:

```typescript
// src/api/middlewares/rate-limit.middleware.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '../../config/redis.config';

export const apiLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.sendCommand(args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    code: 429,
    message: 'Too many requests, please try again later.',
    errors: [
      {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'You have exceeded the allowed number of requests. Please try again later.'
      }
    ],
    meta: {
      timestamp: new Date().toISOString(),
    }
  }
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.sendCommand(args),
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 login requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    code: 429,
    message: 'Too many authentication attempts, please try again later.',
    errors: [
      {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many login attempts. Please try again after an hour.'
      }
    ],
    meta: {
      timestamp: new Date().toISOString(),
    }
  }
});

// Applied to routes
app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

## CORS Protection

The application implements CORS protection to control access:

```typescript
// src/config/cors.config.ts
import cors from 'cors';

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  // Add other allowed origins here
];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // 24 hours
};

// Applied in app.ts
app.use(cors(corsOptions));
```

## HTTP Security Headers

The application sets secure HTTP headers using Helmet:

```typescript
// src/app.ts
import helmet from 'helmet';

// Set security headers
app.use(helmet());

// Configure Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://secure.gravatar.com'],
      connectSrc: ["'self'", process.env.API_URL || 'http://localhost:5001'],
    },
  })
);

// Prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Set X-XSS-Protection header
app.use(helmet.xssFilter());

// Disable X-Powered-By header
app.use(helmet.hidePoweredBy());
```

## Error Handling

The application implements secure error handling:

```typescript
// src/api/middlewares/error.middleware.ts
export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Log the error for internal debugging
  console.error('Error:', err);
  
  // Default error values
  let statusCode = 500;
  let message = 'An unexpected error occurred';
  let errors: ApiError[] = [];
  let errorCode = 'INTERNAL_SERVER_ERROR';
  
  // Handle different types of errors
  if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.message;
    errors = err.errors || [];
    errorCode = 'VALIDATION_ERROR';
  } else if (err instanceof AuthError) {
    statusCode = 401;
    message = err.message;
    errorCode = 'AUTHENTICATION_ERROR';
  } else if (err instanceof ForbiddenError) {
    statusCode = 403;
    message = err.message;
    errorCode = 'FORBIDDEN_ERROR';
  } else if (err instanceof NotFoundError) {
    statusCode = 404;
    message = err.message;
    errorCode = 'NOT_FOUND_ERROR';
  } else {
    // For unexpected errors, don't leak error details in production
    if (process.env.NODE_ENV === 'production') {
      message = 'An unexpected error occurred';
    } else {
      message = err.message;
    }
  }
  
  // Send error response
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message,
    errors: errors.length > 0 ? errors : [{ code: errorCode, message }],
    meta: {
      timestamp: new Date().toISOString(),
      requestId: req.id
    },
    // Include stack trace only in development
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};
```

## Secrets Management

The application securely manages secrets:

```typescript
// src/config/env.config.ts
import dotenv from 'dotenv';
import * as fs from 'fs';

// Load environment variables
if (fs.existsSync('.env')) {
  dotenv.config();
} else if (fs.existsSync('.env.production') && process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else if (fs.existsSync('.env.development') && process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
}

// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'PORT'
];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Export validated environment variables
export default {
  mongodb: {
    uri: process.env.MONGODB_URI as string,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  },
  server: {
    port: parseInt(process.env.PORT as string, 10),
    env: process.env.NODE_ENV || 'development',
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
  },
};
```

## Audit Logging

The application implements comprehensive audit logging:

```typescript
// src/utils/audit-logger.ts
import winston from 'winston';

// Configure Winston logger
const auditLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/audit.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// Log user activities
export const logUserActivity = (
  userId: string,
  action: string,
  details: Record<string, any> = {},
  status: 'success' | 'failure' = 'success'
) => {
  auditLogger.info({
    userId,
    action,
    details,
    status,
    timestamp: new Date().toISOString(),
  });
};

// Example usage in authentication controller
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const result = await authService.loginUser(email, password);
    
    // Log successful login
    logUserActivity(
      result.user.id,
      'user.login',
      { email, ip: req.ip }
    );
    
    return res.success(result, 'Login successful');
  } catch (error) {
    // Log failed login attempt
    logUserActivity(
      'unknown',
      'user.login',
      { email: req.body.email, ip: req.ip, error: error.message },
      'failure'
    );
    
    next(error);
  }
};
```

By implementing these security measures, the CodeLinesJS server provides robust protection against common web vulnerabilities and ensures the secure handling of user data. 