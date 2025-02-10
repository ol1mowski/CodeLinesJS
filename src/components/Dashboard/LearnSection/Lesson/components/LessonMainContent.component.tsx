import { memo } from 'react';
import { motion } from 'framer-motion';
import { type Lesson } from '../../types/lesson.types';
import { CodeExample } from "./code/CodeExample.component";

import { LessonHeader } from './LessonHeader.component';;
import { LessonSection } from './LessonSection.component';
import { LessonQuiz } from './LessonQuiz.component';

type LessonMainContentProps = {
  lesson: Lesson;
  onSectionComplete: (sectionId: string) => void;
  onQuizComplete: (points: number) => void;
};

export const LessonMainContent = memo(({
  lesson,
  onSectionComplete,
  onQuizComplete
}: LessonMainContentProps) => {
  if (!lesson) {
    return null;
  }

  const { sections = [] } = lesson.content;  

  console.log(lesson);
  

  return (
    <div className="col-span-9 lesson-content overflow-y-auto max-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800/50 border border-js/10 rounded-xl p-6 md:p-8"
      >
        <div className="space-y-8">
          <LessonHeader
            title={lesson.title}
            duration={lesson.duration}
            difficulty={lesson.difficulty}
            xp={lesson.points}
          />

          <div className="space-y-8">
            {sections.map((section, index) => (
              <LessonSection
                key={index}
                section={section}
                index={index}
              />
            ))}

            {lesson.content.quiz && (
              <LessonQuiz
                questions={lesson.content.quiz}
                onComplete={onQuizComplete}
              />
            )}

          </div>
        </div>
      </motion.div>
    </div>
  );
});

LessonMainContent.displayName = "LessonMainContent"; 