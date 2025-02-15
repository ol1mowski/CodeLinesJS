import { useCallback } from 'react';
import { Message } from '../../../../../../types/messages.types';
import { useMessageActionsMenu } from './useMessageActionsMenu';
import { useMessageReactions } from './useMessageReactions';
import toast from 'react-hot-toast';

export const useMessageBubble = (
  message: Message,
  onEdit: (message: Message) => void,
  onDelete: (message: Message) => void,
  onReport: (message: Message) => void
) => {
  const { showActions, menuRef, buttonRef, toggleActions, closeActions } = useMessageActionsMenu();
  const { handleReaction, reactions } = useMessageReactions(message._id, closeActions);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(message.content);
    toast.success('Skopiowano wiadomość');
    closeActions();
  }, [message.content, closeActions]);

  const handleReport = useCallback(() => {
    onReport(message);
    closeActions();
  }, [message, onReport, closeActions]);

  const handleEditClick = useCallback(() => {
    onEdit(message);
    closeActions();
  }, [message, onEdit, closeActions]);

  const handleDeleteClick = useCallback(() => {
    onDelete(message);
    closeActions();
  }, [message, onDelete, closeActions]);

  return {
    showActions,
    menuRef,
    buttonRef,
    toggleActions,
    reactions,
    handleReaction,
    handleCopy,
    handleReport,
    handleEditClick,
    handleDeleteClick
  };
}; 