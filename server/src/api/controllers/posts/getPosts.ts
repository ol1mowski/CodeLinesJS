import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getPostsController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { page, limit, category, search } = req.query as {
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
  };
  
  const userId = req.user.userId;

  const result = await PostService.getPosts(userId, {
    page: page ? parseInt(page) : undefined,
    limit: limit ? parseInt(limit) : undefined,
    category,
    search
  });

  res.json(result);
}); 