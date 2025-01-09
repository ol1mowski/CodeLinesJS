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
        className="fixed inset-0 bg-[#1a1a1a]/98 backdrop-blur-lg z-40"
      >
        <MobileMenuContent onClose={onClose} />
      </motion.div>
    )}
  </AnimatePresence>
); 