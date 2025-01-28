import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchLessonProgress, updateLessonProgress } from '../lib/api/progress';
import { useState } from 'react';
import type { Lesson, LessonProgress, Reward } from '../types/lesson.types';

export const useLesson = (lessonId: string, userId: string) => {
  const { data: progress, isLoading } = useQuery({
    queryKey: ['lessonProgress', userId, lessonId],
    queryFn: () => fetchLessonProgress(userId, lessonId)
  });

  const { mutate: updateProgress } = useMutation({
    mutationFn: (newProgress: LessonProgress) => 
      updateLessonProgress(userId, lessonId, newProgress)
  });

  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  const lessonProgress = progress?.data || {
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