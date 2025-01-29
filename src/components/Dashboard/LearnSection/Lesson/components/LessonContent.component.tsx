import { memo, useEffect } from 'react';
import { type LessonSection } from '../../types/lesson.types';
import { CodeExample } from './code/CodeExample.component';
import { LessonQuiz } from './LessonQuiz.component';
import { SectionLayout } from './common/SectionLayout.component';
import { marked } from 'marked';

type LessonContentProps = {
  sections?: LessonSection[];
  onSectionComplete: (sectionIndex: number) => void;
  onQuizComplete: (quizId: string, correct: number, total: number) => void;
}

export const LessonContent = memo(({ 
  sections = [], 
  onSectionComplete, 
  onQuizComplete 
}: LessonContentProps) => {
  useEffect(() => {
    if (sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = Number(entry.target.id.split('-')[1]);
            onSectionComplete(sectionIndex);
          }
        });
      }, { threshold: 0.5 });

      sections.forEach((_, index) => {
        const element = document.getElementById(`section-${index}`);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    }
  }, [sections, onSectionComplete]);

  if (!sections || sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-bold text-js mb-2">
          Brak zawartości lekcji
        </h3>
        <p className="text-gray-400 text-sm">
          Ta lekcja nie posiada jeszcze żadnej zawartości.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <SectionLayout key={index} id={`section-${index}`} index={index}>
          <h2 className="text-2xl font-bold text-js mb-6">
            {section.title}
          </h2>
          
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(section.content) }} 
          />

          {section.examples?.map((example, exampleIndex) => (
            <CodeExample 
              key={exampleIndex}
              example={example}
              index={exampleIndex}
            />
          ))}

          {section.quiz && (
            <LessonQuiz
              questions={section.quiz}
              onComplete={(correct, total) => 
                onQuizComplete(`quiz-${index}`, correct, total)
              }
            />
          )}
        </SectionLayout>
      ))}
    </div>
  );
});

LessonContent.displayName = "LessonContent"; 