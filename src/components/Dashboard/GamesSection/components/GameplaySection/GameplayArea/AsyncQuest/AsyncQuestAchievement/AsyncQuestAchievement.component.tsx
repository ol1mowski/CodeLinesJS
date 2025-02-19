import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaBolt, FaCheckDouble, FaStar } from 'react-icons/fa';
import { Achievement } from '../../../../../types/achievements.types';

type AsyncQuestAchievementProps = {
  achievement: Achievement;
  isNotification?: boolean;
};

export const AsyncQuestAchievement = memo(({ achievement, isNotification = false }: AsyncQuestAchievementProps) => {
  const getIcon = () => {
    switch (achievement.icon) {
      case 'speed':
        return <FaBolt className="w-5 h-5" />;
      case 'accuracy':
        return <FaCheckDouble className="w-5 h-5" />;
      case 'streak':
        return <FaStar className="w-5 h-5" />;
      case 'master':
        return <FaTrophy className="w-5 h-5" />;
    }
  };

  if (isNotification) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed bottom-4 right-4 p-4 bg-dark-800/95 border border-js/20 rounded-lg shadow-lg max-w-sm"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-js/10 text-js">
            {getIcon()}
          </div>
          <div>
            <div className="font-medium text-js">
              Nowe osiągnięcie!
            </div>
            <div className="text-sm text-gray-400">
              {achievement.title}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              +{achievement.reward} punktów
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`p-3 rounded-lg ${
      achievement.unlocked 
        ? 'bg-js/10 border border-js/20' 
        : 'bg-dark-800/50 border border-gray-700/30'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          achievement.unlocked ? 'bg-js/20 text-js' : 'bg-gray-700/20 text-gray-500'
        }`}>
          {getIcon()}
        </div>
        <div>
          <div className={`font-medium ${
            achievement.unlocked ? 'text-js' : 'text-gray-400'
          }`}>
            {achievement.title}
          </div>
          <div className="text-sm text-gray-500">
            {achievement.description}
          </div>
          {achievement.unlocked && (
            <div className="text-xs text-js mt-1">
              +{achievement.reward} punktów
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

AsyncQuestAchievement.displayName = 'AsyncQuestAchievement'; 