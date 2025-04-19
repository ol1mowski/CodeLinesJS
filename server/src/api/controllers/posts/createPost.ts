import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const createPostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;
  const userId = req.user?.userId;
  
  if (!userId) {
    return res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
      { code: 'AUTH_REQUIRED', message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.' }
    ]);
  }
  
  if (!content || content.trim() === '') {
    return res.fail('Treść posta jest wymagana', [
      { code: 'MISSING_CONTENT', message: 'Treść posta jest wymagana', field: 'content' }
    ]);
  }

  const post = await PostService.createPost(content, userId);

  return res.success(post, 'Post utworzony pomyślnie', 201);
}); 