import { memo } from 'react';
import { motion } from 'framer-motion';
import { useAnimationConfig } from '../hooks/useAnimationConfig';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export const SectionHeader = memo(({ title, subtitle }: SectionHeaderProps) => {
  const animations = useAnimationConfig();

  return (
    <div className="text-center mb-12 relative z-10">
      <motion.div
        initial={animations.header.initial}
        whileInView={animations.header.animate}
        transition={animations.header.transition}
        viewport={{ once: true }}
      >
        <span className="text-js font-semibold uppercase tracking-wider">Opinie uczestników</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">{title}</h2>
        {subtitle && <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
      </motion.div>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';
