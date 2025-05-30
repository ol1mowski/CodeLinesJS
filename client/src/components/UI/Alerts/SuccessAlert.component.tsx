import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

type SuccessAlertProps = {
  message: string;
  title?: string;
};

export const SuccessAlert = ({ message, title = 'Sukces!' }: SuccessAlertProps) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-start"
    >
      <FaCheckCircle className="mr-2 mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-semibold mb-1">{title}</p>
        <p>{message}</p>
      </div>
    </motion.div>
  );
};
