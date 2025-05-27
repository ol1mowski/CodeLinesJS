import { motion } from 'framer-motion';
import { ChatMessage } from '../../../../hooks/useChatState';
import { MessageBubble } from './components/MessageBubble/MessageBubble.component';
import { TypingIndicator } from './components/TypingIndicator/TypingIndicator.component';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessages = ({ messages, isTyping, messagesEndRef }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <MessageBubble message={message} />
        </motion.div>
      ))}
      
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TypingIndicator />
        </motion.div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}; 