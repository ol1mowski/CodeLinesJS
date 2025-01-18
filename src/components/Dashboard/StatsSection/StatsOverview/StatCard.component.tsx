import { memo } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { statsSectionStyles as styles } from "../style/StatsSection.styles";

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

export const StatCard = memo(({ icon: Icon, label, value, subValue }: StatCardProps) => (
  <motion.div
    variants={item}
    className={`${styles.card.base} hover:border-js/30 transition-all`}
  >
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-js/10">
        <Icon className="w-6 h-6 text-js" />
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold font-space text-js">{value}</p>
        {subValue && (
          <p className="text-sm text-gray-500 mt-1">{subValue}</p>
        )}
      </div>
    </div>
  </motion.div>
));

StatCard.displayName = "StatCard"; 