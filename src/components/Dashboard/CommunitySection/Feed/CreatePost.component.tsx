import { memo } from 'react';
import { motion } from 'framer-motion';
import { useCreatePost } from './hooks/useCreatePost.hook';

export const CreatePost = memo(() => {
  const {
    content,
    charCount,
    isCharLimitExceeded,
    isTooShort,
    isSubmitting,
    handleContentChange,
    handleSubmit,
    maxChars
  } = useCreatePost();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark/50 backdrop-blur-sm rounded-xl border border-js/10 p-6"
    >
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Co słychać w świecie kodu?"
          className={`p-5 w-full bg-transparent border-none focus:ring-0 
                     focus:outline-none focus:outline-yellow-500 focus:rounded-md 
                     text-gray-300 placeholder-gray-500 resize-none
                     ${isCharLimitExceeded ? 'text-red-400' : ''}`}
          rows={3}
        />
        <div className="absolute bottom-2 right-2 text-sm">
          <span className={`
            ${isCharLimitExceeded ? 'text-red-400' : 'text-gray-400'}
            ${isTooShort ? 'text-yellow-400' : ''}
          `}>
            {charCount}/{maxChars} znaków
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={isSubmitting || isCharLimitExceeded || isTooShort || !content.trim()}
          className={`px-6 py-2 rounded-lg bg-js text-dark font-medium 
                     transition-all duration-200 disabled:opacity-50 
                     disabled:cursor-not-allowed
                     ${isCharLimitExceeded ? 'bg-red-500' : ''}
                     ${isTooShort ? 'bg-yellow-500' : ''}`}
        >
          {isSubmitting ? 'Publikowanie...' : 'Opublikuj'}
        </motion.button>
      </div>
    </motion.div>
  );
});

CreatePost.displayName = 'CreatePost'; 