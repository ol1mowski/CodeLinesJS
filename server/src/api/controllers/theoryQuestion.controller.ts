import { Request, Response, NextFunction } from 'express';

import {
  theoryQuestionService,
  TheoryQuestionQuery,
} from '../../services/theoryQuestion.service.js';

export class TheoryQuestionController {
  async getRandomTheoryQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query: TheoryQuestionQuery = {
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
      };

      if (query.limit && (query.limit < 1 || query.limit > 50)) {
        res.status(400).json({
          success: false,
          message: 'Limit musi być między 1 a 50',
        });
        return;
      }

      const questions = await theoryQuestionService.getRandomTheoryQuestions(query);

      res.status(200).json({
        success: true,
        data: questions,
        count: questions.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTheoryQuestionById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || id.length !== 24) {
        res.status(400).json({
          success: false,
          message: 'Nieprawidłowy identyfikator pytania',
        });
        return;
      }

      const question = await theoryQuestionService.getTheoryQuestionById(id);

      if (!question) {
        res.status(404).json({
          success: false,
          message: 'Pytanie nie zostało znalezione',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: question,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkAnswer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { answer } = req.body;

      if (!id || id.length !== 24) {
        res.status(400).json({
          success: false,
          message: 'Nieprawidłowy identyfikator pytania',
        });
        return;
      }

      if (typeof answer !== 'number' || answer < 0 || answer > 3) {
        res.status(400).json({
          success: false,
          message: 'Odpowiedź musi być liczbą od 0 do 3',
        });
        return;
      }

      const result = await theoryQuestionService.checkAnswer(id, answer);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Pytanie nie zostało znalezione') {
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

export const theoryQuestionController = new TheoryQuestionController();
