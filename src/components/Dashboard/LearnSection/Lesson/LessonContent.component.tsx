import { memo } from "react";
import { motion } from "framer-motion";
import { CodeBlock } from "../UI/CodeBlock/CodeBlock.component";
import { LessonQuiz } from "./LessonQuiz.component";
import type { LessonSection } from "../types/lesson.types";
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface LessonContentProps {
  sections: LessonSection[];
  onSectionComplete: (index: number) => void;
  onQuizComplete: (quizId: string, correct: number, total: number) => void;
}

export const LessonContent = memo(({ sections, onSectionComplete, onQuizComplete }: LessonContentProps) => {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => {
        const { ref, inView } = useInView({
          threshold: 0.5,
          triggerOnce: true
        });

        useEffect(() => {
          if (inView) {
            onSectionComplete(index);
          }
        }, [inView, index]);

        return (
          <motion.div
            ref={ref}
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-6"
            id={`section-${index}`}
          >
            <h2 className="text-2xl font-bold text-js">
              {section.title}
            </h2>
            
            <div className="prose prose-invert prose-js max-w-none">
              {section.content}
            </div>

            {section.examples?.map((example, exIndex) => (
              <div key={exIndex} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-200">
                  Przykład {exIndex + 1}:
                </h3>
                <CodeBlock
                  code={example.code}
                  language={example.language || "javascript"}
                  showLineNumbers
                  className="rounded-lg border border-js/10"
                />
                {example.explanation && (
                  <p className="text-gray-400 text-sm">
                    {example.explanation}
                  </p>
                )}
              </div>
            ))}

            {section.quiz && (
              <div className="mt-8">
                <LessonQuiz
                  questions={section.quiz}
                  onComplete={(correct) => {
                    onQuizComplete(section.quiz![0].id, correct, section.quiz!.length);
                  }}
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
});

LessonContent.displayName = "LessonContent"; 