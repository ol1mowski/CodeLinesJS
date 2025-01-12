import { memo } from 'react';
import { motion } from "framer-motion";
import { Message } from '../types/types';

type ChatMessageProps = Message & {
  displayedMessage: string;
  isCurrentMessage: boolean;
  cursorVisible: boolean;
};

export const ChatMessage = memo(({ user, avatar, time, displayedMessage, isCurrentMessage, cursorVisible }: ChatMessageProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: displayedMessage.length > 0 ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-start gap-3"
  >
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="w-10 h-10 rounded-full bg-js/10 flex items-center justify-center text-xl"
    >
      {avatar}
    </motion.div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-js">{user}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="p-3 rounded-lg bg-dark/50 border border-js/10 text-gray-300">
        {displayedMessage}
        {isCurrentMessage && (
          <span className={`ml-0.5 -mt-1 text-gray-300 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
            |
          </span>
        )}
      </div>
    </div>
  </motion.div>
));

ChatMessage.displayName = 'ChatMessage'; 