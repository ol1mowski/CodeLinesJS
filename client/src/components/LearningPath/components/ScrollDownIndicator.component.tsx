import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

type ScrollDownIndicatorProps = {
  targetId: string;
};

export const ScrollDownIndicator = ({ targetId }: ScrollDownIndicatorProps) => {
  const scrollToTarget = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
      onClick={scrollToTarget}
    >
      <span className="text-gray-400 text-sm mb-2">Przewiń w dół</span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-[#f7df1e]"
      >
        <FaChevronDown size={20} />
      </motion.div>
    </motion.div>
  );
}; 