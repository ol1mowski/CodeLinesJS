import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useFormatTime } from '../useFormatTime.hook';

describe('useFormatTime', () => {
  it('formats minutes correctly', () => {
    const { result } = renderHook(() => useFormatTime());
    const formatTime = result.current;

    expect(formatTime(60)).toBe('1h 0m');
    expect(formatTime(90)).toBe('1h 30m');
    expect(formatTime(145)).toBe('2h 25m');
    expect(formatTime(0)).toBe('0h 0m');
  });
}); 