import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChatState } from '../useChatState';

vi.useFakeTimers();

describe('useChatState', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  it('should initialize with a welcome message from bot', () => {
    const { result } = renderHook(() => useChatState());

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]).toEqual({
      id: '1',
      text: 'Cześć! 👋 Jestem asystentem kodowania. Aktualnie jestem w fazie rozwoju, ale już wkrótce będę mógł Ci pomóc w nauce programowania!',
      sender: 'bot',
      timestamp: expect.any(Date)
    });
    expect(result.current.isTyping).toBe(false);
  });

  it('should add user message when addMessage is called', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('Test message');
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1]).toEqual({
      id: expect.any(String),
      text: 'Test message',
      sender: 'user',
      timestamp: expect.any(Date)
    });
  });

  it('should set isTyping to true when user sends message', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('Test message');
    });

    expect(result.current.isTyping).toBe(true);
  });

  it('should add bot response after delay and set isTyping to false', async () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('Test message');
    });

    expect(result.current.isTyping).toBe(true);
    expect(result.current.messages).toHaveLength(2);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.isTyping).toBe(false);
    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2]).toEqual({
      id: expect.any(String),
      text: expect.any(String),
      sender: 'bot',
      timestamp: expect.any(Date)
    });
  });

  it('should generate different bot responses for different user messages', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('kiedy będziesz gotowy?');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.messages).toHaveLength(3);
    const firstResponse = result.current.messages[2].text;

    act(() => {
      result.current.addMessage('dziękuję');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.messages).toHaveLength(5);
    const secondResponse = result.current.messages[4].text;

    expect(firstResponse).toContain('Pracujemy nad tym!');
    expect(secondResponse).toContain('Nie ma za co!');
  });

  it('should handle multiple messages in sequence', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('First message');
    });

    act(() => {
      result.current.addMessage('Second message');
    });

    expect(result.current.messages).toHaveLength(3);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.messages).toHaveLength(5);
    expect(result.current.isTyping).toBe(false);
  });

  it('should generate unique IDs for messages', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('Message 1');
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current.addMessage('Message 2');
    });

    const userMessageIds = result.current.messages
      .filter(msg => msg.sender === 'user')
      .map(msg => msg.id);

    expect(userMessageIds[0]).not.toBe(userMessageIds[1]);
  });

  it('should handle greeting messages correctly', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('cześć');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toContain('Cześć! 👋 Miło Cię poznać!');
  });

  it('should handle thank you messages correctly', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('dzięki');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toContain('Nie ma za co!');
  });

  it('should handle when/ready questions correctly', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('gdy będziesz gotowy?');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].text).toContain('Pracujemy nad tym!');
  });

  it('should use random response for unknown messages', () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.addMessage('random message');
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.messages).toHaveLength(3);
    const response = result.current.messages[2].text;
    const possibleResponses = [
      'Dziękuję za wiadomość! 🚧 Aktualnie jestem w fazie rozwoju',
      'Cześć! 👷‍♂️ Jestem jeszcze w budowie',
      'Hej! 🔧 Chat jest jeszcze w fazie testowej',
      'Witaj! ⚙️ Jestem w trakcie rozwoju'
    ];

    expect(possibleResponses.some(resp => response.includes(resp))).toBe(true);
  });
}); 