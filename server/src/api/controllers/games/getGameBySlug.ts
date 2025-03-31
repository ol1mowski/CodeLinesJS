import { Request, Response, NextFunction } from 'express';
import { GameService } from '../../../services/game.service.js';

export const getGameBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const userId = req.user?.userId;

    const result = await GameService.getGameBySlug(slug, userId);

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
}; 