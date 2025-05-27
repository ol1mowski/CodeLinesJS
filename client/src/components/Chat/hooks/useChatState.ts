import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const useChatState = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Cześć! 👋 Jestem asystentem kodowania. Aktualnie jestem w fazie rozwoju, ale już wkrótce będę mógł Ci pomóc w nauce programowania!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  }, []);

  return {
    messages,
    addMessage,
    isTyping
  };
};

const getBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  const mainResponses = [
    'Dziękuję za wiadomość! 🚧 Aktualnie jestem w fazie rozwoju i nie mogę jeszcze w pełni odpowiadać na pytania. Wkrótce będę gotowy do pomocy!',
    'Cześć! 👷‍♂️ Jestem jeszcze w budowie, ale już niedługo będę mógł Ci pomóc z programowaniem. Dziękuję za cierpliwość!',
    'Hej! 🔧 Chat jest jeszcze w fazie testowej. Już wkrótce będę w pełni funkcjonalny i pomogę Ci w nauce kodowania!',
    'Witaj! ⚙️ Jestem w trakcie rozwoju. Niedługo będę gotowy, żeby odpowiadać na wszystkie Twoje pytania o programowanie!'
  ];

  if (message.includes('kiedy') || message.includes('gdy') || message.includes('gotowy')) {
    return 'Pracujemy nad tym! 🚀 Chat będzie w pełni funkcjonalny już wkrótce. Śledź nasze aktualizacje!';
  }

  if (message.includes('dziękuję') || message.includes('dzięki') || message.includes('ok')) {
    return 'Nie ma za co! 😊 Cieszę się, że jesteś zainteresowany. Wróć wkrótce - będę gotowy do pomocy!';
  }

  if (message.includes('cześć') || message.includes('hej') || message.includes('witaj') || message.includes('hello')) {
    return 'Cześć! 👋 Miło Cię poznać! Jestem jeszcze w fazie rozwoju, ale już niedługo będę mógł Ci pomóc z programowaniem!';
  }

  return mainResponses[Math.floor(Math.random() * mainResponses.length)];
}; 