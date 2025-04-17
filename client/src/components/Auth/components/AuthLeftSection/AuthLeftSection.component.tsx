import { motion } from 'framer-motion';
import { AuthPhone } from '../AuthPhone/AuthPhone.component';
import { AuthWelcomeContent } from '../AuthWelcomeContent/AuthWelcomeContent.component';

export const AuthLeftSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="w-full md:w-3/5 flex flex-col md:flex-row items-center gap-6 md:gap-12 pr-0 md:pr-8"
  >
    <AuthPhone />
    <AuthWelcomeContent />
  </motion.div>
);
