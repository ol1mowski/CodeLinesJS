import { memo } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

type StatCardProps = {
  icon: IconType;
  label: string;
  value: string;
  subValue?: string;
  gradient: string;
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const StatCard = memo(({ icon: Icon, label, value, subValue, gradient }: StatCardProps) => (
  <motion.div
    variants={item}
    className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all"
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}/20 group-hover:${gradient}/30 transition-colors`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold font-space text-white">{value}</p>
        {subValue && (
          <p className="text-sm text-gray-500 mt-1">{subValue}</p>
        )}
      </div>
    </div>
  </motion.div>
));

StatCard.displayName = "StatCard"; 