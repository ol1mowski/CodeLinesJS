import { memo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LessonProgress } from "./components/LessonProgress.component";
import { useLessonState } from "./hooks/useLessonState";
import { LessonNotFound } from "./components/LessonNotFound.component";
import { LessonLayout } from "./components/LessonLayout.component";
import { BackToLessons } from "./components/BackToLessons.component";
import { LessonSidebar } from "./components/LessonSidebar.component";
import { LessonMainContent } from "./components/LessonMainContent.component";
import { LoadingSpinner } from "../components/UI/LoadingSpinner.component";
import { ErrorMessage } from "../components/ErrorMessage.component";
import { useAuth } from "../hooks/useAuth";
import { useLesson } from "../hooks/useLesson";
import { toast } from "react-hot-toast";

export const LessonPage = memo(() => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId, token } = useAuth();  
  
  const { 
    lesson, 
    isLoading, 
    error, 
    refetch,
    isNotFound 
  } = useLesson(lessonId || '');

  const {
    activeSection,
    progress,
    handleSectionChange,
    handleComplete,
    markSectionComplete,
    saveQuizResult
  } = useLessonState(lessonId || '', userId);

  const completeLessonMutation = useMutation({
    mutationFn: async () => {
      console.log('Wysyłanie żądania zakończenia lekcji:', {
        lessonId,
        userId,
        token
      });

      const response = await fetch(`${API_URL}/lessons/${lessonId}/complete`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          completedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Błąd podczas kończenia lekcji:', errorData);
        throw new Error(errorData.message || "Nie udało się zaktualizować postępu lekcji");
      }

      const data = await response.json();
      console.log('Odpowiedź z serwera:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", lessonId] });
      toast.success('Lekcja została ukończona!', {
        duration: 3000,
        position: 'bottom-right'
      });
    },
    onError: (error: Error) => {
      console.error('Błąd podczas kończenia lekcji:', error);
      toast.error(error.message || 'Nie udało się zakończyć lekcji', {
        duration: 4000,
        position: 'bottom-right'
      });
    }
  });

  useEffect(() => {
    if (!lessonId) {
      console.error('No lesson ID provided');
      navigate('/dashboard/learn?tab=lessons');
      return;
    }
    window.scrollTo(0, 0);
  }, [lessonId, navigate]);


  if (isLoading) {
    return (
      <LessonLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </LessonLayout>
    );
  }

  if (error) {
    if (isNotFound) {
      return <LessonNotFound />;
    }

    return (
      <LessonLayout>
        <ErrorMessage 
          message="Nie udało się pobrać lekcji. Spróbuj ponownie później."
          onRetry={() => refetch()}
        />
      </LessonLayout>
    );
  }

  if (!lesson) {
    return <LessonNotFound />;
  }

  const sections = lesson.sections || [];
  const totalSections = sections.length;

  return (
    <>
      <LessonLayout>
        <BackToLessons />
        
        <div className="grid grid-cols-12 gap-8">
          <LessonSidebar
            sections={sections}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            isCompleted={lesson.isCompleted}
          />

          <LessonMainContent
            lesson={lesson}
            onSectionComplete={markSectionComplete}
            onQuizComplete={saveQuizResult}
          />
        </div>
      </LessonLayout>

      <LessonProgress
        currentSection={activeSection}
        totalSections={totalSections}
        progress={progress}
        onComplete={() => handleComplete(lesson)}
        isCompleted={lesson.isCompleted}
        isLoading={completeLessonMutation.isPending}
      />
    </>
  );
});

LessonPage.displayName = "LessonPage"; 