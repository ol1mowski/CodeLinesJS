import { motion } from "framer-motion";

type MobileMenuItemProps = {
  href: string;
  label: string;
  index: number;
  onClick: () => void;
};

export const MobileMenuItem = ({ href, label, index, onClick }: MobileMenuItemProps) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1 },
    }}
    exit={{ opacity: 0, y: 20 }}
    whileHover={{ scale: 1.1 }}
    onClick={onClick}
    className="text-2xl text-gray-300 hover:text-indigo-400 font-inter transition-colors duration-200"
  >
    {label}
  </motion.a>
); 