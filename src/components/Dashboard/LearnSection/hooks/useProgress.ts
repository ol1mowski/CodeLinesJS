import { useState, useCallback } from 'react';
import { useUserProgress } from './useUserProgress';
import { useXPProgress } from './useXPProgress';
import { toast } from 'react-hot-toast';

export const useProgress = (lessonId: string) => {
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const { updateProgress: updateUserProgress } = useUserProgress();
  const { addXP, saveProgress: saveXP } = useXPProgress(lessonId);

  const markSectionComplete = useCallback((sectionIndex: number, totalSections: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections(prev => [...prev, sectionIndex]);
      
      // Każda sekcja jest warta 50 punktów
      const pointsPerSection = 50;
      setTotalPoints(prev => prev + pointsPerSection);

      // Zapisz postęp po każdej ukończonej sekcji
      updateUserProgress({
        lessonId,
        points: pointsPerSection
      });

      if (completedSections.length + 1 === totalSections) {
        // Bonus za ukończenie całej lekcji (100 punktów)
        const bonusPoints = 100;
        setTotalPoints(prev => prev + bonusPoints);
        
        updateUserProgress({
          lessonId,
          points: bonusPoints
        });

        toast.success('Gratulacje! Ukończyłeś całą lekcję!', {
          duration: 4000,
          position: 'bottom-right',
        });
      }
    }
  }, [completedSections, lessonId, updateUserProgress]);

  const handleQuizComplete = useCallback(async (
    correctAnswers: number, 
    totalQuestions: number
  ) => {
    // Quiz points based on performance (max 100 points)
    const quizPoints = Math.round((correctAnswers / totalQuestions) * 100);
    setTotalPoints(prev => prev + quizPoints);

    await updateUserProgress({
      lessonId,
      points: quizPoints
    });

    toast.success(`Zdobyłeś ${quizPoints} punktów za quiz!`, {
      duration: 3000,
      position: 'bottom-right',
    });
  }, [lessonId, updateUserProgress]);

  const saveProgress = useCallback(async () => {
    try {
      await saveXP();

      toast.success('Postęp został zapisany!', {
        duration: 3000,
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Błąd podczas zapisywania postępu:', error);
      toast.error('Nie udało się zapisać postępu. Spróbuj ponownie.', {
        duration: 4000,
        position: 'bottom-right',
      });
    }
  }, [saveXP]);

  return {
    completedSections,
    totalPoints,
    markSectionComplete,
    handleQuizComplete,
    saveProgress
  };
}; 