// @ts-nocheck
import AppError from "../utils/appError.js";
import config from "../config/config.js";
import { Request, Response, NextFunction } from 'express';

interface ExtendedError extends Error {
  code?: number;
  keyValue?: Record<string, any>;
  statusCode?: number;
  status?: string;
  errors?: Record<string, { message: string }>;
  isOperational?: boolean;
  path?: string;
  value?: any;
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

const handleDuplicateFields = (err: ExtendedError): AppError => {
  const message = sanitizeErrorMessage(`Duplikat wartości pola: ${Object.keys(err.keyValue || {}).join(', ')}. Proszę użyć innej wartości.`);
  return new AppError(message, 400);
};

const handleValidationError = (err: ExtendedError): AppError => {
  const errors = Object.values(err.errors || {}).map(val => sanitizeErrorMessage(val.message));
  const message = `Nieprawidłowe dane wejściowe: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (): AppError =>
  new AppError("Nieprawidłowy token. Zaloguj się ponownie.", 401);

const handleJWTExpiredError = (): AppError =>
  new AppError("Token wygasł. Zaloguj się ponownie.", 401);

const handleCastError = (err: ExtendedError): AppError => {
  const message = sanitizeErrorMessage(`Nieprawidłowa wartość ${err.path}: ${err.value}`);
  return new AppError(message, 400);
};

const sendErrorDev = (err: ExtendedError, res: Response): void => {
  const sanitizedMessage = sanitizeErrorMessage(err.message);

  res.status(err.statusCode || 500).json({
    status: err.status,
    message: sanitizedMessage,
    error: err,
    stack: err.stack ? err.stack.split('\n').map(line => sanitizeErrorMessage(line)) : undefined
  });
};

const sendErrorProd = (err: ExtendedError, res: Response): void => {
  if (err.isOperational) {
    const sanitizedMessage = sanitizeErrorMessage(err.message);

    res.status(err.statusCode || 500).json({
      status: err.status,
      message: sanitizedMessage
    });
  } else {
    console.error("ERROR 💥", err);

    res.status(500).json({
      status: "error",
      message: "Coś poszło nie tak!"
    });
  }
};

export default (err: ExtendedError, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (process.env.NODE_ENV === "development" || (config as any).env === "development") {
    sendErrorDev(err, res);
  } else {
    let error: ExtendedError = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
}; 