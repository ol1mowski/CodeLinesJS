import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const getPostsController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
  const { page = '1', limit = '10', category, search } = req.query as {
    page?: string;
    limit?: string;
    category?: string;
    search?: string;
  };
  
  const userId = req.user?.userId;

  if (!userId) {
    return res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
      { code: 'AUTH_REQUIRED', message: 'Brak identyfikatora użytkownika. Zaloguj się ponownie.' }
    ]);
  }

  try {
    const currentPage = parseInt(page);
    const itemsPerPage = parseInt(limit);
    
    const result = await PostService.getPosts(userId, {
      page: currentPage,
      limit: itemsPerPage,
      category,
      search
    });
    
    if (!result) {
      return res.error('Błąd serwera podczas pobierania postów');
    }
    
    return res.paginated(
      result.posts, 
      currentPage, 
      itemsPerPage, 
      result.totalPosts, 
      'Posty pobrane pomyślnie'
    );
  } catch (error) {
    next(error);
  }
}); 