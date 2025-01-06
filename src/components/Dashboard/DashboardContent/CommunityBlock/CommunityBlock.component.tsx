import { motion } from "framer-motion";
import { memo } from "react";
import { FaTrophy, FaUserCircle } from "react-icons/fa";
import { dashboardContentStyles as styles } from "../DashboardContent.styles";

type LeaderboardPlayer = {
  id: string;
  name: string;
  points: number;
  rank: number;
};

// Przykładowe dane
const leaderboardData: LeaderboardPlayer[] = [
  { id: "1", name: "MasterCoder", points: 1250, rank: 1 },
  { id: "2", name: "JSNinja", points: 1100, rank: 2 },
  { id: "3", name: "WebWarrior", points: 950, rank: 3 },
  { id: "4", name: "CodeWizard", points: 800, rank: 4 },
  { id: "5", name: "BugHunter", points: 750, rank: 5 },
];

const playerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

export const CommunityBlock = memo(() => {
  return (
    <div className="space-y-4">
      <div className={styles.card.header}>
        <h2 className={styles.card.title}>Społeczność</h2>
        <span className={`${styles.text.secondary} px-3 py-1 rounded-full bg-indigo-500/10`}>
          Top 5
        </span>
      </div>

      <div className="space-y-3">
        {leaderboardData.map((player, index) => (
          <motion.div
            key={player.id}
            variants={playerVariants}
            custom={index}
            className={`
              flex items-center justify-between
              p-3 rounded-lg
              ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : 'bg-gray-800/30'}
              hover:bg-gray-800/50 transition-colors
              group
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/30 text-gray-400'}
              `}>
                {index === 0 ? <FaTrophy /> : <FaUserCircle />}
              </div>
              <div>
                <p className={`${styles.text.primary} group-hover:text-white transition-colors`}>
                  {player.name}
                </p>
                <p className={styles.text.secondary}>
                  {player.points} punktów
                </p>
              </div>
            </div>
            <div className={`
              w-6 h-6 rounded-full 
              flex items-center justify-center
              ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700/30 text-gray-400'}
              text-sm font-medium
            `}>
              #{player.rank}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

CommunityBlock.displayName = "CommunityBlock"; 