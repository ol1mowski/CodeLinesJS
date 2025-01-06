import { motion } from "framer-motion";
import { memo } from "react";
import { FaPlay, FaRedo } from "react-icons/fa";
import { dashboardContentStyles as styles } from "../DashboardContent.styles";

const buttonVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const GameBlock = memo(() => {
  const hasActiveGame = true; // DUMMY DATA

  return (
    <div className="space-y-6">
      <div className={styles.card.header}>
        <h2 className={styles.card.title}>Graj</h2>
        {hasActiveGame && (
          <span className={`${styles.text.secondary} px-3 py-1 rounded-full bg-green-500/10 text-green-400`}>
            W trakcie
          </span>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-6 pt-8">
        {hasActiveGame ? (
          <>
            <div className="text-center">
              <h3 className={`${styles.text.primary} text-xl mb-2`}>
                Masz aktywną grę
              </h3>
              <p className={styles.text.secondary}>
                Kontynuuj swoją przygodę z JavaScript
              </p>
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`
                flex items-center gap-2 px-6 py-3
                bg-gradient-to-r from-green-500 to-emerald-500
                rounded-lg text-white font-medium
                shadow-lg shadow-green-500/20
                hover:shadow-xl hover:shadow-green-500/30
                transition-shadow
              `}
            >
              <FaRedo className="text-lg" />
              Kontynuuj
            </motion.button>
          </>
        ) : (
          <>
            <div className="text-center">
              <h3 className={`${styles.text.primary} text-xl mb-2`}>
                Rozpocznij nową grę
              </h3>
              <p className={styles.text.secondary}>
                Sprawdź swoje umiejętności JavaScript
              </p>
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`
                flex items-center gap-2 px-6 py-3
                bg-gradient-to-r from-blue-500 to-indigo-500
                rounded-lg text-white font-medium
                shadow-lg shadow-indigo-500/20
                hover:shadow-xl hover:shadow-indigo-500/30
                transition-shadow
              `}
            >
              <FaPlay className="text-lg" />
              Nowa gra
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
});

GameBlock.displayName = "GameBlock"; 