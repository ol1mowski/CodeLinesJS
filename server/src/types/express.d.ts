import { Express } from 'express-serve-static-core';
import { ClientSession } from 'mongoose';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      userId: string;
      email: string;
      username?: string;
      role: string;
      accountType?: string;
      [key: string]: any;
    };
    dbSession?: ClientSession;
  }
  
  interface Response {
    success(data?: any, message?: string, statusCode?: number): this;
    error(message?: string, statusCode?: number, errors?: Record<string, string>[]): this;
  }
} 