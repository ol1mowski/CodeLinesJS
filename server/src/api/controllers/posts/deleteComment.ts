import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const deleteCommentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId, commentId } = req.params;
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
  
  if (!commentId) {
    return res.fail('Brak identyfikatora komentarza', [
      { code: 'MISSING_COMMENT_ID', message: 'Brak identyfikatora komentarza', field: 'commentId' }
    ]);
  }

  try {
    const post = await PostService.deleteComment(postId, commentId, userId);
    
    if (!post) {
      return res.fail('Post lub komentarz nie został znaleziony', [
        { code: 'NOT_FOUND', message: 'Post lub komentarz nie został znaleziony' }
      ], 404);
    }
    
    return res.success(post, 'Komentarz został usunięty');
  } catch (error) {
    if (error.message === 'Post nie istnieje') {
      return res.fail('Post nie istnieje', [
        { code: 'POST_NOT_FOUND', message: 'Post nie istnieje', field: 'postId' }
      ], 404);
    }
    
    if (error.message === 'Komentarz nie istnieje') {
      return res.fail('Komentarz nie istnieje', [
        { code: 'COMMENT_NOT_FOUND', message: 'Komentarz nie istnieje', field: 'commentId' }
      ], 404);
    }
    
    if (error.message === 'Brak uprawnień do usunięcia komentarza') {
      return res.fail('Brak uprawnień do usunięcia komentarza', [
        { code: 'UNAUTHORIZED', message: 'Brak uprawnień do usunięcia komentarza' }
      ], 403);
    }
    
    return res.error(error.message || 'Błąd podczas usuwania komentarza');
  }
});
