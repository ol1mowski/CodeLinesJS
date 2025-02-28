import { useState } from 'react';

export const useEmojiPicker = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);
  const closeEmojiPicker = () => setShowEmojiPicker(false);

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '👏', '🤔'];

  return {
    showEmojiPicker,
    emojis,
    toggleEmojiPicker,
    closeEmojiPicker
  };
}; 