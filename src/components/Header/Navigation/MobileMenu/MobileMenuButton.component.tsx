import { motion } from "framer-motion";

type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="xl:hidden z-50 w-10 h-10 flex items-center justify-center rounded-lg 
               border border-[#f7df1e]/20 bg-[#1a1a1a]/50 hover:bg-[#f7df1e]/10 
               backdrop-blur-sm transition-all"
    aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
  >
    <svg
      className="w-5 h-5 text-[#f7df1e]"
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