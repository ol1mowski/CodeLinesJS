import { memo } from 'react';
import { motion } from "framer-motion";
import { IconType } from 'react-icons';
import { useMobileDetect } from '../../../../hooks/useMobileDetect';

type StatCardProps = {
  icon: IconType;
  label: string;
  value: string;
  progress: number;
  color: string;
  hoverColor: string;
  index: number;
};

export const StatCard = memo(({ icon: Icon, label, value, progress, color, hoverColor, index }: StatCardProps) => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return (
      <div className="group relative p-4 rounded-xl border border-js/10 bg-dark/30 
                     hover:border-js/20 hover:bg-dark/50 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-js/10 text-js 
                        group-hover:bg-js/20 group-hover:scale-110 transition-all duration-300">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-400">
              {label}
            </h3>
            <p className="text-2xl font-bold text-js mt-1">
              {value}
            </p>
            <div className="mt-3 relative h-1.5 rounded-full bg-dark/50 overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${color}
                           group-hover:${hoverColor} transition-all duration-300`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-4 rounded-xl border border-js/10 bg-dark/30 
                 hover:border-js/20 hover:bg-dark/50 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-js/10 text-js 
                      group-hover:bg-js/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-400">
            {label}
          </h3>
          <p className="text-2xl font-bold text-js mt-1">
            {value}
          </p>
          <div className="mt-3 relative h-1.5 rounded-full bg-dark/50 overflow-hidden">
            <motion.div
              className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${color}
                         group-hover:${hoverColor} transition-all duration-300`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard'; 