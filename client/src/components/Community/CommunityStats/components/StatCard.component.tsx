import { memo } from 'react';
import { motion } from "framer-motion";
import { IconType } from 'react-icons';

type StatCardProps = {
  icon: IconType;
  label: string;
  mainValue: string;
  subValue: string;
  trend: string;
  details: Array<{ label: string; value: string }>;
  index: number;
};

export const StatCard = memo(({ icon: Icon, label, mainValue, subValue, trend, details, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative p-6 rounded-xl border border-js/10 bg-dark/30 
               hover:border-js/20 hover:bg-dark/50 transition-all duration-300"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-lg bg-js/10 text-js 
                    group-hover:bg-js/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
        {trend}
      </span>
    </div>

    <div className="mb-3">
      <h3 className="text-sm font-medium text-gray-400 mb-1">
        {label}
      </h3>
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-js">
          {mainValue}
        </span>
        <span className="text-sm text-gray-500 mt-1">
          {subValue}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-js/10">
      {details.map((detail) => (
        <div key={detail.label}>
          <p className="text-xs text-gray-500 mb-1">{detail.label}</p>
          <p className="text-sm font-medium text-gray-300">{detail.value}</p>
        </div>
      ))}
    </div>
  </motion.div>
));

StatCard.displayName = 'StatCard'; 