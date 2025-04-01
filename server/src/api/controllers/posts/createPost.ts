import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const createPostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;
  const userId = req.user.id;

  const post = await PostService.createPost(content, userId);

  res.status(201).json({
    status: 'success',
    data: post
  });
}); 