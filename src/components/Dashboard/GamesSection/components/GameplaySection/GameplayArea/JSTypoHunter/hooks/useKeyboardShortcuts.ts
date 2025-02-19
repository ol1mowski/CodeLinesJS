import { useEffect, useCallback } from 'react';

type KeyboardShortcutsProps = {
  onEscape?: () => void;
  onEnter?: () => void;
  disabled?: boolean;
};

export const useKeyboardShortcuts = ({ onEscape, onEnter, disabled = false }: KeyboardShortcutsProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Escape':
        onEscape?.();
        break;
      case 'Enter':
        onEnter?.();
        break;
    }
  }, [onEscape, onEnter, disabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}; 