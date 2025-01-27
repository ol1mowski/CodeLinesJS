import { Lesson } from '../models/index.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';

export const getLessons = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    const query = { isPublished: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const lessons = await Lesson.find(query)
      .sort({ order: 1 })
      .select('title description category difficulty duration points')
      .lean();
    
    const user = await User.findById(req.user.userId)
      .select('stats.completedChallenges')
      .lean();
    
    res.json({
      lessons,
      userProgress: {
        completedLessons: user.stats.completedChallenges
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const lesson = await Lesson.findOne({ 
      _id: id,
      isPublished: true 
    }).populate('requirements', 'title');
    
    if (!lesson) {
      throw new ValidationError('Lekcja nie została znaleziona');
    }
    
    if (lesson.requirements?.length > 0) {
      const user = await User.findById(req.user.userId)
        .select('stats.completedChallenges');
      
      const hasCompletedRequirements = lesson.requirements.every(req => 
        user.stats.completedChallenges.includes(req._id)
      );
      
      if (!hasCompletedRequirements) {
        throw new ValidationError('Musisz ukończyć wymagane lekcje przed rozpoczęciem tej');
      }
    }
    
    res.json(lesson);
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