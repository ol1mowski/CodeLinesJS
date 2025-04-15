import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const deletePostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  await PostService.deletePost(postId, userId);

  res.status(200).json({
    status: 'success',
    message: 'Post został usunięty'
  });
}); 