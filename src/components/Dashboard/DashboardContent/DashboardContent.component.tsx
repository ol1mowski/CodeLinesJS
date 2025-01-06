import { motion } from "framer-motion";
import { memo } from "react";
import { dashboardContentStyles as styles } from "./DashboardContent.styles";
import { CommunityBlock } from "./CommunityBlock/CommunityBlock.component";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const DashboardContent = memo(() => {
  return (
    <motion.div
      className="p-8 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className={`${styles.text.heading} text-3xl mb-12`}
        variants={itemVariants}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Community Block */}
        <motion.div
          variants={itemVariants}
          className={`
            ${styles.card.base}
            ${styles.effects.glow}
            col-span-1 md:col-span-2 lg:col-span-1
            order-2 lg:order-1
          `}
        >
          <CommunityBlock />
        </motion.div>

        {/* Game Block */}
        <motion.div
          variants={itemVariants}
          className={`
            ${styles.card.base}
            ${styles.effects.glow}
            col-span-1 md:col-span-2 lg:col-span-1
            order-1 lg:order-2
          `}
        >
          <div className={styles.card.header}>
            <h2 className={styles.card.title}>Graj</h2>
          </div>
        </motion.div>

        {/* Stats Block */}
        <motion.div
          variants={itemVariants}
          className={`
            ${styles.card.base}
            ${styles.effects.glow}
            col-span-1 md:col-span-2 lg:col-span-1
            order-3
          `}
        >
          <div className={styles.card.header}>
            <h2 className={styles.card.title}>Statystyki</h2>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

DashboardContent.displayName = "DashboardContent"; 