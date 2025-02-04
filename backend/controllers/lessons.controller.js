import { Lesson } from "../models/index.js";
import { User } from "../models/user.model.js";
import { ValidationError } from "../utils/errors.js";
import { LessonContent } from "../models/lessonContent.model.js";

export const getLessons = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .select("stats.completedLessons")
      .lean();

    const query = {
      isPublished: true,
      isAvailable: true,
    };

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

    const completedLessons = user.stats?.completedLessons || [];

    const formattedLessons = lessons.map((lesson) => ({
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
      isCompleted: completedLessons.some(
        (completedId) => completedId.toString() === lesson._id.toString()
      ),
    }));

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
        completed: completedLessons.length,
        progress: Math.round((completedLessons.length / lessons.length) * 100),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Szukam lekcji o slug:", id);

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
      Lesson.findOne({ slug: id }),
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

    user.stats = user.stats || {};
    user.stats.completedLessons = user.stats.completedLessons || [];
    user.stats.points = (user.stats.points || 0) + (lesson.points || 0);
    user.stats.completedLessons.push(lesson._id);

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
        completedLessons: user.stats.completedLessons.length,
        streak: user.stats.streak,
        lastActive: user.stats.lastActive,
      },
    });
  } catch (error) {
    next(error);
  }
};
