import { memo } from 'react';
import { motion } from 'framer-motion';
import { type Lesson } from '../../../../../types/learning.types';
import { LessonHeader } from './LessonHeader.component';
import { LessonContent } from './LessonContent.component';

type LessonMainContentProps = {
  lesson: Lesson;
  onSectionComplete: (index: number) => void;
  onQuizComplete: (quizId: string, correct: number, total: number) => void;
};

export const LessonMainContent = memo(({ lesson, onSectionComplete, onQuizComplete }: LessonMainContentProps) => (
  <div className="col-span-12 lg:col-span-9">
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
          xp={lesson.xp}
        />
        <LessonContent 
          sections={lesson.sections}
          onSectionComplete={onSectionComplete}
          onQuizComplete={onQuizComplete}
        />
      </div>
    </motion.div>
  </div>
));

LessonMainContent.displayName = "LessonMainContent"; 