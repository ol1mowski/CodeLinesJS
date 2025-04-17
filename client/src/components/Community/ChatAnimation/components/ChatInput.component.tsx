import { memo } from 'react';
import { motion } from 'framer-motion';

type ChatInputProps = {
  displayedText: string;
  cursorVisible: boolean;
  isTypingResponse: boolean;
};

export const ChatInput = memo(
  ({ displayedText, cursorVisible, isTypingResponse }: ChatInputProps) => (
    <div className="flex gap-3">
      <div
        className="flex-1 bg-dark/50 border border-js/20 rounded-lg px-4 py-2 
                    text-js/60 cursor-not-allowed select-none relative"
      >
        {displayedText}
        <span
          className={`absolute ml-0.5 -mt-1 text-js/60 transition-opacity duration-100
                     ${cursorVisible && isTypingResponse ? 'opacity-100' : 'opacity-0'}`}
        >
          |
        </span>
      </div>
      <motion.button
        animate={{
          opacity: isTypingResponse ? 0.3 : 0.6,
          scale: isTypingResponse ? 0.95 : 1,
        }}
        disabled
        className="px-6 py-2 rounded-lg bg-js/10 text-js/60 font-medium
                 cursor-not-allowed select-none"
      >
        {isTypingResponse ? 'Pisanie...' : 'Wyślij'}
      </motion.button>
    </div>
  )
);

ChatInput.displayName = 'ChatInput';
