import config from "../config/config.js";
import { Request, Response, NextFunction } from 'express';
import { ApiError } from "../utils/apiResponse.js";

interface ExtendedError extends Error {
  code?: number;
  keyValue?: Record<string, any>;
  statusCode?: number;
  status?: string;
  errors?: Record<string, { message: string; path?: string }>;
  isOperational?: boolean;
  path?: string;
  value?: any;
}

interface ExtendedRequest extends Request {
  requestId?: string | string[];
}

const sanitizeErrorMessage = (message: string | undefined): string => {
  if (!message) return "Wystąpił nieznany błąd";

  return String(message)
    .replace(/[\r\n]+/g, ' ')
    .replace(/[<>'"]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, '')
    .replace(/window\./gi, '')
    .replace(/document\./gi, '')
    .replace(/eval\(/gi, '')
    .substring(0, 500);
};

const handleDuplicateFields = (err: ExtendedError): ApiError[] => {
  const field = Object.keys(err.keyValue || {})[0];
  const value = err.keyValue?.[field];
  
  return [{
    code: 'DUPLICATE_VALUE',
    field,
    message: `Wartość '${value}' dla pola '${field}' już istnieje. Proszę użyć innej wartości.`
  }];
};

const handleValidationError = (err: ExtendedError): ApiError[] => {
  return Object.values(err.errors || {}).map(val => ({
    code: 'VALIDATION_ERROR',
    field: val.path,
    message: sanitizeErrorMessage(val.message)
  }));
};

const handleJWTError = (): ApiError[] => {
  return [{
    code: 'INVALID_TOKEN',
    message: "Nieprawidłowy token. Zaloguj się ponownie."
  }];
};

const handleJWTExpiredError = (): ApiError[] => {
  return [{
    code: 'EXPIRED_TOKEN',
    message: "Token wygasł. Zaloguj się ponownie."
  }];
};

const handleCastError = (err: ExtendedError): ApiError[] => {
  return [{
    code: 'INVALID_ID',
    field: err.path,
    message: `Nieprawidłowa wartość ${err.path}: ${err.value}`
  }];
};

export default (err: ExtendedError, req: ExtendedRequest, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const requestId = req.headers['x-request-id'] || req.requestId || '';
  
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (process.env.NODE_ENV === "development" || (config as any).env === "development") {
    const sanitizedMessage = sanitizeErrorMessage(err.message);
    
    res.status(err.statusCode).json({
      status: err.statusCode >= 500 ? 'error' : 'fail',
      code: err.statusCode,
      message: sanitizedMessage,
      errors: [{ code: err.name, message: sanitizedMessage }],
      meta: {
        timestamp: new Date().toISOString(),
        requestId: requestId,
        stack: err.stack ? err.stack.split('\n').map(line => sanitizeErrorMessage(line)) : undefined
      }
    });
  } 
  else {
    let errorCode = err.statusCode;
    let errorMessage = sanitizeErrorMessage(err.message);
    let errors: ApiError[] = [];

    if (err.name === "CastError") {
      errorCode = 400;
      errors = handleCastError(err);
    } 
    else if (err.code === 11000) {
      errorCode = 409;
      errors = handleDuplicateFields(err);
    } 
    else if (err.name === "ValidationError") {
      errorCode = 400;
      errors = handleValidationError(err);
    } 
    else if (err.name === "JsonWebTokenError") {
      errorCode = 401;
      errors = handleJWTError();
      errorMessage = "Nieprawidłowy token. Zaloguj się ponownie.";
    } 
    else if (err.name === "TokenExpiredError") {
      errorCode = 401;
      errors = handleJWTExpiredError();
      errorMessage = "Token wygasł. Zaloguj się ponownie.";
    }
    else if (err.isOperational) {
      errors = [{
        code: err.name || 'OPERATIONAL_ERROR',
        message: errorMessage
      }];
    } 

    else {
      console.error("NIEOBSŁUGIWANY BŁĄD 💥", err);
      errorCode = 500;
      errorMessage = "Coś poszło nie tak!";
      errors = [{
        code: 'INTERNAL_SERVER_ERROR',
        message: errorMessage
      }];
    }

    res.status(errorCode).json({
      status: errorCode >= 500 ? 'error' : 'fail',
      code: errorCode,
      message: errorMessage,
      errors: errors,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: requestId
      }
    });
  }
}; 