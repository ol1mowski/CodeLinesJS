import { memo, type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export const LessonLayout = memo(({ children }: PropsWithChildren) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen bg-dark/50 backdrop-blur-sm py-8"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </motion.div>
));

LessonLayout.displayName = "LessonLayout"; 