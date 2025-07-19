import { memo } from 'react';
import { FaStar, FaChartLine, FaMedal } from 'react-icons/fa';
import { DashboardStats } from '../types/dashboard.types';
import { statsBlockStyles as styles } from './style/StatsBlock.styles';
import { useDateFormat } from './hooks/useDateFormat.hook';

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

StatItem.displayName = 'StatItem';

type StatsBlockProps = {
  stats: DashboardStats;
};

export const StatsBlock = memo(({ stats }: StatsBlockProps) => {
  const formatDate = useDateFormat();

  return (
    <div className={styles.container}>
      <div className={styles.stats.grid}>
        <StatItem icon={<FaMedal />} label="Poziom" value={stats.progress.level} />

        <StatItem icon={<FaStar />} label="Punkty" value={stats.progress.points} />

        <StatItem icon={<FaChartLine />} label="Seria" value={`${stats.achievements.streak.current} dni`} />
      </div>

      <p className={styles.lastActive}>Ostatnia aktywność: {formatDate(stats.user.lastActive)}</p>
    </div>
  );
});

StatsBlock.displayName = 'StatsBlock';
