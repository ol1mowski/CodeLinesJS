import { Request, Response, NextFunction } from 'express';

import { practiceTaskService, PracticeTaskQuery } from '../../services/practiceTask.service.js';

export class PracticeTaskController {
  async getPracticeTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query: PracticeTaskQuery = {
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
        category: req.query.category as string,
        difficulty: req.query.difficulty as 'easy' | 'medium' | 'hard',
        tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
        search: req.query.search as string,
        sortBy: req.query.sortBy as 'newest' | 'oldest' | 'difficulty' | 'estimatedTime',
        sortOrder: req.query.sortOrder as 'asc' | 'desc',
      };

      if (query.limit && (query.limit < 1 || query.limit > 50)) {
        res.status(400).json({
          success: false,
          message: 'Limit musi być między 1 a 50',
        });
        return;
      }

      if (query.difficulty && !['easy', 'medium', 'hard'].includes(query.difficulty)) {
        res.status(400).json({
          success: false,
          message: 'Nieprawidłowy poziom trudności',
        });
        return;
      }

      const tasks = await practiceTaskService.getPracticeTasks(query);

      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length,
        query: {
          limit: query.limit,
          category: query.category,
          difficulty: query.difficulty,
          tags: query.tags,
          search: query.search,
          sortBy: query.sortBy,
          sortOrder: query.sortOrder,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getRandomPracticeTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const category = req.query.category as string;
      const difficulty = req.query.difficulty as 'easy' | 'medium' | 'hard';

      if (limit < 1 || limit > 50) {
        res.status(400).json({
          success: false,
          message: 'Limit musi być między 1 a 50',
        });
        return;
      }

      const filters: PracticeTaskQuery = {};
      if (category && category !== 'Wszystkie') {
        filters.category = category;
      }
      if (difficulty) {
        filters.difficulty = difficulty;
      }

      const tasks = await practiceTaskService.getRandomPracticeTasks(
        limit,
        filters as Record<string, unknown>,
      );

      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPracticeTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || id.length !== 24) {
        res.status(400).json({
          success: false,
          message: 'Nieprawidłowy identyfikator zadania',
        });
        return;
      }

      const task = await practiceTaskService.getPracticeTaskById(id, false);

      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Zadanie nie zostało znalezione',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPracticeTaskSolution(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || id.length !== 24) {
        res.status(400).json({
          success: false,
          message: 'Nieprawidłowy identyfikator zadania',
        });
        return;
      }

      const solution = await practiceTaskService.getPracticeTaskSolution(id);

      if (!solution) {
        res.status(404).json({
          success: false,
          message: 'Zadanie nie zostało znalezione',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: solution,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Zadanie nie zostało znalezione') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await practiceTaskService.getCategories();

      res.status(200).json({
        success: true,
        data: categories,
        count: categories.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tags = await practiceTaskService.getTags();

      res.status(200).json({
        success: true,
        data: tags,
        count: tags.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await practiceTaskService.getStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchTerm = req.query.q as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

      if (!searchTerm || searchTerm.trim().length < 2) {
        res.status(400).json({
          success: false,
          message: 'Fraza wyszukiwania musi mieć co najmniej 2 znaki',
        });
        return;
      }

      if (limit < 1 || limit > 50) {
        res.status(400).json({
          success: false,
          message: 'Limit musi być między 1 a 50',
        });
        return;
      }

      const tasks = await practiceTaskService.searchTasks(searchTerm.trim(), limit);

      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length,
        searchTerm: searchTerm.trim(),
      });
    } catch (error) {
      next(error);
    }
  }

  async addTaskCompletion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!id || id.length !== 24) {
        res.status(400).json({
          success: false,
          message: 'Nieprawidłowy identyfikator zadania',
        });
        return;
      }

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Musisz być zalogowany',
        });
        return;
      }

      await practiceTaskService.addTaskCompletion(id, userId);

      res.status(200).json({
        success: true,
        message: 'Zadanie zostało oznaczone jako ukończone',
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Zadanie nie zostało znalezione') {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }
}

export const practiceTaskController = new PracticeTaskController();
