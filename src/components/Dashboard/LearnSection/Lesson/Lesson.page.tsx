import { memo, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation, useParams, Navigate } from "react-router-dom";
import { useLessonData } from "./hooks/useLessonData";
import { useLessonState } from "./hooks/useLessonState";
import { LessonLayout } from "./components/LessonLayout.component";
import { LessonContent } from "./components/LessonContent.component";
import { LessonNotFound } from "./components/LessonNotFound.component";
import { LoadingSpinner } from "../components/UI/LoadingSpinner.component";
import { ErrorMessage } from "../components/ErrorMessage.component";

export const LessonPage = () => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  
  if (!lessonSlug) {
    return <Navigate to="/dashboard/learn" replace />;
  }

  const {
    lesson,
    isLoading,
    error,
    isNotFound,
    activeSection,
    progress,
    handleSectionChange,
    handleSectionComplete,
    handleQuizComplete,
    handleLessonComplete
  } = useLessonData(lessonSlug);

  const {
    progress: lessonProgress,
    handleComplete,
    markSectionComplete,
    saveQuizResult
  } = useLessonState(lessonSlug, lesson?.userId || '');

  if (isLoading) {
    return <LessonLoadingState />;
  }

  if (isNotFound) {
    return <LessonNotFound />;
  }

  if (error) {
    return <LessonErrorState onRetry={() => window.location.reload()} />;
  }

  if (!lesson || !lesson.sections) {
    return <LessonNotFound />;
  }

  return (
    <LessonLayout>
      <LessonContent
        lesson={lesson}
        activeSection={activeSection}
        progress={progress || 0}
        onSectionChange={handleSectionChange}
        onSectionComplete={handleSectionComplete}
        onQuizComplete={handleQuizComplete}
        onLessonComplete={handleLessonComplete}
      />
    </LessonLayout>
  );
};

const LessonLoadingState = () => (
  <LessonLayout>
    <div className="flex justify-center items-center min-h-[60vh]">
      <LoadingSpinner />
    </div>
  </LessonLayout>
);

const LessonErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <LessonLayout>
    <ErrorMessage 
      message="Nie udało się pobrać lekcji. Spróbuj ponownie później."
      onRetry={onRetry}
    />
  </LessonLayout>
);

LessonPage.displayName = "LessonPage"; 