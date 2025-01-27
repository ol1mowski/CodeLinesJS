import { LearningPath } from '../models/learningPath.model.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';

export const getLearningPaths = async (req, res, next) => {
  try {
    const { difficulty, search } = req.query;
    const query = { isActive: true };
    
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const learningPaths = await LearningPath.find(query)
      .populate({
        path: 'lessons',
        select: 'title description category difficulty duration points'
      })
      .lean();
    
    const user = await User.findById(req.user.userId)
      .select('stats.completedChallenges')
      .lean();
    
    const pathsWithProgress = learningPaths.map(path => {
      const completedLessons = path.lessons.filter(lesson => 
        user.stats.completedChallenges.includes(lesson._id)
      );
      
      const progress = {
        completed: completedLessons.length,
        total: path.lessons.length,
        percentage: Math.round((completedLessons.length / path.lessons.length) * 100)
      };
      
      return {
        id: path._id,
        title: path.title,
        description: path.description,
        difficulty: path.difficulty,
        estimatedTime: path.estimatedTime,
        requirements: path.requirements,
        outcomes: path.outcomes,
        progress,
        lessons: path.lessons.map(lesson => ({
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          category: lesson.category,
          difficulty: lesson.difficulty,
          duration: lesson.duration,
          points: lesson.points,
          isCompleted: user.stats.completedChallenges.includes(lesson._id)
        }))
      };
    });
    
    res.json(pathsWithProgress);
  } catch (error) {
    next(error);
  }
};

export const getLearningPathById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const learningPath = await LearningPath.findOne({ 
      _id: id,
      isActive: true 
    }).populate({
      path: 'lessons',
      select: 'title description category difficulty duration points requirements'
    });
    
    if (!learningPath) {
      throw new ValidationError('Ścieżka nauki nie została znaleziona');
    }
    
    const user = await User.findById(req.user.userId)
      .select('stats.completedChallenges')
      .lean();
    
    const completedLessons = learningPath.lessons.filter(lesson => 
      user.stats.completedChallenges.includes(lesson._id)
    );
    
    const response = {
      id: learningPath._id,
      title: learningPath.title,
      description: learningPath.description,
      difficulty: learningPath.difficulty,
      estimatedTime: learningPath.estimatedTime,
      requirements: learningPath.requirements,
      outcomes: learningPath.outcomes,
      progress: {
        completed: completedLessons.length,
        total: learningPath.lessons.length,
        percentage: Math.round((completedLessons.length / learningPath.lessons.length) * 100)
      },
      lessons: learningPath.lessons.map(lesson => ({
        id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        difficulty: lesson.difficulty,
        duration: lesson.duration,
        points: lesson.points,
        isCompleted: user.stats.completedChallenges.includes(lesson._id),
        requirements: lesson.requirements
      }))
    };
    
    res.json(response);
  } catch (error) {
    next(error);
  }
}; 