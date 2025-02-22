import { memo } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { statsSectionStyles as styles } from "../style/StatsSection.styles";

type StatCardProps = {
  icon: IconType;
  label: string;
  value: string | number;
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
    className={`${styles.card.base} hover:border-js/30 transition-all p-3 md:p-4`}
  >
    <div className="flex items-center gap-3 md:gap-4">
      <div className="p-2 md:p-3 rounded-lg bg-js/10 shrink-0">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-js" />
      </div>
      <div className="min-w-0">
        <p className="text-gray-400 text-xs md:text-sm mb-0.5 md:mb-1">{label}</p>
        <p className="text-xl md:text-2xl font-bold font-space text-js truncate">{value}</p>
        {subValue && (
          <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">{subValue}</p>
        )}
      </div>
    </div>
  </motion.div>
));

StatCard.displayName = "StatCard"; 