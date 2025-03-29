import { NextFunction, Request, Response } from "express";

export const successResponse = (data = null, message = 'Operacja zakończona sukcesem', statusCode = 200) => {
  return {
    status: 'success',
    message,
    data,
    statusCode
  };
};

export const errorResponse = (message = 'Wystąpił błąd', statusCode = 400, errors: Record<string, string>[] = []) => {
  return {
    status: 'error',
    message,
    errors: errors.length > 0 ? errors : undefined,
    statusCode
  };
};

export const responseEnhancer = (req: Request, res: Response, next: NextFunction) => {
  
  res.success = function(data = null, message = 'Operacja zakończona sukcesem', statusCode = 200) {
    return this.status(statusCode).json(successResponse(data, message, statusCode));
  };

  res.error = function(message = 'Wystąpił błąd', statusCode = 400, errors: Record<string, string>[] = []) {
    return this.status(statusCode).json(errorResponse(message, statusCode, errors));
  };

  next();
};

export const paginatedResponse = (data, page = 1, limit = 10, total: number) => {
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
      prevPage: hasPrevPage ? page - 1 : null
    }
  };
}; 