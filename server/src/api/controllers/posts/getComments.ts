import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getCommentsController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const comments = await PostService.getComments(id);

  res.json({
    status: 'success',
    data: {
      comments
    }
  });
});

