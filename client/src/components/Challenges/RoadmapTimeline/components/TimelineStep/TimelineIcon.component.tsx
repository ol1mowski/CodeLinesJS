import { memo } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

type TimelineIconProps = {
  Icon: IconType;
};

export const TimelineIcon = memo(({ Icon }: TimelineIconProps) => (
  <div className="relative">
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="w-11 h-11 rounded-full bg-js/10 border border-js/20 flex items-center justify-center text-js"
    >
      <Icon className="w-5 h-5" />
    </motion.div>
  </div>
));

TimelineIcon.displayName = 'TimelineIcon';
