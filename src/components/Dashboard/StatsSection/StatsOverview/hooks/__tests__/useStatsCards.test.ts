import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useStatsCards } from '../useStatsCards';

const mockStats = {
  completedChallenges: 25,
  currentStreak: 7,
  bestStreak: 14,
  averageScore: 85,
  totalTimeSpent: 360,
  level: 5,
  experiencePoints: 1500,
  nextLevelThreshold: 2000,
  badges: [],
  unlockedFeatures: [],
  chartData: { daily: [], categories: [] }
};

describe('useStatsCards', () => {
  it('returns empty array when no stats provided', () => {
    const { result } = renderHook(() => useStatsCards(undefined));
    expect(result.current).toEqual([]);
  });

  it('returns formatted stats cards with correct values', () => {
    const { result } = renderHook(() => useStatsCards(mockStats));
    const cards = result.current;

    expect(cards).toHaveLength(4);
    expect(cards[0].value).toBe('25');
    expect(cards[1].value).toBe('7 dni');
    expect(cards[2].value).toBe('85%');
    expect(cards[3].value).toBe('6h 0m');
  });
}); 