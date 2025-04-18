import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getPostByIdController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  
  if (!userId) {
    return res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
      { code: 'AUTH_REQUIRED', message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.' }
    ]);
  }
  
  if (!id) {
    return res.fail('Brak identyfikatora posta', [
      { code: 'MISSING_POST_ID', message: 'Brak identyfikatora posta', field: 'id' }
    ]);
  }

  const post = await PostService.getPostById(id, userId);
  
  if (!post) {
    return res.fail('Post nie został znaleziony', [
      { code: 'POST_NOT_FOUND', message: 'Post nie został znaleziony', field: 'id' }
    ], 404);
  }

  return res.success(post, 'Post pobrany pomyślnie');
}); 