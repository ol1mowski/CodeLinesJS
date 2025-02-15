import { useRef, useState, useEffect } from 'react';

export const useMessageActionsMenu = () => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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