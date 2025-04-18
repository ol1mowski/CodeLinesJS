import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { blockStyles as styles } from '../style/block.styles';
import { useBlockAnimation } from '../hooks/useBlockAnimation';

export const CommunityBlock = memo(() => {
  const navigate = useNavigate();
  const animations = useBlockAnimation();

  const handleStartGame = () => {
    navigate('/dashboard/learn');
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
          <FaBook className={styles.header.icon} />
          Nauka
        </h2>
      </div>

      <div className={styles.content.wrapper}>
        <p className={styles.content.description}>
          Sprawdź najnowsze informacje i aktualności związane z nauką.
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
            Sprawdź aktualności
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

CommunityBlock.displayName = 'CommunityBlock';
