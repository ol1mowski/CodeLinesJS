import { memo } from 'react';
import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type ActionButtonProps = PropsWithChildren<{
  onClick: () => void;
  className?: string;
}>;

export const ActionButton = memo(({ children, onClick, className = '' }: ActionButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${className}`}
  >
    {children}
  </motion.button>
));
