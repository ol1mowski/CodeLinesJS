import React from 'react';
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

type LessonRewardProps = {
  xp: number;
  isVisible: boolean;
  onClose: () => void;
}

export const LessonReward = memo(({ xp, isVisible, onClose }: LessonRewardProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-4 max-w-sm bg-dark-800/95 border border-js/20 
            rounded-lg p-4 shadow-lg backdrop-blur-sm z-50"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-js/10 rounded-lg">
              <FaStar className="w-6 h-6 text-js" />
            </div>
            
            <div className="flex-1">
              <h4 className="text-js font-medium mb-1">
                Gratulacje!
              </h4>
              <p className="text-sm text-gray-400">
                Ukończyłeś lekcję i zdobyłeś:
              </p>
              <p className="text-sm text-js mt-1">
                +{xp} XP
              </p>
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

LessonReward.displayName = "LessonReward"; 