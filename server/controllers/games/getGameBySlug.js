import { Game } from '../../models/game.model.js';
import { ValidationError } from '../../utils/errors.js';

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