import { memo } from "react";
import { FaTrophy, FaStar, FaChartLine } from "react-icons/fa";
import { dashboardContentStyles as styles } from "../DashboardContent.styles";
import { DashboardStats } from "../../../../types/dashboard.types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

type StatItemProps = {
  icon: React.ReactNode;
  label: string;
  value: number | string;
};

const StatItem = memo(({ icon, label, value }: StatItemProps) => (
  <div className="flex items-center gap-4 p-4 bg-dark/30 rounded-lg">
    <div className="text-2xl text-js">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-bold text-js">{value}</p>
    </div>
  </div>
));

StatItem.displayName = "StatItem";

interface StatsBlockProps {
  stats: DashboardStats;
}

export const StatsBlock = memo(({ stats }: StatsBlockProps) => {
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'Brak danych';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Nieprawidłowa data';
      
      return format(date, "dd MMM, HH:mm", { locale: pl });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Nieprawidłowa data';
    }
  };

  return (
    <div className={styles.card.content}>
      <h2 className={styles.text.subtitle}>Twoje Statystyki</h2>
      
      <div className="space-y-4 mt-6">
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

      <p className="text-sm text-gray-400 mt-4">
        Ostatnia aktywność: {formatDate(stats.lastActive)}
      </p>
    </div>
  );
});

StatsBlock.displayName = "StatsBlock"; 