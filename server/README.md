# CodeLinesJS Server API Documentation

## Overview

The server-side application for CodeLinesJS is built with Node.js, Express, and MongoDB. It provides a RESTful API with JWT authentication, structured error handling, and comprehensive data validation.

## Architecture

The server follows a modular architecture with clear separation of concerns:

```
server/
├── src/
│   ├── api/               # API endpoints
│   │   ├── controllers/   # Request handlers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # Route definitions
│   │   └── validators/    # Request validation
│   ├── config/            # Configuration files
│   ├── models/            # MongoDB schemas
│   ├── services/          # Business logic
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── app.ts             # Express application setup
│   └── server.ts          # Server entry point
├── tests/                 # Test files
├── .env                   # Environment variables
└── package.json           # Dependencies
```

## Authentication System

### JWT-based Authentication

The server implements secure JWT-based authentication with the following features:

- **Token Generation**: Creates signed JWT tokens with configurable expiration
- **Token Verification**: Middleware to validate tokens for protected routes
- **Refresh Tokens**: Support for token refresh to maintain sessions
- **Role-based Access Control**: Different permission levels (user, admin)

### Authentication Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/auth/register` | POST | Register new user | `{email, password, username}` | `{token, user}` |
| `/api/auth/login` | POST | Login user | `{email, password, rememberMe}` | `{token, user}` |
| `/api/auth/verify` | GET | Verify token | - | `{user}` |
| `/api/auth/refresh` | POST | Refresh token | `{refreshToken}` | `{token, refreshToken}` |

## API Response Format

All API responses follow a consistent format:

```json
{
  "status": "success | fail | error",
  "code": 200,
  "message": "Human-readable message",
  "data": {
    // Response data
  },
  "errors": [
    {
      "code": "ERROR_CODE",
      "field": "field_name",
      "message": "Detailed error message"
    }
  ],
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890"
  }
}
```

### Response Methods

The server extends Express's response object with custom methods:

```javascript
// Success response
res.success(data, message, statusCode);

// Error response (client errors)
res.fail(message, errors, statusCode);

// Server error response
res.error(message, error, statusCode);
```

## Error Handling

The server implements a centralized error handling system:

- **Custom Error Classes**: Specialized error classes (AuthError, ValidationError, etc.)
- **Error Middleware**: Global error handler that formats all errors consistently
- **Validation Errors**: Detailed field-level validation errors
- **Operational vs Programming Errors**: Different handling for expected vs unexpected errors

## Database Models

### User Model

The core user model with authentication and profile data:

```javascript
{
  email: String,          // User's email address (unique)
  username: String,       // User's display name (unique)
  password: String,       // Hashed password
  accountType: String,    // 'local' or 'google'
  isEmailVerified: Boolean, // Email verification status
  avatar: String,         // User's profile picture URL
  role: String,           // 'user' or 'admin'
  bio: String,            // User's biography
  profile: {              // Extended profile information
    // Various profile fields
  },
  preferences: {          // User preferences
    theme: String,        // UI theme preference
    language: String,     // Preferred language
    // Other preferences
  },
  stats: {                // User statistics
    points: Number,       // Total points earned
    completedChallenges: Number, // Completed challenges count
    streak: Number        // Current activity streak
  },
  lastLogin: Date,        // Last login timestamp
  passwordChangedAt: Date, // Password last changed timestamp
  resetPasswordToken: String, // For password reset functionality
  resetPasswordExpires: Date  // Password reset token expiration
}
```

## Services

The server implements a service layer to isolate business logic from controllers:

### Authentication Service

Handles user authentication, registration, and token management:

```javascript
// User registration
authService.registerUser(email, password, username);

// User login
authService.loginUser(email, password, rememberMe);

// Token verification
authService.verifyUserToken(userId);

// Other auth-related methods
```

### User Service

Manages user data operations:

```javascript
// Get user by ID
userService.getUserById(userId);

// Update user profile
userService.updateProfile(userId, profileData);

// Delete user account
userService.deleteAccount(userId);
```

### Settings Service

Handles user settings and preferences:

```javascript
// Get user settings
settingsService.getSettings(userId);

// Update appearance settings
settingsService.updateAppearance(userId, appearanceData);

// Update notification settings
settingsService.updateNotifications(userId, notificationSettings);
```

## Middleware

The server includes several middleware functions for common tasks:

### Authentication Middleware

```javascript
// Require authentication for protected routes
app.use('/api/private', authMiddleware.requireAuth);

// Check for optional authentication
app.use('/api/public', authMiddleware.optionalAuth);

// Require admin role
app.use('/api/admin', authMiddleware.requireAdmin);
```

### Request Validation

```javascript
// Validate request body using Joi or Zod schemas
app.post('/api/users', validateBody(userSchema), usersController.createUser);
```

### Request Logging

```javascript
// Log all requests
app.use(requestLogger);
```

## Security Features

The server implements several security features:

- **Password Hashing**: Bcrypt for secure password storage
- **Rate Limiting**: Prevent brute force attacks
- **CORS Configuration**: Restricted cross-origin requests
- **Helmet**: HTTP header security
- **Input Validation**: Thorough validation of all inputs
- **XSS Protection**: Sanitization of user input

## Environment Configuration

The server uses environment variables for configuration:

```
# Server
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/codelines

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# Email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password

# Other configuration
```

## API Endpoints

### User Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/users/profile` | GET | Get user profile | Required | - | User profile |
| `/api/users/profile` | PUT | Update profile | Required | Profile data | Updated profile |
| `/api/users/:id` | GET | Get user by ID | Required | - | User data |
| `/api/users/:id` | DELETE | Delete user | Required | - | Success message |

### Settings Endpoints

| Endpoint | Method | Description | Authentication | Request Body | Response |
|----------|--------|-------------|----------------|--------------|----------|
| `/api/settings` | GET | Get user settings | Required | - | User settings |
| `/api/settings/profile` | PATCH | Update profile | Required | Profile data | Updated profile |
| `/api/settings/appearance` | PATCH | Update appearance | Required | Appearance data | Updated settings |
| `/api/settings/notifications` | PATCH | Update notifications | Required | Notification settings | Updated settings |
| `/api/settings/password` | PATCH | Change password | Required | Password data | Success message |
| `/api/settings/account` | DELETE | Delete account | Required | - | Success message |

## Error Codes

The API uses specific error codes for different scenarios:

| Code | Description |
|------|-------------|
| `INVALID_CREDENTIALS` | Invalid login credentials |
| `EMAIL_IN_USE` | Email already registered |
| `USERNAME_IN_USE` | Username already taken |
| `INVALID_TOKEN` | Invalid or expired JWT |
| `UNAUTHORIZED` | User not authorized for this action |
| `FORBIDDEN` | Action not allowed for current user |
| `RESOURCE_NOT_FOUND` | Requested resource does not exist |
| `VALIDATION_ERROR` | Input validation failed |
| `INTERNAL_ERROR` | Server encountered an error |

## Getting Started

### Prerequisites

- Node.js 16+
- MongoDB 4.4+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

### Production Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Testing

The server includes comprehensive tests:

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --testPathPattern=auth

# Run tests with coverage
npm test -- --coverage
``` 