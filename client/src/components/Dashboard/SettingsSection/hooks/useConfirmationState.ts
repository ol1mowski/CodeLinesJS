import { useState, useCallback } from 'react';

export const useConfirmationState = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  const handleHideConfirmation = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  return {
    showConfirmation,
    handleShowConfirmation,
    handleHideConfirmation
  };
}; 