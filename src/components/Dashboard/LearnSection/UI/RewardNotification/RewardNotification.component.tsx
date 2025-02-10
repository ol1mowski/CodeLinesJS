import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaMedal, FaTrophy } from 'react-icons/fa';
import type { Reward } from '../../types/reward.types';

type RewardNotificationProps = {
  reward: Reward;
  isVisible: boolean;
  onClose: () => void;
}

const rewardIcons = {
  xp: FaStar,
  badge: FaMedal,
  achievement: FaTrophy
};

export const RewardNotification = memo(({ reward, isVisible, onClose }: RewardNotificationProps) => {
  const Icon = rewardIcons[reward.type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-4 max-w-sm bg-dark-800/95 border border-js/20 
            rounded-lg p-4 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-js/10 rounded-lg">
              <Icon className="w-6 h-6 text-js" />
            </div>
            
            <div className="flex-1">
              <h4 className="text-js font-medium mb-1">
                {reward.title}
              </h4>
              <p className="text-sm text-gray-400">
                {reward.description}
              </p>
              {reward.type === 'xp' && (
                <p className="text-sm text-js mt-1">
                  +{reward.value} XP
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

RewardNotification.displayName = "RewardNotification"; 