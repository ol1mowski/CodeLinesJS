import { memo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export const LessonPage = memo(() => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { userId } = useAuth();  
  
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

  useEffect(() => {
    if (!lessonId) {
      console.error('No lesson ID provided');
      navigate('/dashboard/learn?tab=lessons');
      return;
    }
    console.log('Loading lesson:', lessonId);
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
      />
    </>
  );
});

LessonPage.displayName = "LessonPage"; 