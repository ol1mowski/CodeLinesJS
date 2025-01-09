import { motion } from "framer-motion";
import { memo } from "react";
import { FaStar, FaUsers, FaTrophy } from "react-icons/fa";
import { Game } from "../../../../types/games.types";

type GameCardProps = {
  game: Game;
};

const difficultyColors = {
  easy: "from-green-500/20 to-emerald-500/20 text-emerald-400",
  medium: "from-blue-500/20 to-indigo-500/20 text-indigo-400",
  hard: "from-red-500/20 to-rose-500/20 text-rose-400",
};

export const GameCard = memo(({ game }: GameCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden group h-full"
    >
      <div className="aspect-video relative overflow-hidden">
        <motion.img
          src={game.thumbnailUrl}
          alt={game.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-3 left-3 flex items-center gap-2"
        >
          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${difficultyColors[game.difficulty]}`}>
            {game.difficulty}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-300">
            <FaStar className="text-yellow-400" />
            {game.xpPoints} XP
          </span>
        </motion.div>
      </div>
      <div className="p-4">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold font-space text-gray-100 mb-2"
        >
          {game.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm mb-4"
        >
          {game.description}
        </motion.p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 text-sm text-gray-400"
            >
              <FaUsers className="text-indigo-400" />
              {game.totalPlayers}
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 text-sm text-gray-400"
            >
              <FaTrophy className="text-amber-400" />
              {game.completedCount}
            </motion.span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors"
          >
            {game.isCompleted ? "Zagraj ponownie" : "Rozpocznij"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

GameCard.displayName = "GameCard"; 