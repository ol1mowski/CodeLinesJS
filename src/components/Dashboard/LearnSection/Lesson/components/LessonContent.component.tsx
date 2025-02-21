import { memo } from "react";
import { BackToLessons } from "./BackToLessons.component";
import { LessonLayout } from "./LessonLayout.component";
import { LessonSidebar } from "./LessonSidebar.component";
import { LessonMainContent } from "./LessonMainContent.component";
import { LessonProgress } from "./LessonProgress.component";
import type { Lesson } from "../../types/lesson.types";

type LessonContentProps = {
  lesson: Lesson;
  activeSection: number;
  progress: number;
  onSectionChange: (index: number) => void;
  onSectionComplete: (sectionId: string) => void;
  onQuizComplete: (points: number) => void;
  onLessonComplete: () => void;
};

export const LessonContent = memo(({
  lesson,
  activeSection,
  progress,
  onSectionChange,
  onSectionComplete,
  onQuizComplete,
  onLessonComplete,
}: LessonContentProps) => {
  if (!lesson) {
    return null;
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
            onSectionChange={onSectionChange}
            isCompleted={lesson.isCompleted}
          />

          <LessonMainContent
            lesson={lesson}
            onSectionComplete={onSectionComplete}
            onQuizComplete={onQuizComplete}
          />
        </div>
      </LessonLayout>

      <LessonProgress
        currentSection={activeSection}
        totalSections={totalSections}
        progress={progress}
        isCompleted={lesson.isCompleted}
        onComplete={onLessonComplete}
      />
    </>
  );
});

LessonContent.displayName = "LessonContent"; 