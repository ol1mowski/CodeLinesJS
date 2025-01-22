import { createContext, useContext, useState, ReactNode } from 'react';
import { Toast } from '../UI/Toast/Toast.component';

type ToastType = 'success' | 'error';

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
  toast: { type: ToastType; message: string } | null;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const hideToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}; 