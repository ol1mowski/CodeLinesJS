import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAnimationConfig } from '../hooks/useAnimationConfig';

type CallToActionProps = {
  text: string;
  url: string;
};

export const CallToAction = memo(({ text, url }: CallToActionProps) => {
  const animations = useAnimationConfig();

  return (
    <motion.div
      initial={animations.cta.initial}
      whileInView={animations.cta.animate}
      transition={animations.cta.transition}
      viewport={{ once: true }}
      className="mt-16 text-center"
    >
      <Link
        to={url}
        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-js text-dark font-semibold hover:bg-js/90 transition-all duration-300 transform hover:scale-105"
      >
        {text}
      </Link>
    </motion.div>
  );
});

CallToAction.displayName = 'CallToAction';
