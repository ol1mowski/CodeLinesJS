import { motion } from 'framer-motion';
import { AuthWelcomeContent } from '../AuthWelcomeContent/AuthWelcomeContent.component';

export const AuthLeftSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="w-full max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left px-4 sm:px-0"
  >
    <AuthWelcomeContent />
  </motion.div>
);
