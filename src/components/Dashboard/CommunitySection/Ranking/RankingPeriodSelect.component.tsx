import { motion } from "framer-motion";
import { memo } from "react";
import { RankingPeriod } from "../../../../types/ranking.types";

type RankingPeriodSelectProps = {
  value: RankingPeriod;
  onChange: (period: RankingPeriod) => void;
};

const periods: Array<{ value: RankingPeriod; label: string }> = [
  { value: "daily", label: "Dzisiaj" },
  { value: "weekly", label: "Tydzień" },
  { value: "monthly", label: "Miesiąc" },
  { value: "allTime", label: "Wszystko" },
];

export const RankingPeriodSelect = memo(({ value, onChange }: RankingPeriodSelectProps) => {
  return (
    <div className="flex space-x-2">
      {periods.map((period) => (
        <motion.button
          key={period.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(period.value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium
            transition-colors duration-200
            ${value === period.value
              ? "bg-indigo-500 text-white"
              : "bg-gray-700/50 text-gray-400 hover:text-gray-300"
            }
          `}
        >
          {period.label}
        </motion.button>
      ))}
    </div>
  );
});

RankingPeriodSelect.displayName = "RankingPeriodSelect"; 