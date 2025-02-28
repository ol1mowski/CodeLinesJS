import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../../../types/stats.types";

type LevelUpNotificationProps = {
  level: number;
  rewards?: {
    badges: Badge[];
    bonusPoints: number;
    unlockedFeatures: string[];
  };
  onClose: () => void;
  isVisible: boolean;
};

export const LevelUpNotification = memo(({ 
  level, 
  rewards, 
  onClose, 
  isVisible 
}: LevelUpNotificationProps) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 bg-dark/95 border border-js/20 rounded-lg p-6 shadow-lg max-w-sm"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-js/20 flex items-center justify-center">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <h3 className="text-js font-bold text-lg">
              Nowy Poziom!
            </h3>
            <p className="text-gray-400">
              Osiągnięto poziom {level}
            </p>
          </div>
        </div>

        {rewards && (
          <div className="space-y-2">
            {rewards.badges.length > 0 && (
              <div className="flex gap-2">
                {rewards.badges.map(badge => (
                  <div 
                    key={badge.id}
                    className="flex items-center gap-2 bg-dark/50 rounded-lg px-3 py-2"
                  >
                    <span>{badge.icon}</span>
                    <span className="text-js text-sm">{badge.name}</span>
                  </div>
                ))}
              </div>
            )}
            {rewards.bonusPoints > 0 && (
              <p className="text-emerald-400 text-sm">
                +{rewards.bonusPoints} punktów bonusowych
              </p>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-gray-400 hover:text-white text-sm transition-colors"
        >
          Zamknij
        </button>
      </motion.div>
    )}
  </AnimatePresence>
));

LevelUpNotification.displayName = "LevelUpNotification"; 