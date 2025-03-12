import { Lesson } from "../models/index.js";
import { User } from "../models/user.model.js";
import { ValidationError } from "../utils/errors.js";
import { LessonContent } from "../models/lessonContent.model.js";
import { LevelService } from "../services/level.service.js";

export const getLessons = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .select("stats.learningPaths stats.level stats.points stats.pointsToNextLevel stats.streak stats.bestStreak")
      .lean();

    const query = {
      isPublished: true,
      isAvailable: true,
    };

    const usersCompletedLessons = user.stats.learningPaths && user.stats.learningPaths.length > 0
      ? user.stats.learningPaths[0].progress.completedLessons
      : [];

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const lessons = await Lesson.find(query)
      .select(
        "title description category difficulty duration points slug requirements requiredLevel"
      )
      .sort({ order: 1 })
      .lean();

    const formattedLessons = lessons.map((lesson) => {
      const isCompleted = usersCompletedLessons.some(
        (completedLesson) => completedLesson._id.toString() === lesson._id.toString()
      );

      return {
        id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        difficulty: lesson.difficulty,
        duration: lesson.duration,
        points: lesson.points,
        slug: lesson.slug,
        requirements: lesson.requirements,
        requiredLevel: lesson.requiredLevel,
        isCompleted: isCompleted,
      };
    });

    const groupedLessons = formattedLessons.reduce((acc, lesson) => {
      if (!acc[lesson.category]) {
        acc[lesson.category] = [];
      }
      acc[lesson.category].push(lesson);
      return acc;
    }, {});

    const levelStats = LevelService.getUserLevelStats(user);

    res.json({
      lessons: groupedLessons,
      stats: {
        total: lessons.length,
        completed: usersCompletedLessons.length,
        progress: lessons.length ? Math.round((usersCompletedLessons.length / lessons.length) * 100) : 0,
        level: levelStats.level,
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        levelProgress: levelStats.progress,
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [lesson, lessonContent, user] = await Promise.all([
      Lesson.findOne({
        slug: id,
        isPublished: true,
      }).populate("requirements", "title"),
      LessonContent.findOne({ lessonSlug: id }).lean(),
      User.findById(req.user.userId)
        .select("stats.learningPaths stats.level stats.points stats.pointsToNextLevel stats.streak stats.bestStreak")
        .lean(),
    ]);

    if (!lesson) {
      throw new ValidationError("Lekcja nie została znaleziona");
    }

    if (!lessonContent) {
      throw new ValidationError("Treść lekcji nie została znaleziona");
    }

    const userLevel = user.stats?.level || 1;

    if (userLevel < lesson.requiredLevel) {
      throw new ValidationError(
        `Wymagany poziom ${lesson.requiredLevel} do odblokowania tej lekcji`
      );
    }

    const completedLessons = user.stats.learningPaths && user.stats.learningPaths.length > 0
    ? user.stats.learningPaths[0].progress.completedLessons
    : [];

    if (lesson.requirements?.length > 0) {
      const hasCompletedRequirements = lesson.requirements.every(req =>
        completedLessons.includes(req._id.toString())
      );

      if (!hasCompletedRequirements) {
        throw new ValidationError(
          "Musisz ukończyć wymagane lekcje przed rozpoczęciem tej"
        );
      }
    }
    
    const levelStats = LevelService.getUserLevelStats(user);
    
    const response = {
      id: lesson._id,
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      category: lesson.category,
      difficulty: lesson.difficulty,
      duration: lesson.duration,
      points: lesson.points,
      requiredLevel: lesson.requiredLevel,
      isCompleted: completedLessons.some(
        (completedLesson) => completedLesson._id.toString() === lesson._id.toString()
      ),
      content: {
        xp: lessonContent.xp,
        rewards: lessonContent.rewards,
        sections: lessonContent.sections,
        quiz: lessonContent.quiz,
      },
      userStats: {
        level: levelStats.level,
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        levelProgress: levelStats.progress,
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0
      }
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const completeLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    

    const [lesson, user] = await Promise.all([
      Lesson.findOne({ _id: id }),
      User.findById(userId),
    ]);

    if (!lesson) {
      throw new ValidationError("Lekcja nie została znaleziona");
    }

    if (!user.stats.learningPaths || user.stats.learningPaths.length === 0) {
      throw new ValidationError("Użytkownik nie ma przypisanych ścieżek nauki");
    }

    const userLearningPaths = user.stats.learningPaths[0].progress.completedLessons;

    const isCompleted = userLearningPaths.some(
      (completedLesson) => completedLesson._id.toString() === lesson._id.toString()
    );


    if (!isCompleted) {
      userLearningPaths.push({ _id: lesson._id, completedAt: new Date() });

      const earnedPoints = lesson.points || 0;
      const timeSpent = lesson.duration || 0;
      
      const update = await LevelService.updateUserLevelAndStreak(userId, earnedPoints, {
        points: earnedPoints,
        challenges: 1,
        timeSpent: timeSpent
      });

      await user.save();
      
      const levelStats = LevelService.getUserLevelStats(user);

      return res.json({
        message: update.level.leveledUp 
          ? `Lekcja ukończona! Awansowałeś na poziom ${update.level.level}!` 
          : 'Lekcja ukończona',
        stats: {
          points: levelStats.points,
          pointsRequired: levelStats.pointsToNextLevel,
          xp: user.stats.xp,
          level: levelStats.level,
          levelProgress: levelStats.progress,
          completedLessons: userLearningPaths.length,
          leveledUp: update.level.leveledUp,
          levelsGained: update.level.levelsGained,
          streak: update.streak.streak,
          bestStreak: update.streak.bestStreak,
          streakUpdated: update.streak.streakUpdated
        },
      });
    }

    const levelStats = LevelService.getUserLevelStats(user);
    
    res.json({
      message: 'Lekcja została już wcześniej ukończona',
      stats: {
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        xp: user.stats.xp,
        level: levelStats.level,
        levelProgress: levelStats.progress,
        completedLessons: userLearningPaths.length,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak
      },
    });
  } catch (error) {
    next(error);
  }
};
