import AppError from "../utils/appError.js";
import config from "../config/config.js";


const sanitizeErrorMessage = (message) => {
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


const handleDuplicateFields = (err) => {
  const message = sanitizeErrorMessage(`Duplikat wartości pola: ${Object.keys(err.keyValue).join(', ')}. Proszę użyć innej wartości.`);
  return new AppError(message, 400);
};


const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(val => sanitizeErrorMessage(val.message));
  const message = `Nieprawidłowe dane wejściowe: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Nieprawidłowy token. Zaloguj się ponownie.", 401);

const handleJWTExpiredError = () =>
  new AppError("Token wygasł. Zaloguj się ponownie.", 401);

const handleCastError = (err) => {
  const message = sanitizeErrorMessage(`Nieprawidłowa wartość ${err.path}: ${err.value}`);
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  const sanitizedMessage = sanitizeErrorMessage(err.message);

  res.status(err.statusCode).json({
    status: err.status,
    message: sanitizedMessage,
    error: err,
    stack: err.stack ? err.stack.split('\n').map(line => sanitizeErrorMessage(line)) : undefined
  });
};


const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    const sanitizedMessage = sanitizeErrorMessage(err.message);

    res.status(err.statusCode).json({
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


export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (config.env === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
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