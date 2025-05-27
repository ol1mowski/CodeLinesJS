import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatButton } from './components/ChatButton/ChatButton.component';
import { ChatWindow } from './components/ChatWindow/ChatWindow.component';
import { MessageBubble } from './components/MessageBubble/MessageBubble.component';
import { useChatState } from './hooks/useChatState';
import { useMobileDetect } from '../../hooks/useMobileDetect';

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState<string>('Cześć! 👋 Sprawdź nowego asystenta kodowania!');
  const [showBubble, setShowBubble] = useState(false);
  const { messages, addMessage, isTyping } = useChatState();
  const isMobile = useMobileDetect();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessages(false); 
      setShowBubble(false); 
    }
  };


  const openChatFromBubble = () => {
    setShowBubble(false);
    setHasNewMessages(false);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      const bubbleTimer = setTimeout(() => {
        console.log('Showing automatic bubble');
        setShowBubble(true);
        
        setTimeout(() => {
          console.log('Hiding automatic bubble');
          setShowBubble(false);
        }, 4000);
      }, 3000);

      const notificationTimer = setTimeout(() => {
        console.log('Showing automatic notification badge');
        setHasNewMessages(true);
      }, 5000);

      return () => {
        clearTimeout(bubbleTimer);
        clearTimeout(notificationTimer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    console.log('Messages changed:', messages.length, 'isOpen:', isOpen);
    
    if (messages.length > 1 && !isOpen) { 
      const lastMessage = messages[messages.length - 1];
      console.log('Last message:', lastMessage);
      
      if (lastMessage.sender === 'bot') {
        console.log('Showing bubble for bot message');
        
        setTimeout(() => {
          setBubbleMessage(lastMessage.text);
          setShowBubble(true);
          
          setTimeout(() => {
            console.log('Hiding bubble');
            setShowBubble(false);
          }, 4000);
        }, 1000);

        setTimeout(() => {
          console.log('Showing notification badge');
          setHasNewMessages(true);
        }, 2000);
      }
    }
  }, [messages, isOpen]);

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  console.log('Render - showBubble:', showBubble, 'bubbleMessage:', bubbleMessage.substring(0, 20));

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