import { useState, useCallback } from 'react';

export const useReward = () => {
  const [isRewardVisible, setIsRewardVisible] = useState(false);
  const [rewardXP, setRewardXP] = useState(0);

  const showReward = useCallback((xp: number) => {
    setRewardXP(xp);
    setIsRewardVisible(true);
  }, []);

  const hideReward = useCallback(() => {
    setIsRewardVisible(false);
  }, []);

  return {
    isRewardVisible,
    rewardXP,
    showReward,
    hideReward,
  };
};
