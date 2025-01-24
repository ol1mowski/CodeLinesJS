import { useState, useEffect } from 'react';
import type { Lesson, LessonProgress, Reward } from '../types/lesson.types';

const PROGRESS_KEY = 'user-lessons-progress';

export const useLesson = (lessonId: string) => {
  const [progress, setProgress] = useState<LessonProgress>(() => {
    const savedProgress = localStorage.getItem(PROGRESS_KEY);
    const allProgress = savedProgress ? JSON.parse(savedProgress) : {};
    
    return allProgress[lessonId] || {
      completedSections: [],
      quizResults: {},
      xpEarned: 0,
      isCompleted: false,
      lastAccessedAt: new Date().toISOString()
    };
  });

  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(PROGRESS_KEY);
    const allProgress = savedProgress ? JSON.parse(savedProgress) : {};
    
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      ...allProgress,
      [lessonId]: {
        ...progress,
        lastAccessedAt: new Date().toISOString()
      }
    }));
  }, [progress, lessonId]);

  const markSectionComplete = (sectionIndex: number) => {
    if (!progress.completedSections.includes(sectionIndex)) {
      setProgress(prev => ({
        ...prev,
        completedSections: [...prev.completedSections, sectionIndex],
        xpEarned: prev.xpEarned + 5
      }));
    }
  };

  const saveQuizResult = (quizId: string, correct: number, total: number) => {
    const quizXP = Math.round(20 * (correct / total));
    
    setProgress(prev => ({
      ...prev,
      quizResults: {
        ...prev.quizResults,
        [quizId]: {
          completed: true,
          correctAnswers: correct,
          totalQuestions: total,
          completedAt: new Date().toISOString()
        }
      },
      xpEarned: prev.xpEarned + quizXP
    }));
  };

  const calculateProgress = (lesson: Lesson) => {
    const totalSections = lesson.sections.length;
    const completedSections = progress.completedSections.length;
    const quizzes = lesson.sections.filter(s => s.quiz).length;
    const completedQuizzes = Object.keys(progress.quizResults).length;

    return Math.round(
      ((completedSections + completedQuizzes) / (totalSections + quizzes)) * 100
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