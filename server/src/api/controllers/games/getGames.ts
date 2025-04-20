import { Request, Response, NextFunction } from 'express';
import { GameService } from '../../../services/game.service.js';

export const getGames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      difficulty,
      category,
      sort,
      order,
      page = '1',
      limit = '10',
    } = req.query;

    const userId = req.user?.userId;

    const result = await GameService.getGames(
      {
        difficulty: difficulty as string,
        category: category as string,
        sort: sort as string,
        order: order as string,
        page: page as string,
        limit: limit as string
      },
      userId
    );

    if (!result) {
      res.error('Błąd pobierania gier');
      return;
    }

    if (result.games && result.pagination) {
      res.paginated(
        result.games,
        parseInt(page as string),
        parseInt(limit as string),
        result.pagination.total,
        'Gry pobrane pomyślnie'
      );
      return;
    }

    res.success(result, 'Gry pobrane pomyślnie');
  } catch (error) {
    next(error);
  }
}; 