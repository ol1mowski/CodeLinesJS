import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameplay } from '../useGameplay';

describe('useGameplay', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useGameplay());
    
    expect(result.current.stats).toEqual({
      timeElapsed: 0,
      score: 0,
      lives: 3,
      currentLevel: 1,
    });
    
    expect(result.current.controls).toEqual({
      isPaused: false,
      isFullscreen: false,
      isHelpVisible: false,
    });
    
    expect(typeof result.current.actions.togglePause).toBe('function');
    expect(typeof result.current.actions.toggleFullscreen).toBe('function');
    expect(typeof result.current.actions.toggleHelp).toBe('function');
    expect(typeof result.current.actions.resetGame).toBe('function');
    expect(typeof result.current.actions.updateVolume).toBe('function');
  });

  it('toggles pause state', () => {
    const { result } = renderHook(() => useGameplay());
    
    act(() => {
      result.current.actions.togglePause();
    });
    
    expect(result.current.controls.isPaused).toBe(true);
    
    act(() => {
      result.current.actions.togglePause();
    });
    
    expect(result.current.controls.isPaused).toBe(false);
  });

  it('toggles fullscreen state', () => {
    const { result } = renderHook(() => useGameplay());
    
    act(() => {
      result.current.actions.toggleFullscreen();
    });
    
    expect(result.current.controls.isFullscreen).toBe(true);
    
    act(() => {
      result.current.actions.toggleFullscreen();
    });
    
    expect(result.current.controls.isFullscreen).toBe(false);
  });

  it('toggles help visibility', () => {
    const { result } = renderHook(() => useGameplay());
    
    act(() => {
      result.current.actions.toggleHelp();
    });
    
    expect(result.current.controls.isHelpVisible).toBe(true);
    
    act(() => {
      result.current.actions.toggleHelp();
    });
    
    expect(result.current.controls.isHelpVisible).toBe(false);
  });

  it('resets game state', () => {
    const { result } = renderHook(() => useGameplay());
    
    // Najpierw zmieniamy stan
    act(() => {
      result.current.actions.togglePause();
    });
    
    expect(result.current.controls.isPaused).toBe(true);
    
    // Resetujemy stan
    act(() => {
      result.current.actions.resetGame();
    });
    
    expect(result.current.stats).toEqual({
      timeElapsed: 0,
      score: 0,
      lives: 3,
      currentLevel: 1,
    });
    
    expect(result.current.controls.isPaused).toBe(false);
  });

  it('updates volume', () => {
    const { result } = renderHook(() => useGameplay());
    
    act(() => {
      result.current.actions.updateVolume(0.5);
    });
    
    // @ts-ignore - volume jest dodawany dynamicznie przez updateVolume
    expect(result.current.controls.volume).toBe(0.5);
  });
}); 