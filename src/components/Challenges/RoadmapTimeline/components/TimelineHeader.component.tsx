import { memo } from 'react';
import { motion } from 'framer-motion';

export const TimelineHeader = memo(() => (
  <div className="flex items-center justify-between border-b border-[#f7df1e]/20 pb-4">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-[#f7df1e]/10">
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#f7df1e] text-xl"
        >
          🚀
        </motion.div>
      </div>
      <h2 className="text-2xl font-bold text-[#f7df1e]">
        Mapa Rozwoju
      </h2>
    </div>
    <span className="text-sm text-gray-400">
      Twoja droga do mistrzostwa
    </span>
  </div>
));

TimelineHeader.displayName = 'TimelineHeader'; 