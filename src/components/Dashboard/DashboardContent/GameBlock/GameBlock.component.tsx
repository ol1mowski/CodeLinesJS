import { motion } from "framer-motion";
import { memo } from "react";
import { FaPlay, FaCode, FaRedo } from "react-icons/fa";
import { dashboardContentStyles as styles } from "../DashboardContent.styles";

const buttonVariants = {
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const GameButton = memo(({ icon: Icon, title, subtitle, gradient, onClick }: {
  icon: typeof FaPlay;
  title: string;
  subtitle: string;
  gradient: string;
  onClick: () => void;
}) => (
  <motion.button
    variants={buttonVariants}
    whileHover="hover"
    whileTap="tap"
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 p-4
      ${gradient}
      rounded-lg
      group transition-all
      hover:shadow-lg hover:shadow-indigo-500/10
    `}
  >
    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
      <Icon className="text-2xl text-white" />
    </div>
    <div className="text-left">
      <h3 className="text-white font-medium">{title}</h3>
      <p className="text-white/70 text-sm">{subtitle}</p>
    </div>
  </motion.button>
));

GameButton.displayName = "GameButton";

export const GameBlock = memo(() => {
  return (
    <div className="space-y-6">
      <div className={styles.card.header}>
        <h2 className={styles.card.title}>Graj</h2>
      </div>

      <div className="grid gap-4">
        <GameButton
          icon={FaPlay}
          title="Nowa gra"
          subtitle="Rozpocznij nową przygodę"
          gradient="bg-gradient-to-r from-blue-500 to-indigo-500"
          onClick={() => console.log('Nowa gra')}
        />

        <GameButton
          icon={FaCode}
          title="Wyzwania"
          subtitle="Sprawdź swoje umiejętności"
          gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
          onClick={() => console.log('Wyzwania')}
        />

        <GameButton
          icon={FaRedo}
          title="Kontynuuj"
          subtitle="Wróć do ostatniej gry"
          gradient="bg-gradient-to-r from-emerald-500 to-green-500"
          onClick={() => console.log('Kontynuuj')}
        />
      </div>
    </div>
  );
});

GameBlock.displayName = "GameBlock"; 