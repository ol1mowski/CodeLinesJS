import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const addCommentController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const { content } = req.body;
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
  
  if (!content || content.trim() === '') {
    return res.fail('Treść komentarza jest wymagana', [
      { code: 'MISSING_CONTENT', message: 'Treść komentarza jest wymagana', field: 'content' }
    ]);
  }

  try {
    const post = await PostService.addComment(postId, content, userId);
    
    if (!post) {
      return res.fail('Post nie został znaleziony', [
        { code: 'POST_NOT_FOUND', message: 'Post nie został znaleziony', field: 'postId' }
      ], 404);
    }
    
    return res.success(post, 'Komentarz został dodany', 201);
  } catch (error) {
    if (error.message === 'Post nie istnieje') {
      return res.fail('Post nie istnieje', [
        { code: 'POST_NOT_FOUND', message: 'Post nie istnieje', field: 'postId' }
      ], 404);
    }
    
    return res.error(error.message || 'Błąd podczas dodawania komentarza');
  }
}); 