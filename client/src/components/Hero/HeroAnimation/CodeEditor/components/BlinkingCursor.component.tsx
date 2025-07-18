import { CURSOR_BLINK_DURATION } from '../constants';
import { useMobileDetect } from '../../../../UI/hooks/useMobileDetect.hook';
import { motion } from 'framer-motion';

export const BlinkingCursor = () => {
  const isMobile = useMobileDetect();

  const duration = isMobile ? CURSOR_BLINK_DURATION * 1.5 : CURSOR_BLINK_DURATION;

  if (isMobile) {
    return <span className="absolute bottom-0 ml-1 h-[2px] w-3 bg-[#f7df1e]" />;
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration, repeat: Infinity }}
      className="absolute bottom-0 ml-1 h-[2px] w-3 bg-[#f7df1e]"
    />
  );
};
