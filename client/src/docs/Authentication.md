# Authentication System

This document provides detailed information about the authentication system used in the CodeLinesJS application.

## Table of Contents

- [Overview](#overview)
- [Authentication Flow](#authentication-flow)
- [Components](#components)
- [JWT Token Management](#jwt-token-management)
- [Security Considerations](#security-considerations)
- [Error Handling](#error-handling)
- [Sample Usage](#sample-usage)

## Overview

The authentication system provides a secure way to manage user sessions, verify user identity, and protect application routes. It's built using JWT (JSON Web Tokens) and includes support for registration, login, token verification, and session management.

## Authentication Flow

### 1. Registration
- User submits registration data (email, username, password)
- Server validates input and creates a new user account
- Server returns a JWT token and user data
- Client stores the token in sessionStorage by default
- User is redirected to the dashboard

### 2. Login
- User submits login credentials (email, password)
- Server validates credentials and authenticates the user
- Server returns a JWT token and user data
- Client stores the token in localStorage (if "remember me" is checked) or sessionStorage
- User is redirected to the dashboard

### 3. Token Verification
- On application load, the authentication system checks for existing tokens
- If a token exists, it's validated for proper format
- The token is verified with the server via the `auth/verify` endpoint
- If valid, the user is considered authenticated, and user data is loaded
- If invalid, the token is removed, and the user is considered unauthenticated

### 4. Logout
- Token is removed from storage
- Authentication state is reset
- User is redirected to the home page

## Components

### 1. useAuth Hook
The core authentication hook that provides authentication state and actions:

```typescript
const { 
  user,                // Current user data
  isAuthenticated,     // Authentication status
  isAuthChecking,      // Loading state during token verification
  token,               // Current JWT token
  error,               // Authentication error
  login,               // Login function
  register,            // Registration function
  logout,              // Logout function
  // ... other authentication actions
} = useAuth();
```

### 2. useLoginAction Hook
Handles user login process:

```typescript
const login = useLoginAction(authState);
await login(email, password, rememberMe);
```

### 3. useRegisterAction Hook
Manages user registration:

```typescript
const register = useRegisterAction(authState);
await register(email, password, username);
```

### 4. Protected Routes
Components that require authentication:

```typescript
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthChecking } = useAuth();
  
  if (isAuthChecking) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}
```

## JWT Token Management

### Token Storage
- **localStorage**: For persistent sessions when "remember me" is checked
- **sessionStorage**: For session-only authentication (cleared when browser is closed)

### Token Format
The JWT token includes:
- User ID
- Email
- Username
- Account type
- Role
- Issue time (iat)
- Expiration time (exp)
- JWT ID (jti)

### Token Verification Logic
The application verifies tokens in the following ways:
1. Checks for token existence
2. Validates token format
3. Verifies token with the server
4. Handles token expiration and invalid tokens

## Security Considerations

### 1. Token Validation
- Tokens are validated for proper format before use
- Malformed tokens are automatically cleared

### 2. CSRF Protection
- Tokens are sent as Bearer tokens in the Authorization header
- Sensitive operations require authentication verification

### 3. Token Expiration
- Tokens have built-in expiration times
- The server validates token expiration during verification

### 4. Error Handling
- Authentication errors don't expose sensitive information
- Rate limiting is applied for excessive verification attempts

## Error Handling

The authentication system handles various errors:

- **Network Errors**: Connection problems, timeouts, CORS issues
- **Authentication Errors**: Invalid credentials, account-specific issues
- **Validation Errors**: Input validation failures
- **Server Errors**: Unexpected server-side errors

Error messages are user-friendly and provide appropriate guidance without exposing sensitive information.

## Sample Usage

### Login Form Integration

```typescript
import { useAuth } from '../hooks/useAuth';

function LoginForm() {
  const { login, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, rememberMe);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Authentication Checking

```typescript
import { useAuth } from '../hooks/useAuth';

function App() {
  const { isAuthenticated, isAuthChecking } = useAuth();
  
  if (isAuthChecking) {
    return <LoadingScreen />;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}
``` 