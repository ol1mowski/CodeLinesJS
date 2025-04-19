import { Application, Request, Response, NextFunction } from 'express';

export const setupLogger = (app: Application): void => {
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
  });
}; 