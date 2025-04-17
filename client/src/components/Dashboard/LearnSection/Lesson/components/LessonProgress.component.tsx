import { memo, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type LessonProgressProps = {
  currentSection: number;
  totalSections: number;
  progress: number;
  isCompleted: boolean;
  onComplete: () => Promise<void>;
};

export const LessonProgress = memo(({ isCompleted, onComplete }: LessonProgressProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const motionValue = useMotionValue(0);

  const navigate = useNavigate();

  useEffect(() => {
    const lessonContent = document.querySelector('.lesson-content');
    if (!lessonContent) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = lessonContent;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      motionValue.set(Math.min(progress, 100));
    };

    lessonContent.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => lessonContent.removeEventListener('scroll', handleScroll);
  }, [motionValue]);

  const isLessonCompleted = scrollProgress >= 98 && !isCompleted;

  const handleComplete = async () => {
    if (!isLessonCompleted || isSubmitting) {
      console.log('Nie można ukończyć lekcji:', { isLessonCompleted, isSubmitting });
      return;
    }

    try {
      setIsSubmitting(true);
      await onComplete();
      navigate('/dashboard/learn?tab=lessons');
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-5 fixed bottom-0 left-0 right-0 bg-dark-800/95 border-t border-js/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-1 mr-8">
          <div className="relative h-2 bg-dark rounded-full overflow-hidden">
            <motion.div
              style={{ width: `${scrollProgress}%` }}
              className="absolute inset-y-0 left-0 bg-js rounded-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>{Math.round(scrollProgress)}% przeczytane</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleComplete}
          disabled={!isLessonCompleted || isSubmitting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${
              isLessonCompleted && !isSubmitting
                ? 'bg-js/10 text-js hover:bg-js/20'
                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
            }`}
        >
          <FaCheck className="w-4 h-4" />
          {isSubmitting
            ? 'Zapisywanie...'
            : isLessonCompleted
              ? 'Zakończ lekcję'
              : 'Przeczytaj całą lekcję'}
        </motion.button>
      </div>
    </div>
  );
});

LessonProgress.displayName = 'LessonProgress';
