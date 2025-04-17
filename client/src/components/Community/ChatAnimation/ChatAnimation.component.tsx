import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { ChatHeader } from './components/ChatHeader.component';
import { ChatMessage } from './components/ChatMessage.component';
import { ChatInput } from './components/ChatInput.component';
import { useChatAnimation } from './hooks/useChatAnimation.hook';
import { messages } from './constants/messages.data';

export const ChatAnimation = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const {
    displayedMessages,
    currentMessageIndex,
    displayedText,
    isTypingResponse,
    cursorVisible,
    setIsTypingMessage,
  } = useChatAnimation();

  useEffect(() => {
    if (isInView) {
      setIsTypingMessage(true);
    }
  }, [isInView, setIsTypingMessage]);

  return (
    <div ref={containerRef} className="p-6 space-y-4">
      <ChatHeader />
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.time}
            {...msg}
            displayedMessage={displayedMessages[index]}
            isCurrentMessage={currentMessageIndex === index}
            cursorVisible={cursorVisible}
          />
        ))}
      </div>
      <ChatInput
        displayedText={displayedText}
        cursorVisible={cursorVisible}
        isTypingResponse={isTypingResponse}
      />
    </div>
  );
};
