export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const withTransaction = (fn) => {
  return asyncHandler(async (req, res, next) => {
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