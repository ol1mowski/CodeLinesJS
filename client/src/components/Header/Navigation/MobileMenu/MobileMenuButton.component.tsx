import { memo } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = memo(({ isOpen, onClick }: MobileMenuButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="xl:hidden z-50 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg 
               border border-js-light bg-dark-medium hover:bg-js-light 
               backdrop-blur-sm transition-all relative overflow-hidden"
    aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
  >
    <motion.div
      animate={{
        rotate: isOpen ? 90 : 0,
        opacity: isOpen ? 0 : 1,
        scale: isOpen ? 0.5 : 1,
      }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <HiOutlineMenuAlt2 className="w-5 h-5 text-js" />
    </motion.div>

    <motion.div
      animate={{
        rotate: isOpen ? 0 : -90,
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.5,
      }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <IoClose className="w-5 h-5 text-js" />
    </motion.div>
  </motion.button>
));

MobileMenuButton.displayName = 'MobileMenuButton';
