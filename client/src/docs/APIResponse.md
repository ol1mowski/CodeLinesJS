# API Response Structure

This document details the structure of API responses used in the CodeLinesJS application and how they are handled in the client.

## Standard Response Format

All API endpoints return responses in a standardized format:

```json
{
  "status": "success | fail | error",
  "code": 200,
  "message": "Human-readable message",
  "data": {
    // Response data object or array
  },
  "errors": [
    {
      "code": "ERROR_CODE",
      "field": "field_name", // Optional, present for validation errors
      "message": "Detailed error message"
    }
  ],
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890",
    "page": 1, // For paginated responses
    "limit": 10, // For paginated responses
    "totalPages": 5, // For paginated responses
    "totalItems": 42 // For paginated responses
  }
}
```

### Response Types

#### Success Response (`status: "success"`)

A successful response contains the requested data and a success message:

```json
{
  "status": "success",
  "code": 200,
  "message": "Operation completed successfully",
  "data": {
    "id": "12345",
    "name": "Example data"
  },
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890"
  }
}
```

#### Validation/Business Logic Error (`status: "fail"`)

A "fail" response indicates a client-side error (incorrect input, validation failure, etc.):

```json
{
  "status": "fail",
  "code": 400,
  "message": "Invalid input data",
  "errors": [
    {
      "code": "INVALID_EMAIL",
      "field": "email",
      "message": "Email format is invalid"
    },
    {
      "code": "MISSING_FIELD",
      "field": "password",
      "message": "Password is required"
    }
  ],
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890"
  }
}
```

#### Server Error (`status: "error"`)

An "error" response indicates a server-side issue:

```json
{
  "status": "error",
  "code": 500,
  "message": "An unexpected error occurred",
  "errors": [
    {
      "code": "INTERNAL_SERVER_ERROR",
      "message": "The server encountered an unexpected error"
    }
  ],
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890"
  }
}
```

## Client-Side Response Handling

The CodeLinesJS client application standardizes API response handling through the `httpClient` utility.

### Response Type Definition

```typescript
export type ApiResponse<T = any> = {
  data: T | null;    // Response data when successful (null when error occurs)
  error: string | null;  // Error message when request fails (null when successful)
  status: number;    // HTTP status code
};
```

### Response Handling

The client maps the server's response structure to the simplified `ApiResponse` type:

1. **Success Responses**: 
   - `data` contains the response's `data` field
   - `error` is set to `null`
   - `status` reflects the HTTP status code

2. **Error Responses**:
   - `data` is set to `null`
   - `error` contains the most relevant error message from the response
   - `status` reflects the HTTP status code

### Example Usage

```typescript
const { data, error, status } = await httpClient.get('users/profile');

if (error) {
  // Handle error
  console.error(`Error (${status}): ${error}`);
  return;
}

// Use successful data
console.log('User profile:', data);
```

## HTTP Status Codes

The API uses standard HTTP status codes to indicate the result of operations:

| Code | Description | Response Type |
|------|-------------|---------------|
| 200 | OK | success |
| 201 | Created | success |
| 400 | Bad Request | fail |
| 401 | Unauthorized | fail |
| 403 | Forbidden | fail |
| 404 | Not Found | fail |
| 409 | Conflict | fail |
| 422 | Unprocessable Entity | fail |
| 429 | Too Many Requests | fail |
| 500 | Internal Server Error | error |
| 503 | Service Unavailable | error |

## Error Codes

The API uses specific error codes to provide more context about errors:

| Code | Description |
|------|-------------|
| `MISSING_FIELD` | A required field was not provided |
| `INVALID_FORMAT` | Invalid data format |
| `INVALID_CREDENTIALS` | Invalid login credentials |
| `DUPLICATE_VALUE` | Value already exists in the system |
| `RESOURCE_NOT_FOUND` | Requested resource does not exist |
| `UNAUTHORIZED` | Not authorized to perform the operation |
| `FORBIDDEN` | Operation not allowed |
| `INTERNAL_SERVER_ERROR` | Server-side error |
| `RATE_LIMIT_EXCEEDED` | Too many requests in a short period |

## Examples

### Login Response

```json
{
  "status": "success",
  "code": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "60c72b2f9b1d8f001c8e9f6a",
      "email": "user@example.com",
      "username": "exampleuser",
      "accountType": "local"
    }
  },
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1745230410712"
  }
}
```

### Validation Error Response

```json
{
  "status": "fail",
  "code": 400,
  "message": "Validation error",
  "errors": [
    {
      "code": "INVALID_PASSWORD",
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ],
  "meta": {
    "timestamp": "2024-04-18T07:12:33.789Z",
    "requestId": "req-1745232153789"
  }
}
```

### Paginated Data Response

```json
{
  "status": "success",
  "code": 200,
  "message": "Data retrieved successfully",
  "data": [
    { "id": "1", "title": "Item 1" },
    { "id": "2", "title": "Item 2" }
  ],
  "meta": {
    "timestamp": "2024-04-18T08:30:15.123Z",
    "requestId": "req-1745236215123",
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "totalItems": 42
  }
}
```

## Client-Side Error Handling

The application provides localized error messages for common network issues:

```typescript
if (errorMessage.includes('failed to fetch')) {
  return 'Unable to connect to the server. Check your internet connection.';
}

if (errorMessage.includes('timeout')) {
  return 'Server response timeout.';
}

if (errorMessage.includes('cors')) {
  return 'CORS policy error. Unable to access resource from this domain.';
}
```

These error messages are automatically formatted and returned to the component making the API request. 