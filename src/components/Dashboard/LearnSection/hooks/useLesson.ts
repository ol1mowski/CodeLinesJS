import { useState, useEffect } from 'react';
import type { Lesson, LessonProgress, Reward } from '../types/lesson.types';

export const useLesson = (lessonId: string) => {
  const [progress, setProgress] = useState<LessonProgress>(() => {
    const saved = localStorage.getItem(`lesson-progress-${lessonId}`);
    return saved ? JSON.parse(saved) : {
      completedSections: [],
      quizResults: {}
    };
  });

  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  useEffect(() => {
    localStorage.setItem(`lesson-progress-${lessonId}`, JSON.stringify(progress));
  }, [progress, lessonId]);

  const markSectionComplete = (sectionIndex: number) => {
    setProgress(prev => ({
      ...prev,
      completedSections: [...new Set([...prev.completedSections, sectionIndex])]
    }));
  };

  const saveQuizResult = (quizId: string, correct: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [quizId]: {
          completed: true,
          correctAnswers: correct,
          totalQuestions: total
        }
      }
    }));
  };

  const calculateProgress = (lesson: Lesson) => {
    const totalSections = lesson.sections.length;
    const completedSections = progress.completedSections.length;
    const quizzes = Object.values(progress.quizResults);
    const completedQuizzes = quizzes.filter(q => q.completed).length;
    const totalQuizzes = lesson.sections.filter(s => s.quiz).length;

    return Math.round(
      ((completedSections + completedQuizzes) / (totalSections + totalQuizzes)) * 100
    );
  };

  const handleReward = (reward: Reward) => {
    setCurrentReward(reward);
    setTimeout(() => setCurrentReward(null), 3000);
  };

  const completeLesson = (lesson: Lesson) => {
    const rewards = lesson.rewards?.completion || [];
    rewards.forEach(handleReward);
    
    const quizResults = Object.values(progress.quizResults);
    if (quizResults.length > 0) {
      const averageScore = quizResults.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / quizResults.length;
      
      const quizRewards = lesson.rewards?.quiz[Math.floor(averageScore * 100)] || [];
      quizRewards.forEach(handleReward);
    }
  };

  return {
    progress,
    markSectionComplete,
    saveQuizResult,
    calculateProgress,
    currentReward,
    completeLesson
  };
}; 