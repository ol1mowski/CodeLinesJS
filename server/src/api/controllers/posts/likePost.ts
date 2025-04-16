import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const likePostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  try {
    
    const post = await PostService.likePost(postId, userId);

    const responseData = {
      _id: post._id,
      isLiked: Boolean(post.isLiked), 
      likes: {
        count: post.likes?.count || 0,
        isLiked: Boolean(post.isLiked) 
      }
    };

    res.json({
      status: 'success',
      data: responseData
    });
  } catch (error) {
    console.error('[likePostController] Błąd:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Błąd podczas aktualizacji polubienia'
    });
  }
}); 