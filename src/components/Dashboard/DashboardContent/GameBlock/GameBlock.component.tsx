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

const buttonStyles = {
  play: {
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
    borderHover: "group-hover:border-emerald-500/30",
    bgHover: "hover:bg-emerald-500/10"
  },
  challenge: {
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
    borderHover: "group-hover:border-blue-500/30",
    bgHover: "hover:bg-blue-500/10"
  },
  continue: {
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-500",
    borderHover: "group-hover:border-amber-500/30",
    bgHover: "hover:bg-amber-500/10"
  }
};

const GameButton = memo(({ icon: Icon, title, subtitle, type = 'play', onClick }: {
  icon: typeof FaPlay;
  title: string;
  subtitle: string;
  type?: 'play' | 'challenge' | 'continue';
  onClick: () => void;
}) => {
  const style = buttonStyles[type];
  
  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 p-4
        bg-dark/30 ${style.bgHover}
        rounded-lg border border-js/10 ${style.borderHover}
        group transition-all
      `}
    >
      <div className={`
        w-12 h-12 rounded-lg ${style.iconBg}
        flex items-center justify-center
        group-hover:scale-110 transition-transform
      `}>
        <Icon className={`text-2xl ${style.iconColor}`} />
      </div>
      <div className="text-left">
        <h3 className={`font-medium ${style.iconColor}`}>{title}</h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </motion.button>
  );
});

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
          type="play"
          onClick={() => console.log('Nowa gra')}
        />

        <GameButton
          icon={FaCode}
          title="Wyzwania"
          subtitle="Sprawdź swoje umiejętności"
          type="challenge"
          onClick={() => console.log('Wyzwania')}
        />

        <GameButton
          icon={FaRedo}
          title="Kontynuuj"
          subtitle="Wróć do ostatniej gry"
          type="continue"
          onClick={() => console.log('Kontynuuj')}
        />
      </div>
    </div>
  );
});

GameBlock.displayName = "GameBlock"; 