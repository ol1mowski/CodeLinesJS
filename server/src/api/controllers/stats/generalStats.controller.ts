import { Request, Response, NextFunction } from 'express';
import { User } from '../../../models/user.model.js';
import { Lesson } from '../../../models/lesson.model.js';
import { Game } from '../../../models/game.model.js';

export const getGeneralStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [lessonsCount, gamesCount, usersCount] = await Promise.all([
      Lesson.countDocuments({}),
      Game.countDocuments({}),
      User.countDocuments({ isActive: true }),
    ]);

    const stats = {
      lessons: {
        value: String(lessonsCount),
        label: 'Dostępnych lekcji',
      },
      games: {
        value: String(gamesCount),
        label: 'Gry',
      },
      users: {
        value: String(usersCount),
        label: 'Użytkowników',
      }
    };
    
    res.success(stats, 'Statystyki pobrane pomyślnie');
  } catch (error) {
    next(error);
  }
}; 