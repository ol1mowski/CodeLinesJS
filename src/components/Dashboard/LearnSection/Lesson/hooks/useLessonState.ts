import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLesson } from '../../hooks/useLesson';
import { type Lesson } from '../../types/lesson.types';


export const useLessonState = (lessonId: string, userId: string) => {
  const [activeSection, setActiveSection] = useState(0);
  const navigate = useNavigate();
  
  const {
    progress,
    markSectionComplete,
    saveQuizResult,
    calculateProgress,
    completeLesson
  } = useLesson(lessonId, userId);

  const handleSectionChange = (index: number) => {
    setActiveSection(index);
    const element = document.getElementById(`section-${index}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleComplete = (lesson: Lesson) => {
    const totalProgress = calculateProgress(lesson);
    if (totalProgress === 100) {
      completeLesson(lesson);
      navigate('/dashboard/learn');
    }
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