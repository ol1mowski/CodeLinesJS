import { useState, useRef, useEffect } from 'react';
import { Message } from '../../../../../../types/messages.types';
import toast from 'react-hot-toast';

export const useMessageBubbleState = (message: Message) => {
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

  return {
    showActions,
    setShowActions,
    menuRef,
    buttonRef,
    handleReaction,
    handleCopy,
    handleReport
  };
}; 