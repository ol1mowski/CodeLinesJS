import { motion } from 'framer-motion';

interface MobileMenuItemProps {
  href: string;
  label: string;
  index: number;
  onClick: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1 },
  }),
  exit: { opacity: 0, y: 20 },
};

export const MobileMenuItem = ({ href, label, index, onClick }: MobileMenuItemProps) => (
  <motion.a
    href={href}
    custom={index}
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="text-2xl text-gray-300 hover:text-js font-mono transition-colors duration-200"
  >
    {label}
  </motion.a>
);
