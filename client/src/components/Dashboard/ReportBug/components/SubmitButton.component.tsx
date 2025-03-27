import { memo } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

type SubmitButtonProps = {
  isSubmitting: boolean;
  label?: string;
  loadingLabel?: string;
};

export const SubmitButton = memo(({
  isSubmitting,
  label = "Wyślij zgłoszenie",
  loadingLabel = "Wysyłanie..."
}: SubmitButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-js text-dark font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-js/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
  >
    {isSubmitting ? (
      <>
        <span className="animate-spin h-5 w-5 border-2 border-dark border-t-transparent rounded-full"></span>
        <span>{loadingLabel}</span>
      </>
    ) : (
      <>
        <FaPaperPlane />
        <span>{label}</span>
      </>
    )}
  </motion.button>
));

SubmitButton.displayName = "SubmitButton"; 