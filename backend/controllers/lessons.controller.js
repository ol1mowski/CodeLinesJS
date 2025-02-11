import { Lesson } from "../models/index.js";
import { User } from "../models/user.model.js";
import { ValidationError } from "../utils/errors.js";
import { LessonContent } from "../models/lessonContent.model.js";

export const getLessons = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .select("stats.learningPaths")
      .lean();

    const query = {
      isPublished: true,
      isAvailable: true,
    };

    const usersCompletedLessons = user.stats.learningPaths[0].progress.completedLessons;


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

    res.json({
      lessons: groupedLessons,
      stats: {
        total: lessons.length,
        completed: usersCompletedLessons.length,
        progress: lessons.length ? Math.round((usersCompletedLessons.length / lessons.length) * 100) : 0,
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
        .select("stats.completedLessons stats.level")
        .lean(),
    ]);

    if (!lesson) {
      throw new ValidationError("Lekcja nie została znaleziona");
    }

    if (!lessonContent) {
      throw new ValidationError("Treść lekcji nie została znaleziona");
    }

    const userLevel = user.stats?.level || 1;
    const completedLessons = user.stats?.completedLessons || [];


    if (userLevel < lesson.requiredLevel) {
      throw new ValidationError(
        `Wymagany poziom ${lesson.requiredLevel} do odblokowania tej lekcji`
      );
    }

    if (lesson.requirements?.length > 0) {
      const hasCompletedRequirements = lesson.requirements.every((req) =>
        completedLessons.includes(req._id)
      );

      if (!hasCompletedRequirements) {
        throw new ValidationError(
          "Musisz ukończyć wymagane lekcje przed rozpoczęciem tej"
        );
      }
    }

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
      isCompleted: completedLessons.some((id) => id.equals(lesson._id)),
      content: {
        xp: lessonContent.xp,
        rewards: lessonContent.rewards,
        sections: lessonContent.sections,
        quiz: lessonContent.quiz,
      },
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

    const isCompleted = user.stats?.completedLessons?.some(
      (lessonId) => lessonId.toString() === lesson._id.toString()
    );

    if (isCompleted) {
      throw new ValidationError("Lekcja została już ukończona");
    }

    const userLearningPaths = user.stats.learningPaths[0].progress.completedLessons;

    user.stats = user.stats || {};
    user.stats.learningPaths = user.stats.learningPaths || [];
    user.stats.points = (user.stats.points || 0) + (lesson.points || 0);

    if (!userLearningPaths.some(lesson => lesson._id.toString() === lesson._id.toString())) {
      userLearningPaths.push({ _id: lesson._id, completedAt: new Date() });
    }

    const today = new Date().toDateString();
    const lastActive = user.stats.lastActive
      ? new Date(user.stats.lastActive).toDateString()
      : null;

    if (today !== lastActive) {
      user.stats.streak = (user.stats.streak || 0) + 1;
    }

    user.stats.lastActive = new Date();
    await user.save();

    res.json({
      message: "Lekcja ukończona",
      points: lesson.points,
      stats: {
        points: user.stats.points,
        completedLessons: userLearningPaths.length,
        streak: user.stats.streak,
        lastActive: user.stats.lastActive,

      },
    });
  } catch (error) {
    next(error);
  }
};
