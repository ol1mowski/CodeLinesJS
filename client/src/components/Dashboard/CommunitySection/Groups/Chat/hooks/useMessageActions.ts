import { useState, useRef, useCallback } from 'react';
import { Message } from '../../../../../../types/messages.types';
import toast from 'react-hot-toast';

type MessageActionsProps = {
  onEdit: (message: Message) => void;
  onDelete: (message: Message) => void;
  onReport: (message: Message) => void;
};

export const useMessageActions = (message: Message, actions: MessageActionsProps) => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleReaction = (reaction: string) => {
    console.log('Dodano reakcję:', reaction, 'do wiadomości:', message._id);
    setShowActions(false);
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(message.content);
    toast.success('Skopiowano wiadomość');
    setShowActions(false);
  }, [message.content]);

  const handleReport = useCallback(() => {
    actions.onReport(message);
    setShowActions(false);
  }, [message, actions.onReport]);

  const handleEdit = useCallback(() => {
    actions.onEdit(message);
    setShowActions(false);
  }, [message, actions.onEdit]);

  const handleDelete = useCallback(() => {
    actions.onDelete(message);
    setShowActions(false);
  }, [message, actions.onDelete]);

  const toggleActions = () => setShowActions(!showActions);
  const closeActions = () => setShowActions(false);

  return {
    showActions,
    menuRef,
    buttonRef,
    handleReaction,
    handleCopy,
    handleReport,
    handleEdit,
    handleDelete,
    toggleActions,
    closeActions
  };
}; 