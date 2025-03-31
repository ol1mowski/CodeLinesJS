import { Request, Response, NextFunction } from 'express';
import { GameService } from '../../../services/game.service.js';

export const getGames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      difficulty,
      category,
      sort,
      order,
      page,
      limit,
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

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
}; 