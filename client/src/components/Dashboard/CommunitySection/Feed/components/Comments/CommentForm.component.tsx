import { memo } from 'react';
import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CommentFormData } from '../../../types/comments.types';

type CommentFormProps = {
  register: UseFormRegister<CommentFormData>;
  errors: FieldErrors<CommentFormData>;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

export const CommentForm = memo(({ register, errors, onSubmit, isSubmitting }: CommentFormProps) => (
  <form onSubmit={onSubmit} className="flex gap-2">
    <div className="flex-1">
      <input
        {...register('content', {
          required: 'Treść komentarza jest wymagana',
          minLength: {
            value: 3,
            message: 'Komentarz musi mieć minimum 3 znaki'
          }
        })}
        placeholder="Napisz komentarz..."
        className={`w-full bg-dark/20 rounded-lg px-4 py-2 text-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-js/50 
                   placeholder-gray-500 ${errors.content ? 'ring-2 ring-red-500' : ''}`}
        disabled={isSubmitting}
      />
      {errors.content && (
        <span className="text-sm text-red-500 mt-1">
          {errors.content.message}
        </span>
      )}
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      disabled={isSubmitting}
      className="px-4 py-2 bg-js/20 hover:bg-js/30 text-js rounded-lg 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                min-w-[100px]"
    >
      {isSubmitting ? "Wysyłanie..." : "Wyślij"}
    </motion.button>
  </form>
));

CommentForm.displayName = 'CommentForm'; 