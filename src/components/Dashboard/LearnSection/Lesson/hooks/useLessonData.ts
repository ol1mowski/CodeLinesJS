import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLesson, completeLesson } from "../../lib/api/lessons";
import { updateLessonProgress } from "../../lib/api/progress";
import { useAuth } from "../../hooks/useAuth";
import type { LessonProgress } from "../../types/lesson.types";

export const useLessonData = (lessonId: string | null) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState(0);

  const {
    data: lesson,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => fetchLesson(lessonId!),
    enabled: !!lessonId,
  });

  const isNotFound = error?.message === "lesson_not_found";

  const completeLessonMutation = useMutation({
    mutationFn: completeLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    }
  });

  const updateProgressMutation = useMutation({
    mutationFn: (progress: LessonProgress) => 
      updateLessonProgress(user!.id, lessonId!, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    }
  });

  const handleSectionChange = (index: number) => {
    setActiveSection(index);
  };

  const handleSectionComplete = async (sectionId: string) => {
    if (!user || !lessonId) return;
    
    await updateProgressMutation.mutateAsync({
      completedSections: [...(lesson?.completedSections || []), sectionId],
      isCompleted: false,
      points: 0
    });
  };

  const handleQuizComplete = async (points: number) => {
    if (!user || !lessonId) return;

    await updateProgressMutation.mutateAsync({
      completedSections: lesson?.completedSections || [],
      isCompleted: false,
      points
    });
  };

  const handleLessonComplete = async () => {
    if (!user || !lessonId || !lesson) return;
    
    await completeLessonMutation.mutateAsync({
      userId: user.id,
      lessonId,
      pathId: lesson.pathId
    });
  };

  return {
    lesson,
    isLoading,
    error,
    isNotFound,
    activeSection,
    progress: lesson?.progress,
    refetch,
    handleSectionChange,
    handleSectionComplete,
    handleQuizComplete,
    handleLessonComplete,
    completeLessonMutation
  };
}; 