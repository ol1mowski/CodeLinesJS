import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const addCommentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  const post = await PostService.addComment(postId, content, userId);

  res.status(201).json({
    status: 'success',
    data: post
  });
}); 