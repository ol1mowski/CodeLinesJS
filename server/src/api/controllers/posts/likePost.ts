import { NextFunction, Request, Response } from 'express';
import { PostService } from '../../../services/post/post.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const likePostController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  try {
    // Debugowanie przed aktualizacją
    console.log('[likePostController] Otrzymane ID posta:', postId);
    console.log('[likePostController] Otrzymane ID użytkownika:', userId);
    
    const post = await PostService.likePost(postId, userId);
    
    // Debugowanie po aktualizacji
    console.log('[likePostController] Zaktualizowany post - isLiked:', post.isLiked);
    console.log('[likePostController] Zaktualizowany post - likes:', post.likes);

    // Sprawdźmy, czy pole isLiked rzeczywiście istnieje i ma prawidłową wartość
    const isLikedExists = 'isLiked' in post;
    const isLikedValue = Boolean(post.isLiked);

    console.log('[likePostController] Weryfikacja wartości:', {
      isLikedExists,
      isLikedValue,
      isLikedType: typeof post.isLiked,
      rawIsLiked: post.isLiked
    });

    // Strukturyzacja odpowiedzi, jawnie ustawiając prawidłowe wartości
    const responseData = {
      _id: post._id,
      isLiked: Boolean(post.isLiked), // Jawnie konwertujemy na boolean
      likes: {
        count: post.likes?.count || 0,
        isLiked: Boolean(post.isLiked) // Dodajemy również w obiekcie likes
      }
    };

    console.log('[likePostController] Finalna odpowiedź:', JSON.stringify(responseData, null, 2));

    // Zwracam dokładnie taki format, jakiego oczekuje klient
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