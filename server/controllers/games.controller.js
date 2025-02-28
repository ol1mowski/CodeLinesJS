import { Game } from '../models/game.model.js';
import { ValidationError } from '../utils/errors.js';

export const getGames = async (req, res, next) => {
  try {
    const {
      difficulty,
      category,
      sort = 'rating.average',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

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

    res.json({
      status: 'success',
      data: {
        games: games.map(game => ({
          ...game,
          isCompleted: game.completions.users.includes(req.user?.userId)
        })),
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

export const getGameBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const game = await Game.findOne({ slug, isActive: true }).lean();

    if (!game) {
      throw new ValidationError('Gra nie istnieje');
    }

    res.json({
      status: 'success',
      data: {
        game: {
          ...game,
          isCompleted: game.completions.users.includes(req.user?.userId)
        }
      }
    });
  } catch (error) {
    next(error);
  }
}; 