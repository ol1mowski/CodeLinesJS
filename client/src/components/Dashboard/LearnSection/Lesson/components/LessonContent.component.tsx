import { memo } from "react";
import { BackToLessons } from "./BackToLessons.component";
import { LessonLayout } from "./LessonLayout.component";
import { LessonMainContent } from "./LessonMainContent.component";
import { LessonProgress } from "./LessonProgress.component";
import type { Lesson } from "../../types/lesson.types";

type LessonContentProps = {
  lesson: Lesson;
  activeSection: number;
  progress: number;
  onSectionComplete: (sectionId: string) => void;
  onQuizComplete: (points: number) => void;
  onLessonComplete: () => Promise<void>;
};

export const LessonContent = memo(
  ({
    lesson,
    activeSection,
    progress,
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

          <div className="w-full flex items-center justify-center">
            <LessonMainContent
              lesson={lesson}
              onSectionComplete={onSectionComplete}
              onQuizComplete={onQuizComplete}
            />
          </div>

          <LessonProgress
            currentSection={activeSection}
            totalSections={totalSections}
            progress={progress}
            isCompleted={lesson.isCompleted || false}
            onComplete={onLessonComplete}
          />
        </LessonLayout>
      </>
    );
  }
);

LessonContent.displayName = "LessonContent";
