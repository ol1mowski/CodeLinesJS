import { Lesson } from '../models/lesson.model.js';
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
    
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      throw new ValidationError('Lekcja nie została znaleziona');
    }
    
    const user = await User.findById(userId);
    
    if (user.stats.completedChallenges.includes(id)) {
      throw new ValidationError('Lekcja została już ukończona');
    }
    
    user.stats.completedChallenges.push(id);
    user.stats.totalPoints += lesson.points;
    
    const today = new Date().toDateString();
    const lastActive = new Date(user.stats.lastActive).toDateString();
    
    if (today !== lastActive) {
      user.stats.streak += 1;
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