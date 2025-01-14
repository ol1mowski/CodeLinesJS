import { memo } from "react";
import { FaTrophy, FaStar, FaChartLine } from "react-icons/fa";
import { DashboardStats } from "../../../../types/dashboard.types";
import { statsBlockStyles as styles } from "./style/StatsBlock.styles";
import { useDateFormat } from "./hooks/useDateFormat";

type StatItemProps = {
  icon: React.ReactNode;
  label: string;
  value: number | string;
};

const StatItem = memo(({ icon, label, value }: StatItemProps) => (
  <div className={styles.stats.item.wrapper}>
    <div className={styles.stats.item.icon}>{icon}</div>
    <div className={styles.stats.item.content.wrapper}>
      <p className={styles.stats.item.content.label}>{label}</p>
      <p className={styles.stats.item.content.value}>{value}</p>
    </div>
  </div>
));

StatItem.displayName = "StatItem";

interface StatsBlockProps {
  stats: DashboardStats;
}

export const StatsBlock = memo(({ stats }: StatsBlockProps) => {
  const formatDate = useDateFormat();

  return (
    <div className={styles.container}>
      <div className={styles.stats.grid}>
        <StatItem
          icon={<FaTrophy />}
          label="Ukończone Wyzwania"
          value={stats.completedChallenges}
        />
        
        <StatItem
          icon={<FaStar />}
          label="Punkty"
          value={stats.totalPoints}
        />
        
        <StatItem
          icon={<FaChartLine />}
          label="Seria"
          value={`${stats.streak} dni`}
        />
      </div>

      <p className={styles.lastActive}>
        Ostatnia aktywność: {formatDate(stats.lastActive)}
      </p>
    </div>
  );
});

StatsBlock.displayName = "StatsBlock"; 