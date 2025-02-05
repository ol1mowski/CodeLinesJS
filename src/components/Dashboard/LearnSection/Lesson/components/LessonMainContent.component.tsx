import { memo } from 'react';
import { motion } from 'framer-motion';
import { type Lesson } from '../../types/lesson.types';

import { LessonHeader } from './LessonHeader.component';
import { LessonContent } from './LessonContent.component';

type LessonMainContentProps = {
  lesson: Lesson;
  onSectionComplete?: (sectionIndex: number) => void;
  onQuizComplete?: (quizId: string, correct: number, total: number) => void;
};

export const LessonMainContent = memo(({ 
  lesson, 
  onSectionComplete = () => {}, 
  onQuizComplete = () => {} 
}: LessonMainContentProps) => {
  const sections = lesson.content?.sections || [];

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
            xp={lesson.content?.xp}
          />
          
          <LessonContent 
            sections={sections}
            onSectionComplete={onSectionComplete}
            onQuizComplete={onQuizComplete}
          />
        </div>
      </motion.div>
    </div>
  );
});

LessonMainContent.displayName = "LessonMainContent"; 