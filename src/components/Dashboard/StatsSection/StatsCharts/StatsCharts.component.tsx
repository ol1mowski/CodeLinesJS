import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { statsSectionStyles as styles } from "../style/StatsSection.styles";

import { UserStats } from "../../../../types/stats.types";
import { ProgressChart } from "./ProgressChart.component";
import { CategoriesChart } from "./CategoriesChart.component";

type StatsChartsProps = {
  data: UserStats['chartData'];
  isLoading: boolean;
};

export const StatsCharts = memo(({ data, isLoading }: StatsChartsProps) => {
  const progressData = useMemo(() => 
    data.daily.map(item => ({
      date: item.date,
      progress: item.points
    }))
  , [data.daily]);

  if (isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <div className={styles.card.base}>
        <h3 className={styles.card.title}>
          Postęp w Czasie
        </h3>
        <ProgressChart data={progressData} />
      </div>

      <div className={styles.card.base}>
        <h3 className={styles.card.title}>
          Kategorie Zadań
        </h3>
        <CategoriesChart data={data.categories} />
      </div>
    </motion.div>
  );
});

StatsCharts.displayName = "StatsCharts"; 