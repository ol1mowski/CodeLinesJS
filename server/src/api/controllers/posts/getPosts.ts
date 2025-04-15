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
  console.log('[getPostsController] UserId:', userId);
  
  if (!userId) {
    console.error('[getPostsController] Brak userId w req.user');
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
      console.error('[getPostsController] Usługa zwróciła undefined');
      return res.status(500).json({
        status: 'error',
        message: 'Błąd serwera podczas pobierania postów'
      });
    }
    
    console.log('[getPostsController] Pobrano postów:', result.posts?.length || 0);
    console.log('[getPostsController] Całkowita liczba postów:', result.totalPosts || 0);
    
    res.json({
      status: 'success',
      ...result
    });
  } catch (error) {
    console.error('[getPostsController] Błąd podczas pobierania postów:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Błąd podczas pobierania postów'
    });
  }
}); 