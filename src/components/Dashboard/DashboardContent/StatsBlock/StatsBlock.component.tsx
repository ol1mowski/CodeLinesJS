import { motion } from "framer-motion";
import { memo } from "react";
import { FaTrophy, FaStar, FaChartLine } from "react-icons/fa";
import { dashboardContentStyles as styles } from "../DashboardContent.styles";

type StatItemProps = {
  icon: typeof FaTrophy;
  label: string;
  value: string | number;
  type: 'challenges' | 'points' | 'ranking';
};

const statStyles = {
  challenges: {
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
    borderHover: "group-hover:border-emerald-500/30"
  },
  points: {
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
    borderHover: "group-hover:border-blue-500/30"
  },
  ranking: {
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-500",
    borderHover: "group-hover:border-purple-500/30"
  }
};

const StatItem = memo(({ icon: Icon, label, value, type }: StatItemProps) => {
  const style = statStyles[type];
  
  return (
    <div className="flex items-center gap-4 group">
      <div className={`
        w-12 h-12 rounded-lg
        ${style.iconBg}
        flex items-center justify-center
        shadow-lg shadow-js/10
        group-hover:scale-110 transition-transform
      `}>
        <Icon className={`text-xl ${style.iconColor}`} />
      </div>
      <div>
        <p className={styles.text.secondary}>{label}</p>
        <p className={`text-xl font-bold ${style.iconColor}`}>{value}</p>
      </div>
    </div>
  );
});

StatItem.displayName = "StatItem";

export const StatsBlock = memo(() => {
  // DUMMY DATA
  const stats = {
    completedChallenges: 15,
    totalPoints: 2500,
    ranking: 42
  };

  return (
    <div className="space-y-6">
      <div className={styles.card.header}>
        <h2 className={styles.card.title}>Statystyki</h2>
      </div>

      <motion.div 
        className="grid gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatItem
          icon={FaTrophy}
          label="Ukończone wyzwania"
          value={stats.completedChallenges}
          type="challenges"
        />

        <StatItem
          icon={FaStar}
          label="Zdobyte punkty"
          value={stats.totalPoints}
          type="points"
        />

        <StatItem
          icon={FaChartLine}
          label="Ranking"
          value={`#${stats.ranking}`}
          type="ranking"
        />

        <div className="pt-4 mt-4 border-t border-js/10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className={styles.text.secondary}>
              Jesteś w top
              <span className="text-js font-bold mx-1">10%</span>
              najlepszych graczy!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

StatsBlock.displayName = "StatsBlock"; 