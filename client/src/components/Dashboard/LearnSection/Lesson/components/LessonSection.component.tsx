import { memo } from 'react';
import { type LessonSection as LessonSectionType } from '../../types/lesson.types';
import { CodeExample } from './code/CodeExample.component';

type LessonSectionProps = {
  section: LessonSectionType;
  index: number;
};

export const LessonSection = memo(({ section, index }: LessonSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-js">
        {index + 1}. {section.title}
      </h2>
      <div className="prose prose-invert max-w-none">{section.content}</div>
      <div className="space-y-8 mt-8">
        {section.examples && section.examples.length > 0 && (
          <div className="space-y-8 mt-8">
            {section.examples.map((example, index) => (
              <CodeExample key={index} example={example} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

LessonSection.displayName = 'LessonSection';
