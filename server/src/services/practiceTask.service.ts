import mongoose from 'mongoose';

import { PracticeTask, IPracticeTask } from '../models/practiceTask.model.js';

export interface PracticeTaskQuery {
  limit?: number;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'difficulty' | 'estimatedTime';
  sortOrder?: 'asc' | 'desc';
}

export interface CreatePracticeTaskDto {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime: number;
  taskContent: string;
  solution: string;
  tips?: string[];
  tags?: string[];
  isActive?: boolean;
}

export interface PracticeTaskStats {
  totalTasks: number;
  tasksByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  tasksByCategory: Array<{
    category: string;
    count: number;
  }>;
  popularTags: Array<{
    tag: string;
    count: number;
  }>;
}

class PracticeTaskService {
  async getPracticeTasks(query: PracticeTaskQuery = {}): Promise<IPracticeTask[]> {
    const {
      limit = 10,
      category,
      difficulty,
      tags,
      search,
      sortBy = 'newest',
      sortOrder = 'desc',
    } = query;

    const matchStage: Record<string, unknown> = { isActive: true };

    if (category && category !== 'Wszystkie') {
      matchStage.category = category;
    }

    if (difficulty) {
      matchStage.difficulty = difficulty;
    }

    if (tags && tags.length > 0) {
      matchStage.tags = { $in: tags };
    }

    if (search) {
      matchStage.$text = { $search: search };
    }

    const sortStage: Record<string, 1 | -1> = {};
    switch (sortBy) {
      case 'newest':
        sortStage.createdAt = sortOrder === 'asc' ? 1 : -1;
        break;
      case 'oldest':
        sortStage.createdAt = sortOrder === 'asc' ? 1 : -1;
        break;
      case 'difficulty': {
        sortStage.difficulty = sortOrder === 'asc' ? 1 : -1;
        break;
      }
      case 'estimatedTime':
        sortStage.estimatedTime = sortOrder === 'asc' ? 1 : -1;
        break;
      default:
        sortStage.createdAt = -1;
    }

    const pipeline = [
      { $match: matchStage },
      { $sort: sortStage },
      { $limit: limit },
      {
        $project: {
          title: 1,
          description: 1,
          difficulty: 1,
          category: 1,
          estimatedTime: 1,
          taskContent: 1,
          tips: 1,
          tags: 1,
          completions: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    return await PracticeTask.aggregate(pipeline);
  }

  async getRandomPracticeTasks(
    limit: number = 10,
    filters: Record<string, unknown> = {},
  ): Promise<IPracticeTask[]> {
    return await (
      PracticeTask as typeof PracticeTask & {
        getRandomTasks: (
          limit: number,
          filters: Record<string, unknown>,
        ) => Promise<IPracticeTask[]>;
      }
    ).getRandomTasks(limit, filters);
  }

  async getPracticeTaskById(
    id: string,
    includeSolution: boolean = false,
  ): Promise<IPracticeTask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Nieprawidłowy identyfikator zadania');
    }

    if (includeSolution) {
      return await PracticeTask.findById(id).lean().exec();
    }

    return await (
      PracticeTask as typeof PracticeTask & {
        getTaskWithoutSolution: (id: string) => Promise<IPracticeTask | null>;
      }
    ).getTaskWithoutSolution(id);
  }

  async getPracticeTaskSolution(id: string): Promise<{ solution: string } | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Nieprawidłowy identyfikator zadania');
    }

    const task = await PracticeTask.findById(id).select('solution').lean().exec();

    if (!task) {
      throw new Error('Zadanie nie zostało znalezione');
    }

    return { solution: task.solution };
  }

  async getCategories(): Promise<string[]> {
    return await (
      PracticeTask as typeof PracticeTask & { getCategories: () => Promise<string[]> }
    ).getCategories();
  }

  async getTags(): Promise<string[]> {
    return await (
      PracticeTask as typeof PracticeTask & { getTags: () => Promise<string[]> }
    ).getTags();
  }

  async getStats(): Promise<PracticeTaskStats> {
    const totalTasks = await PracticeTask.countDocuments({ isActive: true });

    const difficultyStats = await PracticeTask.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } },
    ]);

    const categoryStats = await PracticeTask.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const tagStats = await PracticeTask.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const tasksByDifficulty = {
      easy: difficultyStats.find((s) => s._id === 'easy')?.count || 0,
      medium: difficultyStats.find((s) => s._id === 'medium')?.count || 0,
      hard: difficultyStats.find((s) => s._id === 'hard')?.count || 0,
    };

    const tasksByCategory = categoryStats.map((s) => ({
      category: s._id,
      count: s.count,
    }));

    const popularTags = tagStats.map((s) => ({
      tag: s._id,
      count: s.count,
    }));

    return {
      totalTasks,
      tasksByDifficulty,
      tasksByCategory,
      popularTags,
    };
  }

  async createManyPracticeTasks(dtos: CreatePracticeTaskDto[]): Promise<IPracticeTask[]> {
    const tasks = await PracticeTask.insertMany(dtos);
    return tasks as IPracticeTask[];
  }

  async addTaskCompletion(taskId: string, userId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Nieprawidłowe identyfikatory');
    }

    const task = await PracticeTask.findById(taskId);
    if (!task) {
      throw new Error('Zadanie nie zostało znalezione');
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    (
      task as typeof task & { addCompletion: (userId: mongoose.Types.ObjectId) => void }
    ).addCompletion(userObjectId);
    await task.save();
  }

  async searchTasks(searchTerm: string, limit: number = 10): Promise<IPracticeTask[]> {
    return await PracticeTask.find(
      {
        $text: { $search: searchTerm },
        isActive: true,
      },
      { score: { $meta: 'textScore' } },
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .select('-solution')
      .lean()
      .exec();
  }
}

export const practiceTaskService = new PracticeTaskService();
