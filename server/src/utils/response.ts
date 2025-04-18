import { NextFunction, Request, Response } from 'express';
import { 
  ApiError, 
  ApiResponse, 
  ApiResponseBuilder, 
} from './apiResponse.js';

declare global {
  namespace Express {
    interface Response {
      success: <T>(data?: T, message?: string, statusCode?: number) => Response;
      error: (message?: string, statusCode?: number, errors?: Record<string, string>[]) => Response;
      fail: (message: string, errors?: ApiError[], statusCode?: number) => Response;
      paginated: <T>(data: T, page: number, limit: number, total: number, message?: string) => Response;
    }
  }
}

export const responseEnhancer = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = req.headers['x-request-id'] as string || 
    `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  res.setHeader('X-Request-ID', requestId);

  res.success = function <T>(data?: T, message = 'Operacja zakończona pomyślnie', statusCode = 200) {
    const response = new ApiResponseBuilder<T>()
      .status('success')
      .code(statusCode)
      .message(message)
      .meta({ requestId, timestamp: new Date().toISOString() });
    
    if (data !== undefined) {
      response.data(data);
    }

    return this.status(statusCode).json(response.build());
  };

  res.error = function (message = 'Wystąpił błąd serwera', statusCode = 500, errors?: Record<string, string>[]) {
    const response = new ApiResponseBuilder()
      .status('error')
      .code(statusCode)
      .message(message)
      .meta({ requestId, timestamp: new Date().toISOString() });
    
    if (errors && errors.length > 0) {
      const apiErrors: ApiError[] = errors.map(err => ({
        code: 'ERROR',
        message: Object.values(err).join(', '),
        ...err
      }));
      response.errors(apiErrors);
    }

    return this.status(statusCode).json(response.build());
  };

  res.fail = function (message = 'Nieprawidłowe dane', errors?: ApiError[], statusCode = 400) {
    const response = new ApiResponseBuilder<null>()
      .status('fail')
      .code(statusCode)
      .message(message)
      .meta({ requestId, timestamp: new Date().toISOString() });
    
    if (errors && errors.length > 0) {
      response.errors(errors);
    }

    return this.status(statusCode).json(response.build());
  };

  res.paginated = function <T>(data: T, page = 1, limit = 10, total: number, message = 'Dane pobrane pomyślnie') {
    const totalPages = Math.ceil(total / limit);
    
    const response = new ApiResponseBuilder<T>()
      .status('success')
      .code(200)
      .message(message)
      .data(data)
      .meta({
        requestId,
        timestamp: new Date().toISOString(),
        page,
        limit,
        totalPages,
        totalItems: total
      });

    return this.status(200).json(response.build());
  };

  next();
};

export const successResponse = (
  data = null,
  message = 'Operacja zakończona pomyślnie',
  statusCode = 200,
): ApiResponse<any> => {
  const response = new ApiResponseBuilder()
    .status('success')
    .code(statusCode)
    .message(message)
    .meta({ timestamp: new Date().toISOString() });
  
  if (data !== null) {
    response.data(data);
  }

  return response.build();
};

export const errorResponse = (
  message = 'Wystąpił błąd',
  statusCode = 400,
  errors: Record<string, string>[] = [],
): ApiResponse<null> => {
  const response = new ApiResponseBuilder<null>()
    .status(statusCode >= 500 ? 'error' : 'fail')
    .code(statusCode)
    .message(message)
    .meta({ timestamp: new Date().toISOString() });
  
  if (errors.length > 0) {
    const apiErrors: ApiError[] = errors.map(err => ({
      code: 'ERROR',
      message: Object.values(err).join(', '),
      ...err
    }));
    response.errors(apiErrors);
  }

  return response.build();
};

export const paginatedResponse = (
  data: any,
  page = 1,
  limit = 10,
  total: number,
): ApiResponse<any> => {
  const totalPages = Math.ceil(total / limit);
  
  return new ApiResponseBuilder()
    .status('success')
    .code(200)
    .message('Dane pobrane pomyślnie')
    .data(data)
    .meta({
      timestamp: new Date().toISOString(),
      page,
      limit,
      totalPages,
      totalItems: total
    })
    .build();
};
