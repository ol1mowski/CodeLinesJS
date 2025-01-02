import { motion } from "framer-motion";

type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="xl:hidden z-50 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25 transition-shadow"
    aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
  >
    <svg
      className="w-16 h-16 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <motion.path
        initial={false}
        animate={isOpen ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 6h16M4 12h16M4 18h16" }}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.button>
); 