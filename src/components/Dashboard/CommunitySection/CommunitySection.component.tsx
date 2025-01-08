import { motion } from "framer-motion";
import { memo, useState } from "react";
import { CommunityNavigation } from "./Navigation/CommunityNavigation.component";
import { CommunityFeed } from "./Feed/CommunityFeed.component";
import { CommunityRanking } from "./Ranking/CommunityRanking.component";
import { CommunityGroups } from "./Groups/CommunityGroups.component";

type CommunityView = "feed" | "ranking" | "groups";

export const CommunitySection = memo(() => {
  const [activeView, setActiveView] = useState<CommunityView>("feed");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "feed":
        return <CommunityFeed />;
      case "ranking":
        return <CommunityRanking />;
      case "groups":
        return <CommunityGroups />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-violet-900"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-8">
          Społeczność
        </h1>

        <CommunityNavigation activeView={activeView} onViewChange={setActiveView} />
        
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {renderContent()}
        </motion.div>
      </div>
    </motion.div>
  );
});

CommunitySection.displayName = "CommunitySection"; 