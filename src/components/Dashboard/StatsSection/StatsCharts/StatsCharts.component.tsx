import { memo } from "react";
import { motion } from "framer-motion";

import { UserStats } from "../../../../types/stats.types";
import { ProgressChart } from "./ProgressChart.component";
import { CategoriesChart } from "./CategoriesChart.component";

type StatsChartsProps = {
  data: UserStats['chartData'] | undefined;
  isLoading: boolean;
};

export const StatsCharts = memo(({ data, isLoading }: StatsChartsProps) => {
  if (isLoading || !data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold font-space text-white mb-6">
          Postęp w Czasie
        </h3>
        <ProgressChart data={data.daily} />
      </div>

      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold font-space text-white mb-6">
          Kategorie Zadań
        </h3>
        <CategoriesChart data={data.categories} />
      </div>
    </motion.div>
  );
});

StatsCharts.displayName = "StatsCharts"; 