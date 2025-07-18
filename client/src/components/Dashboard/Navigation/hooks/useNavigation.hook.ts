import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const location = useLocation();

  // Synchronizuj aktywny element z aktualną ścieżką
  useEffect(() => {
    const path = location.pathname;
    const currentItem = path.split('/').pop() || 'dashboard';
    setActiveItem(currentItem);
  }, [location]);

  // Automatycznie zwiń menu na mobilnych urządzeniach
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isExpanded,
    setIsExpanded,
    activeItem,
    setActiveItem,
  };
}; 