# Server Architecture

This document provides a comprehensive overview of the CodeLinesJS server architecture, design patterns, and implementation details.

## Table of Contents

- [Overall Architecture](#overall-architecture)
- [Code Organization](#code-organization)
- [Request Flow](#request-flow)
- [Design Patterns](#design-patterns)
- [API Extension](#api-extension)
- [Testing Strategy](#testing-strategy)

## Overall Architecture

The CodeLinesJS server is built on a layered architecture that separates concerns and promotes maintainability:

### Architectural Layers

1. **Router Layer** - Maps HTTP endpoints to controller methods
2. **Middleware Layer** - Processes requests before they reach controllers
3. **Controller Layer** - Handles HTTP requests and responses
4. **Service Layer** - Implements business logic
5. **Data Access Layer** - Interacts with the database (Mongoose models)

This separation ensures that each component has a single responsibility and makes the codebase more testable and maintainable.

## Code Organization

The codebase is organized by feature and technical concern:

```
src/
├── api/                   # API-related components
│   ├── controllers/       # Request handlers grouped by domain
│   │   ├── auth/          # Authentication controllers
│   │   ├── users/         # User-related controllers
│   │   └── settings/      # Settings controllers
│   ├── middlewares/       # Express middlewares
│   │   ├── auth.middleware.ts     # Authentication middleware
│   │   ├── error.middleware.ts    # Error handling middleware
│   │   └── validation.middleware.ts # Request validation middleware
│   ├── routes/            # Route definitions
│   │   ├── auth.routes.ts # Authentication routes
│   │   ├── users.routes.ts # User routes
│   │   └── settings.routes.ts # Settings routes
│   └── validators/        # Request validation schemas
├── config/                # Application configuration
│   ├── database.config.ts # Database configuration
│   ├── server.config.ts   # Server configuration
│   └── auth.config.ts     # Auth configuration
├── models/                # Mongoose models
│   ├── user.model.ts      # User model
│   └── token.model.ts     # Token model
├── services/              # Business logic services
│   ├── auth.service.ts    # Authentication service
│   ├── user.service.ts    # User service
│   └── email.service.ts   # Email service
├── types/                 # TypeScript type definitions
│   ├── auth.types.ts      # Auth-related types
│   ├── user.types.ts      # User-related types
│   └── common.types.ts    # Common type definitions
├── utils/                 # Utility functions
│   ├── apiResponse.ts     # Response formatting utilities
│   ├── errors.ts          # Custom error classes
│   └── logger.ts          # Logging utility
├── app.ts                 # Express application setup
└── server.ts              # Server entry point
```

## Request Flow

The typical flow of a request through the server:

1. **Request Reception**: The Express server receives an HTTP request
2. **Global Middleware**: Request passes through global middleware (logging, CORS, etc.)
3. **Route Matching**: Router matches the request to a specific route
4. **Route-specific Middleware**: Request passes through route-specific middleware (authentication, validation)
5. **Controller**: The route handler processes the request and calls appropriate services
6. **Service**: Business logic is executed, typically involving database operations
7. **Response Formation**: Controller formats the response using the standardized response format
8. **Response Sending**: Response is sent back to the client
9. **Error Handling**: If an error occurs at any point, it's caught by the error middleware

### Example Request Flow

```
Client → Express Server → Global Middleware → Router → Auth Middleware → 
Validation Middleware → Controller → Service → Model → Database → 
Service → Controller → Response Formatter → Client
```

## Design Patterns

The server implements several design patterns to improve code organization and maintainability:

### Service Pattern

Business logic is encapsulated in services, separating it from controllers:

```typescript
// Example from auth.service.ts
export class AuthService {
  async loginUser(email: string, password: string, rememberMe = false) {
    // Authentication logic
    const user = await User.findOne({ email });
    if (!user) throw new AuthError('Invalid credentials');
    
    // Password validation
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AuthError('Invalid credentials');
    
    // Token generation
    const token = this.tokenService.generateToken(user, rememberMe ? '30d' : '24h');
    
    return { token, user: this.sanitizeUser(user) };
  }
}
```

### Repository Pattern

Although not explicitly implemented as separate classes, Mongoose models act as repositories that encapsulate data access logic:

```typescript
// Example data access in a service
const user = await User.findById(userId)
  .select('username email profile')
  .lean();
```

### Middleware Pattern

Express middleware is used to handle cross-cutting concerns:

```typescript
// Authentication middleware
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.fail('Authentication required', [
      { code: 'UNAUTHORIZED', message: 'You must be logged in to access this resource' }
    ], 401);
  }
  next();
};
```

### Factory Pattern

The response utilities use a factory pattern to create standardized responses:

```typescript
// Response factory methods
declare global {
  namespace Express {
    interface Response {
      success(data: any, message?: string, statusCode?: number): void;
      fail(message: string, errors?: ApiError[], statusCode?: number): void;
      error(message: string, error?: any, statusCode?: number): void;
    }
  }
}

// Implementation
app.use((req, res, next) => {
  res.success = (data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
      status: 'success',
      code: statusCode,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.id
      }
    });
  };
  
  // Similar implementations for res.fail and res.error
  next();
});
```

## API Extension

Adding new features to the API follows a consistent pattern:

### 1. Define Types

Create TypeScript interfaces and types:

```typescript
// src/types/feature.types.ts
export interface NewFeatureData {
  name: string;
  description: string;
  // other properties
}

export interface NewFeatureResponse {
  id: string;
  name: string;
  // other properties
}
```

### 2. Create or Update Model

Define the database schema:

```typescript
// src/models/feature.model.ts
import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // other fields
}, { timestamps: true });

export const Feature = mongoose.model('Feature', featureSchema);
```

### 3. Create Service

Implement business logic:

```typescript
// src/services/feature.service.ts
import { Feature } from '../models/feature.model';
import { NewFeatureData } from '../types/feature.types';

export class FeatureService {
  async createFeature(userId: string, data: NewFeatureData) {
    const feature = await Feature.create({
      ...data,
      userId
    });
    
    return feature;
  }
  
  async getFeature(featureId: string, userId: string) {
    const feature = await Feature.findOne({ _id: featureId, userId });
    if (!feature) {
      throw new Error('Feature not found');
    }
    return feature;
  }
  
  // other methods
}

export default new FeatureService();
```

### 4. Create Controller

Handle HTTP requests:

```typescript
// src/api/controllers/feature.controller.ts
import { Request, Response, NextFunction } from 'express';
import featureService from '../../../services/feature.service';

export const createFeature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.fail('User not authenticated', [], 401);
    }
    
    const feature = await featureService.createFeature(userId, { name, description });
    
    return res.success(feature, 'Feature created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getFeature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { featureId } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.fail('User not authenticated', [], 401);
    }
    
    const feature = await featureService.getFeature(featureId, userId);
    
    return res.success(feature, 'Feature retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// other controller methods
```

### 5. Create Validation Schemas

Define request validation:

```typescript
// src/api/validators/feature.validator.ts
import { z } from 'zod';

export const createFeatureSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000)
});

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>;
```

### 6. Create Routes

Define API endpoints:

```typescript
// src/api/routes/feature.routes.ts
import { Router } from 'express';
import * as featureController from '../controllers/feature.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { createFeatureSchema } from '../validators/feature.validator';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth);

router.post(
  '/',
  validateRequest(createFeatureSchema),
  featureController.createFeature
);

router.get(
  '/:featureId',
  featureController.getFeature
);

// other routes

export default router;
```

### 7. Register Routes

Add routes to the Express application:

```typescript
// src/app.ts
import featureRoutes from './api/routes/feature.routes';

// ... other imports and setup

app.use('/api/features', featureRoutes);
```

## Testing Strategy

The server uses a comprehensive testing strategy:

### Unit Tests

Test individual functions and classes in isolation:

```typescript
// tests/unit/services/auth.service.test.ts
describe('AuthService', () => {
  describe('loginUser', () => {
    it('should return token and user data for valid credentials', async () => {
      // Setup
      const mockUser = { /* mock user object */ };
      const mockToken = 'mock-token';
      
      // Mocks
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(tokenService, 'generateToken').mockReturnValue(mockToken);
      
      // Execution
      const result = await authService.loginUser('test@example.com', 'password');
      
      // Assertions
      expect(result).toHaveProperty('token', mockToken);
      expect(result).toHaveProperty('user');
    });
    
    it('should throw AuthError for invalid credentials', async () => {
      // Setup
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      
      // Execution & Assertion
      await expect(
        authService.loginUser('invalid@example.com', 'password')
      ).rejects.toThrow(AuthError);
    });
  });
});
```

### Integration Tests

Test multiple components working together:

```typescript
// tests/integration/auth.test.ts
describe('Auth API', () => {
  describe('POST /api/auth/login', () => {
    it('should return 200 and token for valid credentials', async () => {
      // Setup
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      // Execution
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);
      
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
    });
    
    it('should return 401 for invalid credentials', async () => {
      // Setup
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };
      
      // Execution
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);
      
      // Assertions
      expect(response.status).toBe(401);
      expect(response.body.status).toBe('fail');
      expect(response.body.errors[0].code).toBe('INVALID_CREDENTIALS');
    });
  });
});
```

### End-to-End Tests

Test complete user flows:

```typescript
// tests/e2e/user-flow.test.ts
describe('User Flow', () => {
  it('should allow registration, login, and profile update', async () => {
    // Registration
    const userData = {
      email: `test-${Date.now()}@example.com`,
      password: 'Password123!',
      username: `user-${Date.now()}`
    };
    
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(userData);
    
    expect(registerResponse.status).toBe(201);
    const { token } = registerResponse.body.data;
    
    // Login
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });
    
    expect(loginResponse.status).toBe(200);
    
    // Profile update
    const profileData = {
      bio: 'Test bio information'
    };
    
    const updateResponse = await request(app)
      .patch('/api/settings/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(profileData);
    
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.bio).toBe(profileData.bio);
  });
});
```

This testing approach ensures that both individual components and the system as a whole function correctly. 