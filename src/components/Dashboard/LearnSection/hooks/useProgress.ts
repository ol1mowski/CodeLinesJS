import { useState, useCallback } from 'react';
import { useUserProgress } from './useUserProgress';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export const useProgress = (lessonId: string, userId: string) => {
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const { updateProgress: updateUserProgress } = useUserProgress(userId);
  const queryClient = useQueryClient();

  const markSectionComplete = useCallback(async (sectionIndex: number, totalSections: number) => {
    const lessonData = queryClient.getQueryData<any>(['lesson', lessonId]);
    
    if (lessonData?.isCompleted) {
      return;
    }

    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections(prev => [...prev, sectionIndex]);
      
      const pointsPerSection = 50;
      setTotalPoints(prev => prev + pointsPerSection);

      const result = await updateUserProgress({
        lessonId,
        points: pointsPerSection,
        isCompleted: false
      });

      if (result === null) {
        return;
      }

      if (completedSections.length + 1 === totalSections) {
        const bonusPoints = 100;
        setTotalPoints(prev => prev + bonusPoints);
        
        await updateUserProgress({
          lessonId,
          points: bonusPoints,
          isCompleted: true
        });

        toast.success('Gratulacje! Ukończyłeś całą lekcję!', {
          duration: 4000,
          position: 'bottom-right',
        });
      }
    }
  }, [completedSections, lessonId, updateUserProgress, queryClient]);

  const handleQuizComplete = useCallback(async (
    correctAnswers: number, 
    totalQuestions: number
  ) => {
    const lessonData = queryClient.getQueryData<any>(['lesson', lessonId]);
    
    if (lessonData?.isCompleted) {
      return;
    }

    const quizPoints = Math.round((correctAnswers / totalQuestions) * 100);
    setTotalPoints(prev => prev + quizPoints);

    const result = await updateUserProgress({
      lessonId,
      points: quizPoints,
      isCompleted: false
    });

    if (result === null) {
      return;
    }

    toast.success(`Zdobyłeś ${quizPoints} punktów za quiz!`, {
      duration: 3000,
      position: 'bottom-right',
    });
  }, [lessonId, updateUserProgress, queryClient]);

  const saveProgress = useCallback(async () => {
    try {
      console.log('Zapisywanie postępu lekcji:', {
        lessonId,
        userId,
        completedSections,
        totalPoints
      });

      const result = await updateUserProgress({
        lessonId,
        points: totalPoints,
        isCompleted: true,
        completedSections: completedSections
      });

      console.log('Wynik zapisywania postępu:', result);

      if (result) {
        toast.success('Postęp został zapisany!', {
          duration: 3000,
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania postępu:', error);
      toast.error('Nie udało się zapisać postępu. Spróbuj ponownie.', {
        duration: 4000,
        position: 'bottom-right',
      });
    }
  }, [lessonId, userId, completedSections, totalPoints, updateUserProgress]);

  return {
    completedSections,
    totalPoints,
    markSectionComplete,
    handleQuizComplete,
    saveProgress
  };
}; 