import { memo } from 'react';
import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Aktywnych Graczy" },
  { value: "50K+", label: "Ukończonych Poziomów" },
  { value: "95%", label: "Pozytywnych Opinii" },
] as const;

export const StatsGrid =() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {stats.map((stat, index) => (
      <StatItem key={stat.label} {...stat} index={index} />
    ))}
  </div>
);

type StatItemProps = {
  value: string;
  label: string;
  index: number;
};

const StatItem = memo(({ value, label, index }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="text-center p-4 rounded-lg bg-black/20 border border-[#f7df1e]/10"
  >
    <p className="text-3xl md:text-4xl font-bold font-space text-[#f7df1e]">
      {value}
    </p>
    <p className="text-sm md:text-base text-gray-400 font-inter">
      {label}
    </p>
  </motion.div>
));

StatsGrid.displayName = 'StatsGrid';
StatItem.displayName = 'StatItem'; 