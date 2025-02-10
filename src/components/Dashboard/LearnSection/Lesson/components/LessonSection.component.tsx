import { memo } from 'react';
import { type LessonSection as LessonSectionType } from '../../types/lesson.types';

type LessonSectionProps = {
  section: LessonSectionType;
  index: number;
  onComplete: () => void;
};

export const LessonSection = memo(({ section, index, onComplete }: LessonSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-js">
        {index + 1}. {section.title}
      </h2>
      <div className="prose prose-invert max-w-none">
        {section.content}
      </div>
      <button 
        onClick={onComplete}
        className="px-4 py-2 bg-js/10 text-js rounded-lg hover:bg-js/20 transition-colors"
      >
        Zakończ sekcję
      </button>
    </section>
  );
});

LessonSection.displayName = "LessonSection"; 