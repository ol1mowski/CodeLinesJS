import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLesson } from '../../hooks/useLesson';
import { type Lesson } from '../../types/lesson.types';


export const useLessonState = (lessonId: string, userId: string) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [progress, setProgress] = useState({
    xpEarned: 0,
    completed: 0,
    total: 100,
    percentage: 0,
    isCompleted: false,
    lastCompletedSection: -1
  });

  const {
    markSectionComplete,
    saveQuizResult,
    calculateProgress,
    completeLesson
  } = useLesson(lessonId, userId);

  const handleSectionChange = useCallback((sectionIndex: number) => {
    setActiveSection(sectionIndex);
    const element = document.getElementById(`section-${sectionIndex}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSectionComplete = useCallback((sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections(prev => [...prev, sectionIndex]);
      setProgress(prev => ({
        ...prev,
        completed: prev.completed + 1,
        percentage: Math.min(((prev.completed + 1) / prev.total) * 100, 100),
        lastCompletedSection: sectionIndex
      }));
    }
  }, [completedSections]);

  const handleQuizComplete = useCallback((quizId: string, correct: number, total: number) => {
    const earnedXP = Math.round((correct / total) * 100);
    setProgress(prev => ({
      ...prev,
      xpEarned: prev.xpEarned + earnedXP
    }));
  }, []);

  const handleComplete = useCallback(() => {
    // Tutaj możesz dodać wywołanie API do zapisania postępu
    navigate('/dashboard/learn');
  }, [navigate]);

  return {
    activeSection,
    progress,
    handleSectionChange,
    handleComplete,
    markSectionComplete: handleSectionComplete,
    saveQuizResult: handleQuizComplete
  };
}; 