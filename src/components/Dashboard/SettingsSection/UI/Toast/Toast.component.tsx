import { memo } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export const Toast = memo(({ message, type, onClose }: ToastProps) => (
  <div 
    className={`fixed bottom-6 right-6 py-3 px-4 rounded-lg shadow-xl 
      flex items-center gap-3 min-w-[300px] max-w-md
      backdrop-blur-md border
      ${type === 'success' 
        ? 'bg-green-500/10 border-green-500/20 text-green-400' 
        : 'bg-red-500/10 border-red-500/20 text-red-400'
      }
      animate-slide-up`}
  >
    {type === 'success' 
      ? <FaCheckCircle className="text-xl text-green-400" /> 
      : <FaTimesCircle className="text-xl text-red-400" />
    }
    <span className="flex-1 text-sm font-medium">{message}</span>
    <button 
      onClick={onClose}
      className={`text-sm hover:opacity-70 transition-opacity p-1
        ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}
      aria-label="Zamknij"
    >
      <FaTimes />
    </button>
  </div>
));

Toast.displayName = 'Toast'; 