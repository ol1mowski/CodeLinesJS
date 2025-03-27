import { useState, useCallback } from 'react';
import { Message } from '../../../../../../types/messages.types';

export const useDeleteModal = (onDelete: (messageId: string) => void) => {
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);

  const handleDelete = useCallback(() => {
    if (messageToDelete) {
      onDelete(messageToDelete._id);
      setMessageToDelete(null);
    }
  }, [messageToDelete, onDelete]);

  const openDeleteModal = (message: Message) => setMessageToDelete(message);
  const closeDeleteModal = () => setMessageToDelete(null);

  return {
    messageToDelete,
    handleDelete,
    openDeleteModal,
    closeDeleteModal
  };
}; 