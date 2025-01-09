import { motion } from "framer-motion";
import { memo } from "react";
import { FaRegCircle, FaCircle } from "react-icons/fa";
import { GameDifficulty } from "../../../../types/games.types";

type GamesDifficultyProps = {
  selectedDifficulty: GameDifficulty | "all";
  onDifficultyChange: (difficulty: GameDifficulty | "all") => void;
};

const difficulties = [
  { value: "all" as const, label: "Wszystkie" },
  { value: "easy" as const, label: "Łatwe", color: "text-emerald-400" },
  { value: "medium" as const, label: "Średnie", color: "text-indigo-400" },
  { value: "hard" as const, label: "Trudne", color: "text-rose-400" },
];

export const GamesDifficulty = memo(({ selectedDifficulty, onDifficultyChange }: GamesDifficultyProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-400 text-sm">Poziom:</span>
      <div className="flex gap-3">
        {difficulties.map((difficulty) => (
          <motion.button
            key={difficulty.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDifficultyChange(difficulty.value)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
              ${selectedDifficulty === difficulty.value
                ? `bg-gray-800/50 border border-${difficulty.color || 'gray-400'}`
                : "text-gray-400 hover:text-gray-300"
              }`}
          >
            {selectedDifficulty === difficulty.value ? (
              <FaCircle className={`w-3 h-3 ${difficulty.color || 'text-gray-400'}`} />
            ) : (
              <FaRegCircle className="w-3 h-3" />
            )}
            {difficulty.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
});

GamesDifficulty.displayName = "GamesDifficulty"; 