import { useState, useRef } from 'react';
import { Message } from '../../../../../../types/messages.types';
import toast from 'react-hot-toast';

export const useMessageActions = (message: Message) => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleReaction = (reaction: string) => {
    console.log('Dodano reakcję:', reaction, 'do wiadomości:', message._id);
    setShowActions(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Skopiowano wiadomość');
    setShowActions(false);
  };

  const handleReport = () => {
    console.log('Zgłoszono wiadomość:', message._id);
    toast.success('Wiadomość została zgłoszona');
    setShowActions(false);
  };

  const toggleActions = () => setShowActions(!showActions);
  const closeActions = () => setShowActions(false);

  return {
    showActions,
    menuRef,
    buttonRef,
    handleReaction,
    handleCopy,
    handleReport,
    toggleActions,
    closeActions
  };
}; 