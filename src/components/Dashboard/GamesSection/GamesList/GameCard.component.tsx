import { motion } from "framer-motion";
import { memo } from "react";
import { FaStar, FaUsers, FaTrophy, FaPlay } from "react-icons/fa";
import { Game } from "../../../../types/games.types";

type GameCardProps = {
  game: Game;
};

export const GameCard = memo(({ game }: GameCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group bg-dark-800/50 border border-js/10 rounded-xl overflow-hidden hover:border-js/20 transition-all"
    >
      <div className="relative aspect-video">
        <img
          src={game.thumbnailUrl}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent" />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute inset-0 m-auto w-12 h-12 bg-js text-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FaPlay className="w-5 h-5 ml-1" />
        </motion.button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-js line-clamp-1">
            {game.title}
          </h3>
          <span className="flex items-center gap-1 text-js bg-js/10 px-2 py-0.5 rounded-lg text-sm">
            <FaTrophy className="w-3.5 h-3.5" />
            {game.xpPoints}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {game.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <FaUsers className="w-4 h-4" />
              {game.totalPlayers}
            </span>
            <span className="flex items-center gap-1">
              <FaStar className="w-4 h-4" />
              {game.rating}
            </span>
          </div>

          <span className={`px-2 py-0.5 rounded-md text-xs font-medium
            ${game.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
              game.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
              'bg-red-500/10 text-red-400'}`}
          >
            {game.difficulty === 'easy' ? 'Łatwy' :
             game.difficulty === 'medium' ? 'Średni' : 'Trudny'}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

GameCard.displayName = "GameCard"; 