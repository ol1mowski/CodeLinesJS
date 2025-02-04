import { User } from "../models/user.model.js";
import { Lesson, LearningPath } from "../models/index.js";
import { ValidationError } from "../utils/errors.js";

export const updateProgress = async (req, res, next) => {
  try {
    const { lessonId } = req.body;
    const userId = req.user.userId;

    // Znajdź lekcję
    const lesson = await Lesson.findOne({ slug: lessonId });
    if (!lesson) throw new ValidationError("Lekcja nie znaleziona");

    // Znajdź użytkownika i ścieżkę nauki
    const [user, learningPath] = await Promise.all([
      User.findById(userId),
      LearningPath.findOne({ lessons: { $in: [lesson._id] } }),
    ]);

    if (!user) throw new ValidationError("Użytkownik nie znaleziony");
    if (!learningPath)
      throw new ValidationError("Ścieżka nauki nie znaleziona");

    // ✅ Zapewnij, że user.learningPaths istnieje
    if (!user.learningPaths) {
      user.learningPaths = [];
    }

    // Znajdź indeks ścieżki użytkownika
    let userPathIndex = user.learningPaths.findIndex(
      (path) => path.pathId.toString() === learningPath._id.toString()
    );

    let userPath = user.learningPaths[userPathIndex];

    // Jeśli użytkownik nie ma tej ścieżki, dodaj ją
    if (!userPath) {
      userPath = {
        pathId: learningPath._id,
        status: "active",
        progress: {
          completed: [],
          totalLessons: learningPath.totalLessons,
          lastLesson: null,
          lastActivity: new Date(),
          startedAt: new Date(),
          completedAt: null,
        },
      };

      user.learningPaths.push(userPath);
      userPathIndex = user.learningPaths.length - 1;
    }

    // Sprawdź, czy lekcja została już ukończona
    const isLessonCompleted = userPath.progress.completed.some(
      (id) => id.toString() === lesson._id.toString()
    );

    if (!isLessonCompleted) {
      userPath.progress.completed.push(lesson._id);
      userPath.progress.lastLesson = lesson._id;
      userPath.progress.lastActivity = new Date();

      // Jeśli wszystkie lekcje są ukończone, oznacz ścieżkę jako "completed"
      if (userPath.progress.completed.length === learningPath.totalLessons) {
        userPath.status = "completed";
        userPath.progress.completedAt = new Date();
      }

      // ✅ Oznacz zmiany w learningPaths
      user.markModified("learningPaths");

      // Aktualizacja statystyk użytkownika
      const oldLastActive = user.stats.lastActive
        ? new Date(user.stats.lastActive).toDateString()
        : null;

      user.stats.points = (user.stats.points || 0) + (lesson.points || 0);
      user.stats.xp = (user.stats.xp || 0) + (lesson.points || 0);
      user.stats.lastActive = new Date();

      const today = new Date().toDateString();
      if (oldLastActive !== today) {
        user.stats.streak = (user.stats.streak || 0) + 1;
        user.stats.bestStreak = Math.max(
          user.stats.streak,
          user.stats.bestStreak || 0
        );
      }

      // ✅ Zapisz zmiany do bazy danych
      await user.save();
    }

    // Zwrot odpowiedzi do klienta
    res.json({
      message: "Postęp zaktualizowany pomyślnie",
      stats: {
        points: user.stats.points,
        xp: user.stats.xp,
        streak: user.stats.streak,
        lastActive: user.stats.lastActive,
        pathProgress: {
          completedLessons: userPath.progress.completed.length,
          totalLessons: learningPath.totalLessons,
          percentage: Math.round(
            (userPath.progress.completed.length / learningPath.totalLessons) *
              100
          ),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
