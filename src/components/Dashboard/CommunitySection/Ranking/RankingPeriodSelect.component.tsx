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

export const RankingPeriodSelect = memo(({ value, onChange }: RankingPeriodSelectProps) => (
  <div className="flex gap-2">
    {periods.map(period => (
      <motion.button
        key={period.value}
        onClick={() => onChange(period.value)}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium
          transition-colors duration-200
          ${value === period.value
            ? "bg-js text-dark"
            : "bg-dark/50 text-gray-400 hover:text-js"
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {period.label}
      </motion.button>
    ))}
  </div>
));

RankingPeriodSelect.displayName = "RankingPeriodSelect"; 