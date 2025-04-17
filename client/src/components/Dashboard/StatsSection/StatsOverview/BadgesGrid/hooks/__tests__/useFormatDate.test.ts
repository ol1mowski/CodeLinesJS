import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFormatDate } from '../useFormatDate.hook';

describe('useFormatDate', () => {
  it('formats valid dates correctly', () => {
    const { result } = renderHook(() => useFormatDate());
    const formatDate = result.current;

    const date = new Date('2024-03-20T12:00:00Z').toISOString();
    expect(formatDate(date)).toMatch(/20 mar 2024/i);
  });

  it('handles invalid dates', () => {
    const { result } = renderHook(() => useFormatDate());
    const formatDate = result.current;

    expect(formatDate('invalid-date')).toBe('Data nieznana');
    expect(formatDate('')).toBe('Data nieznana');
  });
});
