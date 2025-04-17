import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';
import { useMobileDetect } from '../../../../hooks/useMobileDetect';

export const ChartHeader = () => {
  const isMobile = useMobileDetect();

  return (
    <div className="flex items-center justify-between border-b border-js/20 pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-js/10">
          {isMobile ? (
            <div className="text-js">
              <FaChartLine className="w-6 h-6" />
            </div>
          ) : (
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-js"
            >
              <FaChartLine className="w-6 h-6" />
            </motion.div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-js">Wykres Postępów</h2>
      </div>
      <span className="text-sm text-gray-400">Ostatnie 5 tygodni</span>
    </div>
  );
};

ChartHeader.displayName = 'ChartHeader';
