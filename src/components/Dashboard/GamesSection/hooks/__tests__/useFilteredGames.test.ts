import { describe, it, expect, vi } from 'vitest';
import { useFilteredGames } from '../useGames';

vi.mock('../../types/api.types', () => ({}));

describe('useFilteredGames', () => {
  const mockGames = [
    { 
      _id: '1', 
      title: 'Game A', 
      description: 'Description A', 
      difficulty: 'easy', 
      rewardPoints: 10, 
      completions: { count: 5 }, 
      createdAt: '2023-01-01',
      slug: 'game-a',
      isCompleted: false,
      rating: 4.5,
      estimatedTime: 30,
      gameData: []
    },
    { 
      _id: '2', 
      title: 'Game B', 
      description: 'Description B', 
      difficulty: 'medium', 
      rewardPoints: 20, 
      completions: { count: 10 }, 
      createdAt: '2023-01-02',
      slug: 'game-b',
      isCompleted: false,
      rating: 4.0,
      estimatedTime: 45,
      gameData: []
    },
    { 
      _id: '3', 
      title: 'Game C', 
      description: 'Test', 
      difficulty: 'hard', 
      rewardPoints: 30, 
      completions: { count: 15 }, 
      createdAt: '2023-01-03',
      slug: 'game-c',
      isCompleted: false,
      rating: 3.5,
      estimatedTime: 60,
      gameData: []
    },
  ] as any[];

  it('filters games by difficulty', () => {
    const result = useFilteredGames(mockGames, 'newest', '', 'easy');
    
    expect(result.length).toBe(1);
    expect(result[0]._id).toBe('1');
  });

  it('filters games by search query in title', () => {
    const result = useFilteredGames(mockGames, 'newest', 'game a', 'all');
    
    expect(result.length).toBe(1);
    expect(result[0]._id).toBe('1');
  });

  it('filters games by search query in description', () => {
    const result = useFilteredGames(mockGames, 'newest', 'test', 'all');
    
    expect(result.length).toBe(1);
    expect(result[0]._id).toBe('3');
  });

  it('sorts games by newest', () => {
    const result = useFilteredGames(mockGames, 'newest', '', 'all');
    
    expect(result.length).toBe(3);
    expect(result[0]._id).toBe('3');
    expect(result[1]._id).toBe('2');
    expect(result[2]._id).toBe('1');
  });

  it('sorts games by popularity', () => {
    const result = useFilteredGames(mockGames, 'popular', '', 'all');
    
    expect(result.length).toBe(3);
    expect(result[0]._id).toBe('3');
    expect(result[1]._id).toBe('2');
    expect(result[2]._id).toBe('1');
  });

  it('sorts games by difficulty', () => {
    const result = useFilteredGames(mockGames, 'difficulty', '', 'all');
    
    expect(result.length).toBe(3);
    expect(result[0]._id).toBe('2');
    expect(result[1]._id).toBe('3'); 
    expect(result[2]._id).toBe('1'); 
  });

  it('sorts games by xp', () => {
    const result = useFilteredGames(mockGames, 'xp', '', 'all');
    
    expect(result.length).toBe(3);
    expect(result[0]._id).toBe('3'); 
    expect(result[1]._id).toBe('2'); 
    expect(result[2]._id).toBe('1'); 
  });

  it('returns empty array when there are no games', () => {
    const result = useFilteredGames(undefined, 'newest', '', 'all');
    
    expect(result).toEqual([]);
  });

  it('combines filtering and sorting', () => {
    const result = useFilteredGames(mockGames, 'xp', '', 'medium');
    
    expect(result.length).toBe(1);
    expect(result[0]._id).toBe('2');
  });
}); 