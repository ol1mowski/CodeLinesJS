import { motion } from "framer-motion";
import { memo } from "react";
import { FaStar, FaTrophy, FaPlay, FaLock } from "react-icons/fa";
import { Game } from "../../../../../types/games.types";
import { useNavigate } from 'react-router-dom';


type GameCardProps = {
  game: Game;
};

export const GameCard = memo(({ game }: GameCardProps) => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    if (!game.isLevelAvailable) {
      return;
    }
    navigate(`/dashboard/play/${game.slug}`);
  };

  const isLocked = !game.isLevelAvailable;

  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.02 }}
      className={`group bg-dark-800/50 border rounded-xl overflow-hidden transition-all ${
        isLocked 
          ? 'border-gray-700/50 opacity-50 cursor-not-allowed' 
          : 'border-js/10 hover:border-js/20'
      }`}
    >
      <div className="relative aspect-video">
        <div className="w-full h-full bg-gradient-to-br from-js/5 to-js/20 flex items-center justify-center">
          <div className="bg-js/10 px-4 py-2 rounded-lg border border-js/20">
            <span className="font-mono text-js/80 font-medium">
              {game.slug}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent" />
        
        {isLocked ? (
          <div className="absolute inset-0 m-auto w-12 h-12 bg-gray-700 text-gray-400 rounded-full flex items-center justify-center">
            <FaLock className="w-5 h-5" />
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayClick}
            className="absolute inset-0 m-auto w-12 h-12 bg-js text-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FaPlay className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-js line-clamp-1">
            {game.title}
          </h3>
          <span className="flex items-center gap-1 text-js bg-js/10 px-2 py-0.5 rounded-lg text-sm">
            <FaTrophy className="w-3.5 h-3.5" />
            {game.rewardPoints}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {isLocked 
            ? `Dostępne od poziomu ${game.requiredLevel}`
            : game.description
          }
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <FaStar className="w-4 h-4" />
              {game.rating.average.toFixed(1)}
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