import { useRef, useEffect } from "react";

export const useScrollToBottom = (messages: any[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  return {
    messagesEndRef,
    scrollToBottom
  };
}; 