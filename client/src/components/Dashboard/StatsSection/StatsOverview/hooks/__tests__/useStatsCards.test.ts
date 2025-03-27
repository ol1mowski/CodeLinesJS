import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useStatsCards } from '../useStatsCards.hook';

const mockStats = {
  data: {
    completedChallenges: 25,
    streak: 7,
    bestStreak: 14,
    level: 5,
    points: 1500,
    pointsToNextLevel: 2000,
    badges: [],
    unlockedFeatures: [],
    chartData: { daily: [], categories: [] }
  }
};

describe('useStatsCards', () => {
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