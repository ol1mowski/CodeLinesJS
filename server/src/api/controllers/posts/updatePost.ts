import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const updatePostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  const post = await PostService.updatePost(postId, content, userId);

  res.json({
    status: 'success',
    data: post
  });
}); 