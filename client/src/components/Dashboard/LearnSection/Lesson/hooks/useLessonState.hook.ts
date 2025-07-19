import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateLessonProgress } from '../api/progress';
import { toast } from 'react-hot-toast';
import type { Lesson, LessonProgress } from '../../types/lesson.types';

export const useLessonState = (lessonId: string, userId: string) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);



  const handleSectionChange = useCallback((index: number) => {
    setActiveSection(index);
  }, []);

  const saveProgress = useCallback(async () => {
    const progressData: LessonProgress = {
      completedSections: completedSections.map(String),
      isCompleted: true,
      points: totalPoints,
    };

    await updateLessonProgress(userId, lessonId, progressData);
  }, [userId, lessonId, completedSections, totalPoints]);

  const updateSectionProgress = useCallback((sectionIndex: number, _totalSections: number) => {
    setCompletedSections(prev => [...new Set([...prev, sectionIndex])]);
    setTotalPoints(prev => prev + 10);
  }, []);

  const updateQuizProgress = useCallback((_quizId: number, correctAnswers: number) => {
    setTotalPoints(prev => prev + correctAnswers * 5);
  }, []);

  const handleComplete = useCallback(
    async (lesson: Lesson) => {
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
    },
    [saveProgress, navigate]
  );

  const markSectionComplete = useCallback(
    (sectionIndex: number, totalSections: number) => {
      if (!completedSections.includes(sectionIndex)) {
        updateSectionProgress(sectionIndex, totalSections);
      }
    },
    [completedSections, updateSectionProgress]
  );

  const saveQuizResult = useCallback(
    (quizId: number, correctAnswers: number) => {
      updateQuizProgress(quizId, correctAnswers);
    },
    [updateQuizProgress]
  );

  const progressData = {
    xpEarned: totalPoints,
    completed: completedSections.length,
    total: 0,
    percentage: 0,
    isCompleted: false,
    lastCompletedSection: Math.max(...completedSections, -1),
  };

  return {
    activeSection,
    progress: progressData,
    handleSectionChange,
    handleComplete,
    markSectionComplete,
    saveQuizResult,
  };
};
