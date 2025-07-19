import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLesson, completeLesson } from '../api/lessons';
import { updateLessonProgress } from '../api/progress';
import type { LessonProgress } from '../../types/lesson.types';
import { toast } from 'react-hot-toast';
import { useLearningPaths } from '../../LearningPaths/hooks/useLearningPaths.hook';
import { useAuth } from '../../../../Auth/hooks/useAuth.hook';

export const useLessonData = (lessonSlug: string) => {
  const { user, isAuthenticated, isAuthChecking } = useAuth();
  const queryClient = useQueryClient();
  const { refetch: refetchLearningPaths } = useLearningPaths();
  const [activeSection, setActiveSection] = useState(0);

  const {
    data: lesson,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['lesson', lessonSlug],
    queryFn: () => fetchLesson(lessonSlug),
    enabled: !!lessonSlug && isAuthenticated && !isAuthChecking,
    retry: false,
  });

  const isDataLoading = isLoading || (!lesson && !error);

  const isNotFound = error?.message === 'lesson_not_found';

  const completeLessonMutation = useMutation({
    mutationFn: completeLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonSlug] });
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
      refetchLearningPaths();
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: (progress: LessonProgress) =>
      updateLessonProgress(user?.id!, lessonSlug, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
    },
  });

  const handleSectionChange = (index: number) => {
    setActiveSection(index);
  };

  const handleSectionComplete = async (sectionId: string) => {
    if (!user?.id || !lessonSlug) return;

    await updateProgressMutation.mutateAsync({
      completedSections: [...(lesson?.completedSections || []), sectionId],
      isCompleted: false,
      points: 0,
    });
  };

  const handleQuizComplete = async (points: number) => {
    if (!user?.id || !lessonSlug) return;

    await updateProgressMutation.mutateAsync({
      completedSections: lesson?.completedSections || [],
      isCompleted: false,
      points,
    });
  };

  const handleLessonComplete = async () => {
    if (!lessonSlug || !lesson) {
      console.error('Brak wymaganych danych:', { lessonSlug, lesson });
      return Promise.reject(new Error('Brak wymaganych danych'));
    }

    try {
      const result = await completeLessonMutation.mutateAsync({
        lessonId: lesson.id,
        pathId: lesson.pathId,
      });

      queryClient.setQueryData(['lesson', lessonSlug], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            isCompleted: true,
            progress: {
              ...oldData.progress,
              isCompleted: true,
            }
          };
        }
        return oldData;
      });
      
      queryClient.setQueryData(['lessons'], (oldData: any) => {
        if (oldData?.lessons?.javascript) {
          const updatedLessons = oldData.lessons.javascript.map((l: any) => 
            l.id === lesson.id ? { ...l, isCompleted: true } : l
          );
          
          return {
            ...oldData,
            lessons: {
              ...oldData.lessons,
              javascript: updatedLessons
            },
            stats: {
              ...oldData.stats,
              completed: (oldData.stats.completed || 0) + 1,
              progress: oldData.stats.total ? Math.round(((oldData.stats.completed + 1) / oldData.stats.total) * 100) : 0
            }
          };
        }
        return oldData;
      });

      await refetch();
      await refetchLearningPaths();

      toast.success('Lekcja ukończona!', {
        duration: 3000,
        position: 'bottom-right',
      });

      return result;
    } catch (error) {
      console.error('Błąd podczas kończenia lekcji:', error);
      toast.error('Nie udało się ukończyć lekcji. Spróbuj ponownie.', {
        duration: 4000,
        position: 'bottom-right',
      });
      throw error;
    }
  };

  return {
    lesson,
    isLoading: isDataLoading,
    error,
    isNotFound,
    activeSection,
    progress: lesson?.progress,
    refetch,
    handleSectionChange,
    handleSectionComplete,
    handleQuizComplete,
    handleLessonComplete,
    completeLessonMutation,
  };
};
