import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const savePostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  const post = await PostService.savePost(postId, userId);

  res.json({
    status: 'success',
    data: post
  });
}); 