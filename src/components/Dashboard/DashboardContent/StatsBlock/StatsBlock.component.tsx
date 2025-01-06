import { motion } from "framer-motion";
import { memo } from "react";
import { FaTrophy, FaStar, FaChartLine } from "react-icons/fa";
import { dashboardContentStyles as styles } from "../DashboardContent.styles";

type StatItemProps = {
  icon: typeof FaTrophy;
  label: string;
  value: string | number;
  gradient: string;
};

const StatItem = memo(({ icon: Icon, label, value, gradient }: StatItemProps) => (
  <div className="flex items-center gap-4">
    <div className={`
      w-12 h-12 rounded-lg
      ${gradient}
      flex items-center justify-center
      shadow-lg shadow-indigo-500/10
    `}>
      <Icon className="text-xl text-white" />
    </div>
    <div>
      <p className={styles.text.secondary}>{label}</p>
      <p className={`${styles.text.primary} text-xl font-bold`}>{value}</p>
    </div>
  </div>
));

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
          gradient="bg-gradient-to-r from-amber-500 to-orange-500"
        />

        <StatItem
          icon={FaStar}
          label="Zdobyte punkty"
          value={stats.totalPoints}
          gradient="bg-gradient-to-r from-blue-500 to-indigo-500"
        />

        <StatItem
          icon={FaChartLine}
          label="Ranking"
          value={`#${stats.ranking}`}
          gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
        />

        <div className="pt-4 mt-4 border-t border-gray-700/50">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className={styles.text.secondary}>
              Jesteś w top
              <span className="text-indigo-400 font-bold mx-1">10%</span>
              najlepszych graczy!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

StatsBlock.displayName = "StatsBlock"; 