import { useUserProgress } from './useUserProgress';
import { useState } from 'react';
import type { Lesson, Reward } from '../types/lesson.types';

export const useLesson = (lessonId: string, userId: string) => {
  const { progress: userProgress, updateProgress } = useUserProgress(userId);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  const lessonProgress = userProgress[lessonId] || {
    lessonId,
    completedSections: [],
    quizResults: {},
    xpEarned: 0,
    isCompleted: false,
    lastAccessedAt: new Date().toISOString()
  };

  const markSectionComplete = (sectionIndex: number) => {
    if (!lessonProgress.completedSections.includes(sectionIndex)) {
      updateProgress({
        ...lessonProgress,
        lessonId,
        completedSections: [...lessonProgress.completedSections, sectionIndex],
        xpEarned: lessonProgress.xpEarned + 5,
        lastAccessedAt: new Date().toISOString()
      });
    }
  };

  const saveQuizResult = (quizId: string, correct: number, total: number) => {
    const quizXP = Math.round(20 * (correct / total));
    
    updateProgress({
      ...lessonProgress,
      lessonId,
      quizResults: {
        ...lessonProgress.quizResults,
        [quizId]: {
          completed: true,
          correctAnswers: correct,
          totalQuestions: total,
          completedAt: new Date().toISOString()
        }
      },
      xpEarned: lessonProgress.xpEarned + quizXP,
      lastAccessedAt: new Date().toISOString()
    });
  };

  const calculateProgress = (lesson: Lesson) => {
    const totalSections = lesson.sections.length;
    const completedSections = lessonProgress.completedSections.length;
    const quizzes = lesson.sections.filter(s => s.quiz).length;
    const completedQuizzes = Object.keys(lessonProgress.quizResults).length;

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
    
    const quizResults = Object.values(lessonProgress.quizResults);
    if (quizResults.length > 0) {
      const averageScore = quizResults.reduce((acc, curr) => 
        acc + (curr.correctAnswers / curr.totalQuestions), 0) / quizResults.length;
      
      const quizRewards = lesson.rewards?.quiz[Math.floor(averageScore * 100)] || [];
      quizRewards.forEach(handleReward);
    }
  };

  return {
    progress: lessonProgress,
    markSectionComplete,
    saveQuizResult,
    calculateProgress,
    currentReward,
    completeLesson
  };
}; 