import { Request, Response, NextFunction } from 'express';
import { GameService } from '../../../services/game.service.js';

export const getGameBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const userId = req.user?.userId;
    
    if (!slug) {
      res.fail('Brak identyfikatora gry', [
        { code: 'MISSING_SLUG', message: 'Brak identyfikatora gry', field: 'slug' }
      ]);
    }

    const result = await GameService.getGameBySlug(slug, userId);
    
    if (!result) {
      res.fail('Gra nie została znaleziona', [
        { code: 'GAME_NOT_FOUND', message: 'Gra nie została znaleziona', field: 'slug' }
      ], 404);
    }

    res.success(result, 'Gra pobrana pomyślnie');
  } catch (error) {
    next(error);
  }
}; 