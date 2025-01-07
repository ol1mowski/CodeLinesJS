import { motion } from "framer-motion";
import { memo, useState } from "react";
import { LearnTabs } from "./LearnTabs/LearnTabs.component";
import { LearningPaths } from "./LearningPaths/LearningPaths.component";
import { Lessons } from "./Lessons/Lessons.component";
import { Resources } from "./Resources/Resources.component";


type TabType = "paths" | "lessons" | "resources";

export const LearnSection = memo(() => {
  const [activeTab, setActiveTab] = useState<TabType>("paths");

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
    switch (activeTab) {
      case "paths":
        return <LearningPaths />;
      case "lessons":
        return <Lessons />;
      case "resources":
        return <Resources />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-8">
          Nauka JavaScript
        </h1>

        <LearnTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <motion.div
          key={activeTab}
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

LearnSection.displayName = "LearnSection"; 