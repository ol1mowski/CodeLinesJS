import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const createPostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;
  
  console.log('User w req:', req.user);
  
  // Zmiana z req.user.id na req.user.userId zgodnie z definicją w auth.middleware.ts
  const userId = req.user?.userId;
  
  console.log('Pobrane userId w kontrolerze:', userId);
  
  if (!userId) {
    console.error('Brak userId w req.user');
    res.status(400).json({
      status: 'fail',
      message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.'
    });
    return;
  }

  const post = await PostService.createPost(content, userId);

  res.status(201).json({
    status: 'success',
    data: post
  });
}); 