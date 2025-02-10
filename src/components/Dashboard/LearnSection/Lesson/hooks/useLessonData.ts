import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLesson, completeLesson } from "../../lib/api/lessons";
import { updateLessonProgress } from "../../lib/api/progress";
import { useAuth } from "../../hooks/useAuth";
import type { LessonProgress } from "../../types/lesson.types";

export const useLessonData = (lessonSlug: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState(0);

  const {
    data: lesson,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["lesson", lessonSlug],
    queryFn: () => fetchLesson(lessonSlug),
    enabled: !!lessonSlug,
    retry: false
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
      updateLessonProgress(user!.id, lessonSlug, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
    }
  });

  const handleSectionChange = (index: number) => {
    setActiveSection(index);
  };

  const handleSectionComplete = async (sectionId: string) => {
    if (!user || !lessonSlug) return;
    
    await updateProgressMutation.mutateAsync({
      completedSections: [...(lesson?.completedSections || []), sectionId],
      isCompleted: false,
      points: 0
    });
  };

  const handleQuizComplete = async (points: number) => {
    if (!user || !lessonSlug) return;

    await updateProgressMutation.mutateAsync({
      completedSections: lesson?.completedSections || [],
      isCompleted: false,
      points
    });
  };

  const handleLessonComplete = async () => {
    if (!user || !lessonSlug || !lesson) return;
    
    await completeLessonMutation.mutateAsync({
      userId: user.id,
      lessonSlug,
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