import { User } from '../models/user.model.js';
import { Lesson } from '../models/index.js';
import { ValidationError } from '../utils/errors.js';

export const updateProgress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { lessonId, points } = req.body;

    if (userId !== req.user.userId) {
      throw new ValidationError('Brak dostępu do danych tego użytkownika');
    }

    const [user, lesson] = await Promise.all([
      User.findById(userId),
      Lesson.findOne({ slug: lessonId })
    ]);

    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }

    if (!lesson) {
      throw new ValidationError('Lekcja nie znaleziona');
    }

    if (user.stats?.completedLessons?.includes(lesson._id)) {
      throw new ValidationError('Lekcja została już ukończona');
    }

    user.stats = user.stats || {};
    user.stats.points = (user.stats.points || 0) + (points || 0);
    user.stats.completedLessons = user.stats.completedLessons || [];
    user.stats.lastActive = new Date();

    user.stats.completedLessons.push(lesson._id);

    await user.save();

    res.json({
      message: 'Postęp zaktualizowany pomyślnie',
      stats: {
        points: user.stats.points,
        completedLessons: user.stats.completedLessons.length,
        lastActive: user.stats.lastActive
      }
    });
  } catch (error) {
    next(error);
  }
}; 