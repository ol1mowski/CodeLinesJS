import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncHandler = (fn: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const wrapController = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};

export const withTransaction = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response | any>,
) => {
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
