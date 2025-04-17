import { memo } from 'react';
import { motion } from 'framer-motion';

type PageHeaderProps = {
  title?: string;
  description?: string;
};

export const PageHeader = memo(
  ({
    title = 'Zgłoś błąd lub sugestię',
    description = 'Znalazłeś błąd w aplikacji lub masz pomysł na nową funkcję? Daj nam znać! Twoje opinie pomagają nam ulepszać CodeLinesJS.',
  }: PageHeaderProps) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-2xl mx-auto"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-js mb-4">{title}</h1>
      <p className="text-gray-400 text-lg">{description}</p>
    </motion.div>
  )
);

PageHeader.displayName = 'PageHeader';
