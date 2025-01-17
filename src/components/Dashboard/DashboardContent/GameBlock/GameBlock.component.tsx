import { memo } from "react";
import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { gameBlockStyles as styles } from "./style/GameBlock.styles";
import { useGameBlockAnimation } from "./hooks/useGameBlockAnimation";

export const GameBlock = memo(() => {
  const navigate = useNavigate();
  const animations = useGameBlockAnimation();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <motion.div
      variants={animations.container}
      initial="hidden"
      animate="show"
      className={styles.container}
    >
      <div className={styles.header.wrapper}>
        <h2 className={styles.header.title}>
          <FaGamepad className={styles.header.icon} />
          Tryb Gry
        </h2>
      </div>

      <div className={styles.content.wrapper}>
        <p className={styles.content.description}>
          Rozpocznij nową sesję gry, rozwiązuj wyzwania i zdobywaj punkty.
          Sprawdź swoje umiejętności w praktyce!
        </p>

        <div className={styles.content.button.wrapper}>
          <motion.button
            onClick={handleStartGame}
            whileHover="hover"
            whileTap="tap"
            variants={animations.button}
            className={`
              ${styles.content.button.base}
              ${styles.content.button.hover}
              ${styles.content.button.active}
            `}
          >
            Rozpocznij Grę
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

GameBlock.displayName = "GameBlock"; 