import { NextFunction, Request, Response } from 'express';

export const successResponse = (
  data = null,
  message = 'Operacja zakończona sukcesem',
  statusCode = 200,
): {
  status: string;
  message: string;
  data: any;
  statusCode: number;
} => {
  return {
    status: 'success',
    message,
    data,
    statusCode,
  };
};

export const errorResponse = (
  message = 'Wystąpił błąd',
  statusCode = 400,
  errors: Record<string, string>[] = [],
): {
  status: string;
  message: string;
  errors?: Record<string, string>[];
  statusCode: number;
} => {
  return {
    status: 'error',
    message,
    errors: errors.length > 0 ? errors : undefined,
    statusCode,
  };
};

export const responseEnhancer = (req: Request, res: Response, next: NextFunction): void => {
  res.success = function (data = null, message = 'Operacja zakończona sukcesem', statusCode = 200) {
    return this.status(statusCode).json(successResponse(data, message, statusCode));
  };

  res.error = function (
    message = 'Wystąpił błąd',
    statusCode = 400,
    errors: Record<string, string>[] = [],
  ) {
    return this.status(statusCode).json(errorResponse(message, statusCode, errors));
  };

  next();
};

export const paginatedResponse = (
  data: any,
  page = 1,
  limit = 10,
  total: number,
): {
  status: string;
  data: any;
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
} => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    status: 'success',
    data,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
    },
  };
};
