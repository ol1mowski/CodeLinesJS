import { Message } from '../../../../../../types/messages.types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

type ReportMessageModalProps = {
  message: Message;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, description: string) => void;
  isReporting: boolean;
};

type ReportForm = {
  reason: string;
  description: string;
};

const reportReasons = [
  { value: 'spam', label: 'Spam' },
  { value: 'abuse', label: 'Obraźliwa treść' },
  { value: 'inappropriate', label: 'Nieodpowiednia treść' },
  { value: 'other', label: 'Inne' }
];

export const ReportMessageModal = ({ message, isOpen, onClose, onSubmit, isReporting }: ReportMessageModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ReportForm>();

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data.reason, data.description);
    reset();
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark-800 rounded-xl p-6 max-w-md w-full mx-4 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-js">
                <FaExclamationTriangle />
                <h2 className="text-lg font-semibold">Zgłoś wiadomość</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="text-sm text-gray-400 border border-js/10 rounded-lg p-3">
              <p className="font-medium text-white mb-1">{message.author.username}</p>
              <p>{message.content}</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Powód zgłoszenia
                </label>
                <select
                  {...register("reason", { required: "Wybierz powód zgłoszenia" })}
                  className="w-full bg-dark/50 rounded-lg px-3 py-2 text-gray-200 
                           border border-js/10 focus:outline-none focus:border-js"
                >
                  <option value="">Wybierz powód...</option>
                  {reportReasons.map(reason => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Dodatkowy opis
                </label>
                <textarea
                  {...register("description", { 
                    required: "Opisz problem",
                    minLength: {
                      value: 10,
                      message: "Opis musi mieć minimum 10 znaków"
                    }
                  })}
                  className="w-full bg-dark/50 rounded-lg px-3 py-2 text-gray-200 
                           border border-js/10 focus:outline-none focus:border-js
                           min-h-[100px] resize-none"
                  placeholder="Opisz dlaczego zgłaszasz tę wiadomość..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-dark/50 text-gray-400 
                           hover:text-white transition-colors text-sm"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={isReporting}
                  className={`
                    px-4 py-2 rounded-lg bg-red-500 text-white font-medium 
                    transition-colors text-sm flex items-center gap-2
                    ${isReporting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}
                  `}
                >
                  {isReporting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Zgłaszanie...
                    </>
                  ) : (
                    'Zgłoś wiadomość'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 