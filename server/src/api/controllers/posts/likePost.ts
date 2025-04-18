import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const likePostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    return res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
      { code: 'AUTH_REQUIRED', message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.' }
    ]);
  }
  
  if (!postId) {
    return res.fail('Brak identyfikatora posta', [
      { code: 'MISSING_POST_ID', message: 'Brak identyfikatora posta', field: 'postId' }
    ]);
  }

  try {
    const post = await PostService.likePost(postId, userId);
    
    if (!post) {
      return res.fail('Post nie został znaleziony', [
        { code: 'POST_NOT_FOUND', message: 'Post nie został znaleziony', field: 'postId' }
      ], 404);
    }

    const responseData = {
      _id: post._id,
      isLiked: Boolean(post.isLiked), 
      likes: {
        count: post.likes?.count || 0,
        isLiked: Boolean(post.isLiked) 
      }
    };

    return res.success(responseData, post.isLiked ? 'Post został polubiony' : 'Polubienie zostało usunięte');
  } catch (error) {
    if (error.message === 'Post nie istnieje') {
      return res.fail('Post nie istnieje', [
        { code: 'POST_NOT_FOUND', message: 'Post nie istnieje', field: 'postId' }
      ], 404);
    }
    
    return res.error(error.message || 'Błąd podczas aktualizacji polubienia');
  }
}); 