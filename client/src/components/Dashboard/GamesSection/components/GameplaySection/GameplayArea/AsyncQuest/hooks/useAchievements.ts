import { useState, useCallback, useEffect } from 'react';
import { Achievement } from '../../../../../types/achievements.types';
import { achievements } from '../../../../../data/achievements.data';
import { GameStats } from '../../../../../types/asyncQuest.types';

export const useAchievements = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastUnlocked, setLastUnlocked] = useState<Achievement | null>(null);

  const checkAchievements = useCallback((stats: GameStats, levelTime: number) => {
    const newUnlocked: Achievement[] = [];

    achievements.forEach(achievement => {
      if (!unlockedAchievements.find(a => a.id === achievement.id)) {
        const { condition } = achievement;

        switch (condition.type) {
          case 'time':
            if (levelTime <= condition.value) {
              newUnlocked.push(achievement);
            }
            break;
          case 'category':
            if (condition.category) {
              const categoryStats = stats.categoryStats[condition.category];
              if (categoryStats.correct >= condition.value) {
                newUnlocked.push(achievement);
              }
            }
            break;
          case 'streak':
            if (currentStreak >= condition.value) {
              newUnlocked.push(achievement);
            }
            break;
        }
      }
    });

    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
      setLastUnlocked(newUnlocked[newUnlocked.length - 1]);
    }
  }, [currentStreak, unlockedAchievements]);

  const updateStreak = useCallback((correct: boolean) => {
    if (correct) {
      setCurrentStreak(prev => prev + 1);
    } else {
      setCurrentStreak(0);
    }
  }, []);

  const clearLastUnlocked = useCallback(() => {
    setLastUnlocked(null);
  }, []);

  return {
    unlockedAchievements,
    lastUnlocked,
    checkAchievements,
    updateStreak,
    clearLastUnlocked
  };
}; 