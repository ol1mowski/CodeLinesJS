import { motion } from "framer-motion";
import { memo } from "react";
import { FaUserCircle } from "react-icons/fa";
import { topNavigationStyles as styles } from "../TopNavigation.styles";

type WelcomeSectionProps = {
  username: string;
};

const welcomeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export const WelcomeSection = memo(({ username }: WelcomeSectionProps) => {
  return (
    <motion.div 
      className="flex items-center gap-4"
      variants={welcomeVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaUserCircle className="text-2xl text-indigo-400" />
      </motion.div>

      <div className="flex flex-col">
        <motion.span 
          variants={textVariants}
          className={`${styles.text.secondary} text-sm`}
        >
          Witaj z powrotem
        </motion.span>
        <motion.h2 
          variants={textVariants}
          className={`${styles.text.heading} text-xl bg-clip-text text-transparent ${styles.gradients.text}`}
        >
          {username}
        </motion.h2>
      </div>
    </motion.div>
  );
});

WelcomeSection.displayName = "WelcomeSection"; 