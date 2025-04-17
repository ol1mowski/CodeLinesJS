import { useState, useEffect } from 'react';
import { messages, typingText } from '../constants/messages.data';

export const useChatAnimation = () => {
  const [displayedMessages, setDisplayedMessages] = useState(messages.map(() => ''));
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (isTypingMessage && currentMessageIndex < messages.length) {
      const currentMessage = messages[currentMessageIndex].message;
      const currentDisplayed = displayedMessages[currentMessageIndex];

      if (currentDisplayed.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          const newMessages = [...displayedMessages];
          newMessages[currentMessageIndex] = currentMessage.slice(0, currentDisplayed.length + 1);
          setDisplayedMessages(newMessages);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1);
        }, 500);
      }
    } else if (currentMessageIndex === messages.length && !isTypingResponse) {
      setTimeout(() => {
        setIsTypingResponse(true);
      }, 1000);
    }
  }, [isTypingMessage, currentMessageIndex, displayedMessages, isTypingResponse]);

  useEffect(() => {
    if (isTypingResponse && displayedText.length < typingText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(typingText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTypingResponse, displayedText]);

  return {
    displayedMessages,
    currentMessageIndex,
    isTypingMessage,
    displayedText,
    isTypingResponse,
    cursorVisible,
    setIsTypingMessage,
  };
};
