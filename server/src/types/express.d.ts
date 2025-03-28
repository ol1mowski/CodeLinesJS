import { Express } from 'express-serve-static-core';

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
  }
} 