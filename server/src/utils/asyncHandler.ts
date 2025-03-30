// @ts-nocheck
import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const withTransaction = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const mongoose = (await import('mongoose')).default;
    const session = await mongoose.startSession();
    
    session.startTransaction();
    
    try {
      req.dbSession = session;
      await fn(req, res, next);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  });
}; 