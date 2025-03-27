import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDateFormat } from '../useDateFormat';

describe('useDateFormat', () => {
  it('format date correctly', () => {
    const { result } = renderHook(() => useDateFormat());
    const formatDate = result.current;

    const testDate = '2024-01-01T12:00:00Z';
    expect(formatDate(testDate)).toMatch(/01 sty, \d{2}:\d{2}/i);
  });

  it('returns message for empty date', () => {
    const { result } = renderHook(() => useDateFormat());
    const formatDate = result.current;

    expect(formatDate('')).toBe('Brak danych');
  });

  it('returns message for invalid date', () => {
    const { result } = renderHook(() => useDateFormat());
    const formatDate = result.current;

    expect(formatDate('invalid-date')).toBe('Nieprawidłowa data');
  });
}); 