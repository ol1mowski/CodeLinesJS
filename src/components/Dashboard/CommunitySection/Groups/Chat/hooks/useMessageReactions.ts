import { useCallback } from 'react';
import toast from 'react-hot-toast';

export const useMessageReactions = (messageId: string, onClose: () => void) => {
  const handleReaction = useCallback((reaction: string) => {
    console.log('Dodano reakcję:', reaction, 'do wiadomości:', messageId);
    toast.success('Dodano reakcję');
    onClose();
  }, [messageId, onClose]);

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '👏', '🤔'];

  return {
    handleReaction,
    reactions
  };
}; 