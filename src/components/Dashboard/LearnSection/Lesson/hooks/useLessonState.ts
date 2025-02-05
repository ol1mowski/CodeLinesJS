import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { toast } from 'react-hot-toast';
import type { Lesson } from '../../types/lesson.types';

export const useLessonState = (lessonId: string, userId: string) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  const {
    completedSections,
    totalPoints,
    markSectionComplete: updateSectionProgress,
    handleQuizComplete: updateQuizProgress,
    saveProgress
  } = useProgress(lessonId, userId);

  const handleSectionChange = useCallback((index: number) => {
    setActiveSection(index);
  }, []);

  const handleComplete = useCallback(async (lesson: Lesson) => {
    try {
      if (lesson.isCompleted) {
        toast.custom('Ta lekcja została już wcześniej ukończona', {
          duration: 3000,
          position: 'bottom-right',
        });
        navigate('/dashboard/learn?tab=lessons');
        return;
      }

      await saveProgress();
      navigate('/dashboard/learn?tab=lessons');
    } catch (error) {
      console.error('Błąd podczas zapisywania postępu:', error);
      toast.error('Nie udało się zapisać postępu. Spróbuj ponownie.', {
        duration: 4000,
        position: 'bottom-right',
      });
    }
  }, [saveProgress, navigate]);

  const markSectionComplete = useCallback((sectionIndex: number, totalSections: number) => {
    if (!completedSections.includes(sectionIndex)) {
      updateSectionProgress(sectionIndex, totalSections);
    }
  }, [completedSections, updateSectionProgress]);

  const saveQuizResult = useCallback((quizId: number, correctAnswers: number, totalQuestions: number) => {
    updateQuizProgress(quizId, correctAnswers);
  }, [updateQuizProgress]);

  const progress = {
    xpEarned: totalPoints,
    completed: completedSections.length,
    total: 0,
    percentage: 0,
    isCompleted: false,
    lastCompletedSection: Math.max(...completedSections, -1)
  };

  return {
    activeSection,
    progress,
    handleSectionChange,
    handleComplete,
    markSectionComplete,
    saveQuizResult
  };
}; 


