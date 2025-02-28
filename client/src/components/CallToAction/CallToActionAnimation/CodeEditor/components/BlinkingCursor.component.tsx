import { motion } from "framer-motion";
import { CURSOR_BLINK_DURATION } from '../constants';

export const BlinkingCursor = () => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: CURSOR_BLINK_DURATION, repeat: Infinity }}
    className="absolute bottom-0 ml-1 h-[2px] w-3 bg-[#f7df1e]"
  />
); 