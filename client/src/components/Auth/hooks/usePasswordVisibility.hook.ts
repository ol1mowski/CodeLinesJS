import { useState } from 'react';
export const usePasswordVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => setIsVisible(prev => !prev);
  
  return {
    isVisible,
    toggleVisibility,
    inputType: isVisible ? 'text' : 'password'
  };
}; 