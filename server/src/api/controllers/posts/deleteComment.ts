import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const deleteCommentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId, commentId } = req.params;
  const userId = req.user.userId;

  const post = await PostService.deleteComment(postId, commentId, userId);

  res.json({
    status: 'success',
    data: post
  });
});
