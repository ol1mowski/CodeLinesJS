import { Response } from 'express';

export interface ApiError {
  code?: string;
  field?: string;
  message: string;
  details?: any;
}

export interface ApiResponseMeta {
  timestamp: string;
  requestId?: string;
  page?: number;
  limit?: number;
  totalPages?: number;
  totalItems?: number;
  [key: string]: any;
}

export interface ApiResponse<T> {
  status: 'success' | 'error' | 'fail';
  code: number;
  message: string;
  data?: T;
  errors?: ApiError[];
  meta: ApiResponseMeta;
}

export class ApiResponseBuilder<T = any> {
  private response: Partial<ApiResponse<T>> = {
    meta: { timestamp: new Date().toISOString() },
  };

  public status(status: 'success' | 'error' | 'fail'): ApiResponseBuilder<T> {
    this.response.status = status;
    return this;
  }

  public code(code: number): ApiResponseBuilder<T> {
    this.response.code = code;
    return this;
  }

  public message(message: string): ApiResponseBuilder<T> {
    this.response.message = message;
    return this;
  }

  public data(data: T): ApiResponseBuilder<T> {
    this.response.data = data;
    return this;
  }

  public errors(errors: ApiError[]): ApiResponseBuilder<T> {
    this.response.errors = errors;
    return this;
  }

  public meta(meta: Partial<ApiResponseMeta>): ApiResponseBuilder<T> {
    this.response.meta = { ...this.response.meta, ...meta };
    return this;
  }

  public build(): ApiResponse<T> {
    return {
      status: this.response.status || 'success',
      code: this.response.code || 200,
      message: this.response.message || '',
      ...(this.response.data !== undefined && { data: this.response.data }),
      ...(this.response.errors && { errors: this.response.errors }),
      meta: this.response.meta || { timestamp: new Date().toISOString() },
    } as ApiResponse<T>;
  }
}

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message = 'Success',
  statusCode = 200
): Response => {
  const response = new ApiResponseBuilder<T>()
    .status('success')
    .code(statusCode)
    .message(message)
    .meta({ timestamp: new Date().toISOString() });

  if (data !== undefined) {
    response.data(data);
  }

  return res.status(statusCode).json(response.build());
};

export const sendError = (
  res: Response,
  message = 'Internal Server Error',
  statusCode = 500,
  errors?: ApiError[]
): Response => {
  const response = new ApiResponseBuilder<null>()
    .status('error')
    .code(statusCode)
    .message(message)
    .meta({ timestamp: new Date().toISOString() });

  if (errors && errors.length > 0) {
    response.errors(errors);
  }

  return res.status(statusCode).json(response.build());
};

export const sendFail = (
  res: Response,
  message = 'Bad Request',
  errors?: ApiError[],
  statusCode = 400
): Response => {
  const response = new ApiResponseBuilder<null>()
    .status('fail')
    .code(statusCode)
    .message(message)
    .meta({ timestamp: new Date().toISOString() });

  if (errors && errors.length > 0) {
    response.errors(errors);
  }

  return res.status(statusCode).json(response.build());
};

export const sendPaginated = <T>(
  res: Response,
  data: T,
  page = 1,
  limit = 10,
  total: number,
  message = 'Data retrieved successfully'
): Response => {
  const totalPages = Math.ceil(total / limit);

  const response = new ApiResponseBuilder<T>()
    .status('success')
    .code(200)
    .message(message)
    .data(data)
    .meta({
      timestamp: new Date().toISOString(),
      page,
      limit,
      totalPages,
      totalItems: total,
    });

  return res.status(200).json(response.build());
};

export const requestIdMiddleware = (req: any, res: any, next: any) => {
  req.requestId = req.headers['x-request-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  res.setHeader('X-Request-ID', req.requestId);
  
  next();
}; 