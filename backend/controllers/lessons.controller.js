import { Lesson } from '../models/index.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';
import { LessonContent } from '../models/lessonContent.model.js';

export const getLessons = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    const query = { 
      isPublished: true,
      isAvailable: true
    };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const user = await User.findById(req.user.userId)
      .select('stats.completedChallenges stats.progress.currentLevel')
      .lean();
    
    const userLevel = user.stats?.progress?.currentLevel || 1;
    const completedChallenges = Array.isArray(user.stats?.completedChallenges) 
      ? user.stats.completedChallenges 
      : [];

    query.requiredLevel = { $lte: userLevel };
    
    const lessons = await Lesson.find(query)
      .sort({ order: 1 })
      .select('title description category difficulty duration points isAvailable requiredLevel slug')
      .lean();
    
    const availableLessons = lessons.map(lesson => ({
      _id: lesson._id,
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      category: lesson.category,
      difficulty: lesson.difficulty,
      duration: lesson.duration,
      points: lesson.points,
      requiredLevel: lesson.requiredLevel,
      isCompleted: completedChallenges.some(id => id.toString() === lesson._id.toString()),
      isLocked: userLevel < lesson.requiredLevel
    }));
    
    res.json({
      lessons: availableLessons,
      userProgress: {
        completedLessons: completedChallenges.length,
        userLevel
      }
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
        isAvailable: true
      }).populate('requirements', 'title'),
      LessonContent.findOne({ lessonSlug: id }).lean(),
      User.findById(req.user.userId)
        .select('stats.completedChallenges stats.progress.currentLevel')
        .lean()
    ]);
    
    if (!lesson) {
      throw new ValidationError('Lekcja nie została znaleziona');
    }

    if (!lessonContent) {
      throw new ValidationError('Treść lekcji nie została znaleziona');
    }
    
    const userLevel = user.stats?.progress?.currentLevel || 1;
    const completedChallenges = Array.isArray(user.stats?.completedChallenges) 
      ? user.stats.completedChallenges 
      : [];

    if (userLevel < lesson.requiredLevel) {
      throw new ValidationError(`Wymagany poziom ${lesson.requiredLevel} do odblokowania tej lekcji`);
    }
    
    if (lesson.requirements?.length > 0) {
      const hasCompletedRequirements = lesson.requirements.every(req => 
        completedChallenges.includes(req._id)
      );
      
      if (!hasCompletedRequirements) {
        throw new ValidationError('Musisz ukończyć wymagane lekcje przed rozpoczęciem tej');
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
      requirements: lesson.requirements.map(req => ({
        id: req._id,
        title: req.title,
        isCompleted: completedChallenges.includes(req._id)
      })),
      isCompleted: completedChallenges.includes(lesson._id),
      content: {
        xp: lessonContent.xp,
        rewards: lessonContent.rewards,
        sections: lessonContent.sections
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
      Lesson.findById(id),
      User.findById(userId)
    ]);

    if (!lesson) {
      throw new ValidationError('Lekcja nie została znaleziona');
    }
    
    const completedLessons = user.stats?.completedChallenges || [];
    if (completedLessons.some(lessonId => lessonId.toString() === id)) {
      throw new ValidationError('Lekcja została już ukończona');
    }
    
    user.stats = user.stats || {};
    user.stats.completedChallenges = [...completedLessons, lesson._id];
    user.stats.totalPoints = (user.stats.totalPoints || 0) + lesson.points;
    
    const today = new Date().toDateString();
    const lastActive = user.stats.lastActive ? new Date(user.stats.lastActive).toDateString() : null;
    
    if (today !== lastActive) {
      user.stats.streak = (user.stats.streak || 0) + 1;
    }
    
    user.stats.lastActive = new Date();
    await user.save();
    
    res.json({
      message: 'Lekcja ukończona',
      points: lesson.points,
      stats: user.stats
    });
  } catch (error) {
    next(error);
  }
};