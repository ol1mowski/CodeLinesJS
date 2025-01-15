import { memo } from "react";
import { motion } from "framer-motion";
import { DailyChart } from "./DailyChart.component";
import { CategoriesChart } from "./CategoriesChart.component";
import { LoadingScreen } from "../../../UI/LoadingScreen/LoadingScreen.component";

type StatsChartsProps = {
  data?: {
    daily: Array<{
      date: string;
      points: number;
      challenges: number;
    }>;
    categories: Array<{
      name: string;
      completed: number;
      total: number;
    }>;
  };
  isLoading: boolean;
};

export const StatsCharts = memo(({ data, isLoading }: StatsChartsProps) => {
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark/50 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-js mb-6">Aktywność</h3>
        <DailyChart data={data.daily} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark/50 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold text-js mb-6">Postęp w Kategoriach</h3>
        <CategoriesChart data={data.categories} />
      </motion.div>
    </div>
  );
});

StatsCharts.displayName = "StatsCharts"; 