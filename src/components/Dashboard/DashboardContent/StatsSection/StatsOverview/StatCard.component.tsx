import { memo } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { statsOverviewStyles as styles } from "./StatsOverview.styles";

type StatCardProps = {
  icon: IconType;
  label: string;
  value: string;
  subValue?: string;
  gradient: string;
};

export const StatCard = memo(({ icon: Icon, label, value, subValue, gradient }: StatCardProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
    className={styles.card.wrapper}
  >
    <div className={styles.card.content}>
      <div className={`${styles.card.icon} bg-gradient-to-br ${gradient} bg-opacity-10`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={styles.card.text}>
        <span className={styles.card.label}>{label}</span>
        <span className={styles.card.value}>{value}</span>
        {subValue && <span className={styles.card.subValue}>{subValue}</span>}
      </div>
    </div>
  </motion.div>
));

StatCard.displayName = "StatCard"; 