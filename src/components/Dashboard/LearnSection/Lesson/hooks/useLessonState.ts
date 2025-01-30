import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import type { Lesson } from '../../types/lesson.types';

export const useLessonState = (lessonId: string, lesson?: Lesson) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  const {
    completedSections,
    totalPoints,
    markSectionComplete,
    handleQuizComplete,
    saveProgress
  } = useProgress(lessonId);

  const handleSectionChange = useCallback((index: number) => {
    setActiveSection(index);
  }, []);

  const handleSectionComplete = useCallback((sectionIndex: number) => {
    if (lesson?.sections) {
      markSectionComplete(sectionIndex, lesson.sections.length);
    }
  }, [markSectionComplete, lesson?.sections?.length]);

  const handleQuizFinish = useCallback((correctAnswers: number, totalQuestions: number) => {
    handleQuizComplete(correctAnswers, totalQuestions);
  }, [handleQuizComplete]);

  const handleComplete = useCallback(async () => {
    try {
      await saveProgress();
      navigate('/dashboard/learn');
    } catch (error) {
      console.error('Błąd podczas zapisywania postępu:', error);
    }
  }, [saveProgress, navigate]);

  const progress = {
    xpEarned: totalPoints,
    completed: completedSections.length,
    total: lesson?.sections?.length ?? 0,
    percentage: lesson?.sections
      ? Math.round((completedSections.length / lesson.sections.length) * 100)
      : 0,
    isCompleted: lesson?.sections
      ? completedSections.length === lesson.sections.length
      : false,
    lastCompletedSection: Math.max(...completedSections, -1)
  };

  return {
    activeSection,
    progress,
    handleSectionChange,
    handleComplete,
    markSectionComplete: handleSectionComplete,
    saveQuizResult: handleQuizFinish
  };
}; 