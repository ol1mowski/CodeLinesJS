import { memo } from "react";
import { motion } from "framer-motion";

type LevelProgressProps = {
  level: number;
  experience: number;
  nextLevel: number;
};

export const LevelProgress = memo(({ level, experience, nextLevel }: LevelProgressProps) => {
  const progress = (experience / nextLevel) * 100;

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold font-space text-white">Poziom {level}</h3>
          <p className="text-gray-400 text-sm">
            {experience} / {nextLevel} XP do następnego poziomu
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{level}</span>
        </div>
      </div>

      <div className="relative h-4 bg-gray-700/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-indigo-500"
        />
      </div>
    </div>
  );
});

LevelProgress.displayName = "LevelProgress"; 