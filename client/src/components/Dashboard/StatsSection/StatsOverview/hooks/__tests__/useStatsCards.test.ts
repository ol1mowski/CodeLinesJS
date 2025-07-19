import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useStatsCards } from '../useStatsCards.hook';
import { LegacyUserStats } from '../../../types/stats.types';

describe('useStatsCards', () => {
  const mockStats: LegacyUserStats = {
    progress: {
      level: 5,
      points: 1500,
      pointsToNextLevel: 2000,
    },
    achievements: {
      completedChallenges: 25,
      streak: {
        current: 7,
        best: 14
      },
      badges: []
    },
    badges: [],
    unlockedFeatures: [],
    chartData: {
      daily: [],
      categories: []
    }
  };

  it('returns empty array when no stats provided', () => {
    const { result } = renderHook(() => useStatsCards(undefined));
    expect(result.current).toEqual([]);
  });

  it('returns formatted stats cards with correct values', () => {
    const { result } = renderHook(() => useStatsCards(mockStats));
    const cards = result.current;

    expect(cards).toHaveLength(2);
    expect(cards[0].value).toBe('25');
    expect(cards[1].value).toBe('7 dni');
  });
});
