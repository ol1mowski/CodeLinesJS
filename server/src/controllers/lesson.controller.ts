import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { LessonService } from '../services/lesson/lesson.service.js';

export const getLessons = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { category, difficulty, search } = req.query as {
    category?: string;
    difficulty?: string;
    search?: string;
  };

  const lessonsResponse = await LessonService.getLessons(userId, {
    category,
    difficulty,
    search
  });

  res.status(200).json(lessonsResponse);
});

export const getLessonBySlug = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { slug } = req.params;

  const lessonDetail = await LessonService.getLessonBySlug(slug, userId);

  res.status(200).json(lessonDetail);
});

export const completeLesson = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { lessonId } = req.params;

  const result = await LessonService.completeLesson(lessonId, userId);

  res.status(200).json(result);
}); 