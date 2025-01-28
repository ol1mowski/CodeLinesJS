import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { lessons } from "../mocks/lessons.data";
import { LessonProgress } from "./components/LessonProgress.component";
import { useLessonState } from "./hooks/useLessonState";
import { LessonNotFound } from "./components/LessonNotFound.component";
import { LessonLayout } from "./components/LessonLayout.component";
import { BackToLessons } from "./components/BackToLessons.component";
import { LessonSidebar } from "./components/LessonSidebar.component";
import { LessonMainContent } from "./components/LessonMainContent.component";


export const LessonPage = memo(() => {
  const { id } = useParams();
  const userId = "current-user";
  const lesson = lessons.find(l => l.id === id);

  const {
    activeSection,
    progress,
    handleSectionChange,
    handleComplete,
    markSectionComplete,
    saveQuizResult
  } = useLessonState(id!, userId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!lesson) {
    return <LessonNotFound />;
  }

  return (
    <>
      <LessonLayout>
        <BackToLessons />
        
        <div className="grid grid-cols-12 gap-8">
          <LessonSidebar
            sections={lesson.sections}
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
        totalSections={lesson.sections.length}
        progress={progress}
        onComplete={() => handleComplete(lesson)}
      />
    </>
  );
});

LessonPage.displayName = "LessonPage"; 