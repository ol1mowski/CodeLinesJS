import { Game } from '../../models/game.model.js';
import { ValidationError } from '../../utils/errors.js';

export const getGameBySlug = async (req, res, next) => {
  const getRandomElements = (array, count) => {

    if (array.length <= count) return array;
    
    const shuffled = [...array];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  };
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
          gameData: getRandomElements(game.gameData, 7).map(item => ({
            ...item,
            isCompleted: game.completions?.users?.includes(userId),
            isLevelAvailable: userLevel >= (game.requiredLevel || 1)
          })),
          ...game,
          isCompleted: game.completions.users.includes(req.user?.userId)
        }
      }
    });
  } catch (error) {
    next(error);
  }
}; 