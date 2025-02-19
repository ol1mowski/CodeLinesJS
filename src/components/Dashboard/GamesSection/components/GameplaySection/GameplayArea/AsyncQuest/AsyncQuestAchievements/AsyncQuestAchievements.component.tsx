import React, { memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Achievement } from '../../../../../types/achievements.types';
import { AsyncQuestAchievement } from '../AsyncQuestAchievement/AsyncQuestAchievement.component';

type AsyncQuestAchievementsProps = {
  achievements: Achievement[];
  lastUnlocked: Achievement | null;
  onClose: () => void;
};

export const AsyncQuestAchievements = memo(({ 
  achievements, 
  lastUnlocked,
  onClose 
}: AsyncQuestAchievementsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {achievements.map(achievement => (
          <AsyncQuestAchievement
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>

      <AnimatePresence>
        {lastUnlocked && (
          <AsyncQuestAchievement
            achievement={lastUnlocked}
            isNotification
          />
        )}
      </AnimatePresence>
    </>
  );
});

AsyncQuestAchievements.displayName = 'AsyncQuestAchievements'; 