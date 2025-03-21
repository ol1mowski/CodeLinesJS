import { useEffect, useCallback } from 'react';

type KeyboardShortcutsProps = {
  onEscape?: () => void;
  onEnter?: () => void;
  onNumber1?: () => void;
  onNumber2?: () => void;
  onNumber3?: () => void;
  onNumber4?: () => void;
  disabled?: boolean;
};

export const useKeyboardShortcuts = ({ 
  onEscape, 
  onEnter,
  onNumber1,
  onNumber2,
  onNumber3,
  onNumber4,
  disabled = false 
}: KeyboardShortcutsProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Escape':
        onEscape?.();
        break;
      case 'Enter':
        onEnter?.();
        break;
      case '1':
        onNumber1?.();
        break;
      case '2':
        onNumber2?.();
        break;
      case '3':
        onNumber3?.();
        break;
      case '4':
        onNumber4?.();
        break;
    }
  }, [onEscape, onEnter, onNumber1, onNumber2, onNumber3, onNumber4, disabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}; 