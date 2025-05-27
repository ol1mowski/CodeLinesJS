import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from '../../hooks/useChatState';
import { ChatHeader } from './components/ChatHeader/ChatHeader.component';
import { ChatMessages } from './components/ChatMessages/ChatMessages.component';
import { ChatInput } from './components/ChatInput/ChatInput.component';
import { useMobileDetect } from '../../../../hooks/useMobileDetect';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isTyping: boolean;
}

export const ChatWindow = ({ messages, onSendMessage, onClose, isTyping }: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetect();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      className={`
        bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden
        ${isMobile 
          ? 'fixed inset-4 top-16 bottom-20 w-auto h-auto' 
          : 'w-80 h-96'
        }
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChatHeader onClose={onClose} />
      
      <ChatMessages 
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />
      
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    </motion.div>
  );
}; 