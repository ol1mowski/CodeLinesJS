import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePasswordVisibility } from '../usePasswordVisibility.hook';

describe('usePasswordVisibility', () => {
  it('should default to hiding password', () => {
    const { result } = renderHook(() => usePasswordVisibility());

    expect(result.current.isVisible).toBe(false);
    expect(result.current.inputType).toBe('password');
  });

  it('should toggle password visibility', () => {
    const { result } = renderHook(() => usePasswordVisibility());

    expect(result.current.isVisible).toBe(false);
    expect(result.current.inputType).toBe('password');

    act(() => {
      result.current.toggleVisibility();
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.inputType).toBe('text');

    act(() => {
      result.current.toggleVisibility();
    });

    expect(result.current.isVisible).toBe(false);
    expect(result.current.inputType).toBe('password');
  });
});
