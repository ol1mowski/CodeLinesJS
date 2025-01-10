import { motion, AnimatePresence } from "framer-motion";
import { MobileMenuContent } from "./MobileMenuContent.component";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MobileMenuContent onClose={onClose} />
      </motion.div>
    )}
  </AnimatePresence>
); 