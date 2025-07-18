import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatButton } from './components/ChatButton/ChatButton.component';
import { ChatWindow } from './components/ChatWindow/ChatWindow.component';
import { MessageBubble } from './components/MessageBubble/MessageBubble.component';
import { useChatState } from './hooks/useChatState';
import { useMobileDetect } from '../UI/hooks/useMobileDetect.hook';

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState<string>('Cześć! 👋 Sprawdź nowego asystenta kodowania!');
  const [showBubble, setShowBubble] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { messages, addMessage, isTyping } = useChatState();
  const isMobile = useMobileDetect();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true); 
    if (!isOpen) {
      setHasNewMessages(false); 
      setShowBubble(false); 
    }
  };


  const openChatFromBubble = () => {
    setShowBubble(false);
    setHasNewMessages(false);
    setIsOpen(true);
    setHasInteracted(true); 
  };

  useEffect(() => {
    if (!isOpen && !hasInteracted) {
      const bubbleTimer = setTimeout(() => {
        setShowBubble(true);
        
        setTimeout(() => {
          setShowBubble(false);
        }, 4000);
      }, 3000);

      const notificationTimer = setTimeout(() => {
        setHasNewMessages(true);
      }, 5000);

      return () => {
        clearTimeout(bubbleTimer);
        clearTimeout(notificationTimer);
      };
    }
  }, [isOpen, hasInteracted]);

  useEffect(() => {
    if (messages.length > 1 && !isOpen && !hasInteracted) { 
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.sender === 'bot') {
        
        setTimeout(() => {
          setBubbleMessage(lastMessage.text);
          setShowBubble(true);
          
          setTimeout(() => {
            setShowBubble(false);
          }, 4000);
        }, 1000);

        setTimeout(() => {
          setHasNewMessages(true);
        }, 2000);
      }
    }
  }, [messages, isOpen, hasInteracted]);

  const handleBackdropClick = () => {
    setIsOpen(false);
  };


  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[9998] ${isMobile ? 'bg-black/50' : 'bg-transparent'}`}
          onClick={handleBackdropClick}
        />
      )}

      <div className={`fixed z-[9999] ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'}`} style={{ zIndex: 9999 }}>
        <MessageBubble
          message={bubbleMessage}
          isVisible={showBubble && !isOpen}
          onClose={openChatFromBubble}
        />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={isMobile ? '' : 'mb-4'}
              onClick={(e) => e.stopPropagation()} 
              style={{ zIndex: 9999 }}
            >
              <ChatWindow
                messages={messages}
                onSendMessage={addMessage}
                onClose={toggleChat}
                isTyping={isTyping}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ChatButton 
          isOpen={isOpen}
          onClick={toggleChat}
          hasNewMessages={hasNewMessages}
        />
      </div>
    </>
  );
}; 