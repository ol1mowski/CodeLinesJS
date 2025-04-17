import { memo } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface StatCardProps {
  icon: IconType;
  label: string;
  value: string | number;
  className?: string;
}

export const StatCard = memo(({ icon: Icon, label, value, className = '' }: StatCardProps) => {
  return (
    <motion.div
      className={`bg-dark/20 rounded-lg p-4 border border-js/5 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="w-6 h-6 text-js mb-2" />
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold text-js">{value}</p>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';
