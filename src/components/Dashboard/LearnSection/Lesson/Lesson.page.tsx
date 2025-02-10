import { memo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLessonData } from "./hooks/useLessonData";
import { LessonLayout } from "./components/LessonLayout.component";
import { LessonContent } from "./components/LessonContent.component";
import { LessonNotFound } from "./components/LessonNotFound.component";
import { LoadingSpinner } from "../components/UI/LoadingSpinner.component";
import { ErrorMessage } from "../components/ErrorMessage.component";

export const LessonPage = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId");

  const {
    lesson,
    isLoading,
    error,
    isNotFound,
    activeSection,
    progress,
    refetch,
    handleSectionChange,
    handleSectionComplete,
    handleQuizComplete,
    handleLessonComplete,
    completeLessonMutation
  } = useLessonData(lessonId);

  useEffect(() => {
    if (!lessonId) {
      console.error('No lesson ID provided');
      navigate('/dashboard/learn?tab=lessons');
      return;
    }
    window.scrollTo(0, 0);
  }, [lessonId, navigate]);

  if (isLoading) {
    return <LessonLoadingState />;
  }

  if (error) {
    if (isNotFound) {
      return <LessonNotFound />;
    }
    return <LessonErrorState onRetry={refetch} />;
  }

  if (!lesson) {
    return <LessonNotFound />;
  }

  return (
    <LessonContent
      lesson={lesson}
      activeSection={activeSection}
      progress={progress}
      onSectionChange={handleSectionChange}
      onSectionComplete={handleSectionComplete}
      onQuizComplete={handleQuizComplete}
      onLessonComplete={handleLessonComplete}
      isCompletingLesson={completeLessonMutation.isPending}
    />
  );
});

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