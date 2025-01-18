import { memo } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export const Toast = memo(({ message, type, onClose }: ToastProps) => (
  <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 
    ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
    {type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
    <span>{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-80">×</button>
  </div>
));

Toast.displayName = 'Toast'; 