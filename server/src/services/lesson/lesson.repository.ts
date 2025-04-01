import { User } from '../../models/user.model.js';
import { Lesson } from '../../models/lesson.model.js';
import { LessonContent } from '../../models/lessonContent.model.js';
import { ValidationError } from '../../utils/errors.js';
import mongoose from 'mongoose';

export class LessonRepository {
  static async findAll(query = {}) {
    return Lesson.find(query)
      .populate('requirements', 'title slug')
      .sort({ createdAt: -1 })
      .lean();
  }

  static async findById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new ValidationError('Nieprawidłowy format ID lekcji');
    }
    
    return Lesson.findById(id)
      .populate('requirements', 'title slug')
      .lean();
  }

  static async findBySlug(slug: string) {
    return Lesson.findOne({ slug })
      .populate('requirements', 'title slug')
      .lean();
  }
}

export class LessonContentRepository {
  static async findBySlug(slug: string) {
    return LessonContent.findOne({ slug }).lean();
  }
}

export class UserRepository {
  static async findById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new ValidationError('Nieprawidłowy format ID użytkownika');
    }
    
    return User.findById(id);
  }

  static async findUserWithStats(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new ValidationError('Nieprawidłowy format ID użytkownika');
    }
    
    return User.findById(id)
      .select('stats')
      .lean();
  }

  static getCompletedLessons(user: any) {
    if (!user?.stats?.learningPaths?.[0]?.progress?.completedLessons) {
      return [];
    }
    
    return user.stats.learningPaths[0].progress.completedLessons;
  }
  
  static isLessonCompleted(completedLessons: any[], lessonId: string) {
    return completedLessons.some(completedLesson => 
      completedLesson._id.toString() === lessonId
    );
  }

  static addCompletedLesson(user: any, lessonId: string) {
    if (!user.stats) {
      user.stats = {};
    }
    
    if (!user.stats.learningPaths || user.stats.learningPaths.length === 0) {
      user.stats.learningPaths = [{
        progress: {
          completedLessons: []
        }
      }];
    }
    
    if (!user.stats.learningPaths[0].progress) {
      user.stats.learningPaths[0].progress = { completedLessons: [] };
    }
    
    if (!user.stats.learningPaths[0].progress.completedLessons) {
      user.stats.learningPaths[0].progress.completedLessons = [];
    }
    
    user.stats.learningPaths[0].progress.completedLessons.push({
      _id: lessonId,
      completedAt: new Date()
    });
  }
  
  static async saveUser(user: any) {
    return user.save();
  }
} 