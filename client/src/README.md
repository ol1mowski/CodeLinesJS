# CodeLinesJS Client API Documentation

## Overview

The client-side application is built using React with TypeScript and implements a comprehensive authentication system along with API client for backend communication. This document provides an overview of the key components and utilities used for API communication, authentication, and user management.

## API Client

### `httpClient.api.ts`

The `httpClient` is a flexible and type-safe utility for making HTTP requests to the server. It handles various response formats, authentication, and error management.

```typescript
import { httpClient } from '../api/httpClient.api';

// Making a GET request
const response = await httpClient.get<UserProfile>('users/profile', { requiresAuth: true });

// Making a POST request with body
const loginResponse = await httpClient.post<LoginResponse>('auth/login', {
  email: 'user@example.com',
  password: 'password123',
  rememberMe: true
});
```

#### Key Features

- **Type-safe responses**: Generic type support for strongly typed API responses
- **Built-in error handling**: Standardized error management and formatting
- **Authentication handling**: Automatic inclusion of authentication tokens
- **Support for different API response formats**: Handles both standard and legacy response formats
- **Timeout and network error management**: User-friendly error messages

### Response Structure

API responses follow a standard format:

```typescript
type ApiResponse<T = any> = {
  data: T | null;    // The response data when successful
  error: string | null;  // Error message when request fails
  status: number;    // HTTP status code
};
```

The server uses a standardized response format:

```json
{
  "status": "success",  // success | fail | error
  "code": 200,          // HTTP status code
  "message": "Operation completed successfully",
  "data": { },          // Response data
  "meta": {             // Additional metadata
    "timestamp": "2024-04-18T06:45:12.345Z", 
    "requestId": "req-1234567890"
  }
}
```

## Authentication System

### Core Authentication Hook

The `useAuth` hook provides a comprehensive authentication system for the application. It manages user sessions, token verification, and authentication state.

```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    isAuthChecking, 
    login, 
    register, 
    logout 
  } = useAuth();
  
  // Component code...
}
```

#### Features

- **Automatic token verification**: Verifies authentication token on app load
- **Token management**: Handles token storage in localStorage or sessionStorage based on "remember me" preference
- **Authentication state**: Provides authentication status and user information
- **Error handling**: Manages authentication errors and provides meaningful feedback

### Login Action

The `useLoginAction` hook handles user login logic:

```typescript
const login = useLoginAction(authState);

// Usage:
await login(email, password, rememberMe);
```

### Register Action

The `useRegisterAction` hook handles user registration:

```typescript
const register = useRegisterAction(authState);

// Usage:
await register(email, password, username);
```

## Token Management

The application uses JWT tokens for authentication:

- **Token Storage**: Tokens are stored in either `localStorage` (for persistent sessions) or `sessionStorage` (for session-only authentication)
- **Token Format**: JWT tokens contain user information and expiration data
- **Token Verification**: Tokens are verified on application load and before making authenticated requests

## Error Handling

The API client provides standardized error handling:

- **Network errors**: Detailed messages for various network issues (connection problems, timeouts, CORS errors)
- **Server errors**: Formatted error messages from server responses
- **Validation errors**: Field-specific validation error messages

## Security Considerations

- Tokens are validated for proper format before use
- Invalid tokens are automatically cleared from storage
- Authentication state is protected and only modified through proper actions
- Includes CORS and credentials handling for secure cross-origin requests

## API Methods

The httpClient provides the following methods:

- **get<T>(endpoint, options)**: For GET requests
- **post<T>(endpoint, body, options)**: For POST requests
- **put<T>(endpoint, body, options)**: For PUT requests
- **delete<T>(endpoint, options)**: For DELETE requests
- **patch<T>(endpoint, body, options)**: For PATCH requests

Each method returns a Promise with the standard ApiResponse format. 