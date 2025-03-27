import { motion } from "framer-motion";
import { memo } from "react";

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = memo(({ message }: ErrorMessageProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
  >
    {message}
  </motion.div>
));

ErrorMessage.displayName = "ErrorMessage"; 