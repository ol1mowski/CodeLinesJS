import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

type JSTypoHunterHintProps = {
  hint: string;
  isVisible: boolean;
};

export const JSTypoHunterHint = memo(({ hint, isVisible }: JSTypoHunterHintProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mt-4 p-3 bg-js/10 border border-js/20 rounded-lg flex items-start gap-3"
    >
      <FaLightbulb className="w-5 h-5 text-js flex-shrink-0 mt-0.5" />
      <div>
        <div className="text-sm font-medium text-js mb-1">Podpowiedź:</div>
        <div className="text-sm text-gray-400">{hint}</div>
      </div>
    </motion.div>
  );
});

JSTypoHunterHint.displayName = 'JSTypoHunterHint'; 