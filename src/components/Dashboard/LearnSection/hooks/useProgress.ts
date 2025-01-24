import { useState, useEffect } from 'react';
import type { LessonProgress, Lesson } from '../types/lesson.types';

export const useProgress = (lessonId: string) => {
  const [progress, setProgress] = useState<LessonProgress>(() => {
    const saved = localStorage.getItem(`lesson-progress-${lessonId}`);
    return saved ? JSON.parse(saved) : {
      completedSections: [],
      quizResults: {},
      xpEarned: 0
    };
  });

  const markSectionComplete = (sectionIndex: number, lesson: Lesson) => {
    if (!progress.completedSections.includes(sectionIndex)) {
      const sectionXP = Math.round(lesson.xp / lesson.sections.length);
      
      setProgress(prev => ({
        ...prev,
        completedSections: [...prev.completedSections, sectionIndex],
        xpEarned: prev.xpEarned + sectionXP
      }));
    }
  };

  const calculateProgress = (lesson: Lesson) => {
    const totalSections = lesson.sections.length;
    const completedSections = progress.completedSections.length;
    return Math.round((completedSections / totalSections) * 100);
  };

  const handleQuizComplete = (quizId: string, correctAnswers: number, totalQuestions: number, lesson: Lesson) => {
    const quizXP = Math.round((lesson.xp * 0.2) * (correctAnswers / totalQuestions));
    
    setProgress(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [quizId]: {
          completed: true,
          completedAt: new Date().toISOString(),
          correctAnswers,
          totalQuestions
        }
      },
      xpEarned: prev.xpEarned + quizXP
    }));
  };

  const isLessonCompleted = (lesson: Lesson) => {
    const sectionsCompleted = progress.completedSections.length === lesson.sections.length;
    const quizzes = lesson.sections.filter(s => s.quiz).length;
    const quizzesCompleted = Object.keys(progress.quizResults).length === quizzes;
    
    return sectionsCompleted && quizzesCompleted;
  };

  useEffect(() => {
    localStorage.setItem(`lesson-progress-${lessonId}`, JSON.stringify(progress));
  }, [progress, lessonId]);

  return {
    progress,
    markSectionComplete,
    calculateProgress,
    handleQuizComplete,
    isLessonCompleted
  };
}; 