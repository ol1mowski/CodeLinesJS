import { User } from '../models/user.model.js';
import { Lesson } from '../models/index.js';
import { ValidationError } from '../utils/errors.js';

export const updateProgress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { lessonId, points } = req.body;

    // Sprawdź czy użytkownik ma dostęp
    if (userId !== req.user.userId) {
      throw new ValidationError('Brak dostępu do danych tego użytkownika');
    }

    // Pobierz użytkownika i lekcję równolegle
    const [user, lesson] = await Promise.all([
      User.findById(userId),
      Lesson.findById(lessonId)
    ]);

    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }

    if (!lesson) {
      throw new ValidationError('Lekcja nie znaleziona');
    }

    // Sprawdź czy lekcja nie została już ukończona
    if (user.stats?.completedLessons?.includes(lessonId)) {
      throw new ValidationError('Lekcja została już ukończona');
    }

    // Inicjalizuj stats jeśli nie istnieje
    user.stats = user.stats || {};
    user.stats.points = (user.stats.points || 0) + (points || 0);
    user.stats.completedLessons = user.stats.completedLessons || [];
    user.stats.lastActive = new Date();

    // Dodaj lekcję do ukończonych
    user.stats.completedLessons.push(lessonId);

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