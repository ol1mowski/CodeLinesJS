import { Game } from '../../../models/game.model.js';
import { User } from '../../../models/user.model.js';
import { Request, Response, NextFunction } from 'express';

const getRandomElements = (array, count) => {

  if (array.length <= count) return array;
  
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};

export const getGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      difficulty,
      category,
      sort = 'rating.average',
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const userId = req.user?.userId;
    let userLevel = 1;

    if (userId) {
      const user = await User.findById(userId).select('stats.level').lean();
      userLevel = user?.stats?.level || 1;
    }

    const query = { isActive: true };
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    const sortOptions = { [sort]: order === 'desc' ? -1 : 1 };

    const [games, total] = await Promise.all([
      Game.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Game.countDocuments(query)
    ]);

    const hasNextPage = skip + games.length < total;
    
    const gamesWithRandomData = games.map(game => ({
      ...game,
      gameData: getRandomElements(game.gameData || [], 7),
      isCompleted: game.completions?.users?.includes(userId),
      isLevelAvailable: userLevel >= (game.requiredLevel || 1)
    }));
    
    res.json({
      status: 'success',
      data: {
        games: gamesWithRandomData,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          hasNextPage
        }
      }
    });
  } catch (error) {
    next(error);
  }
}; 