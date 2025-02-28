import { useRef, useState, useEffect } from 'react';

export const useMessageActionsMenu = () => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (
        showActions &&
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(target) && 
        !buttonRef.current.contains(target)
      ) {
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showActions]);

  const toggleActions = () => setShowActions(!showActions);
  const closeActions = () => setShowActions(false);

  return {
    showActions,
    menuRef,
    buttonRef,
    toggleActions,
    closeActions
  };
}; 