import { useState, useEffect } from 'react';
import type { LessonProgress } from '../types/lesson.types';

export const useProgress = (lessonId: string) => {
  const [progress, setProgress] = useState<LessonProgress>(() => {
    const saved = localStorage.getItem(`lesson-progress-${lessonId}`);
    return saved ? JSON.parse(saved) : {
      completedSections: [],
      quizResults: {},
      xpEarned: 0
    };
  });

  useEffect(() => {
    localStorage.setItem(`lesson-progress-${lessonId}`, JSON.stringify(progress));
  }, [progress, lessonId]);

  return {
    progress,
    setProgress
  };
}; 