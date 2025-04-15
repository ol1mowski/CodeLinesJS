import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getPostsController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
  const { page, limit, category, search } = req.query as {
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
  };
  
  const userId = req.user?.userId;

  if (!userId) {
    res.status(400).json({
      status: 'fail',
      message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.'
    });
    return;
  }

  try {
    const result = await PostService.getPosts(userId, {
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      category,
      search
    });
    
    if (!result) {
      res.status(500).json({
        status: 'error',
        message: 'Błąd serwera podczas pobierania postów'
      });
      return;
    }
    
    res.json({
      status: 'success',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Błąd podczas pobierania postów'
    });
  }
}); 