import { memo } from "react";
import { motion } from "framer-motion";
import { dashboardContentStyles as styles } from "./style/DashboardContent.styles";
import { CommunityBlock } from "./CommunityBlock/CommunityBlock.component";
import { GameBlock } from "./GameBlock/GameBlock.component";
import { StatsBlock } from "./StatsBlock/StatsBlock.component";
import { DashboardState } from "./components/DashboardState.component";
import { useDashboardData } from "./hooks/useDashboardData";
import { useDashboardAnimation } from "./hooks/useDashboardAnimation";

export const DashboardContent = memo(() => {
  const { data, isLoading, error } = useDashboardData();
  const animations = useDashboardAnimation();

  if (isLoading) {
    return <DashboardState type="loading" />;
  }

  if (error) {
    return <DashboardState type="error" message={error.message} />;
  }

  if (!data) {
    return <DashboardState type="empty" />;
  }

  return (
    <motion.div
      className="p-8 w-full"
      variants={animations.container}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className={`${styles.text.heading} text-3xl mb-12`}
        variants={animations.item}
      >
        Dashboard
      </motion.h1>

      <div className={styles.grid}>
        <motion.div
          variants={animations.item}
          className={styles.card.community}
        >
          <CommunityBlock 
            notifications={data.notifications} 
            unreadCount={data.unreadCount}
          />
        </motion.div>

        <motion.div
          variants={animations.item}
          className={styles.card.game}
        >
          <GameBlock />
        </motion.div>

        <motion.div
          variants={animations.item}
          className={styles.card.stats}
        >
          <StatsBlock stats={data.stats} />
        </motion.div>
      </div>
    </motion.div>
  );
});

DashboardContent.displayName = "DashboardContent"; 