import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameFilters } from '../useGameFilters';

describe('useGameFilters', () => {
  it('returns default filter values', () => {
    const { result } = renderHook(() => useGameFilters());

    expect(result.current.filters.sortBy).toBe('newest');
    expect(result.current.filters.searchQuery).toBe('');
    expect(result.current.filters.selectedDifficulty).toBe('all');
  });

  it('updates sortBy', () => {
    const { result } = renderHook(() => useGameFilters());

    act(() => {
      result.current.setters.setSortBy('popular');
    });

    expect(result.current.filters.sortBy).toBe('popular');
  });

  it('updates searchQuery', () => {
    const { result } = renderHook(() => useGameFilters());

    act(() => {
      result.current.setters.setSearchQuery('test query');
    });

    expect(result.current.filters.searchQuery).toBe('test query');
  });

  it('updates selectedDifficulty', () => {
    const { result } = renderHook(() => useGameFilters());

    act(() => {
      result.current.setters.setSelectedDifficulty('hard');
    });

    expect(result.current.filters.selectedDifficulty).toBe('hard');
  });
});
