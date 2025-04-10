import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProgress } from "../lib/api/progress";
import { LearningPaths } from "../LearningPaths/LearningPaths.component";
import { Lessons } from "../Lessons/Lessons.component";
import { Resources } from "../Resources/Resources.component";
import { SectionTitle } from "../../../UI/SectionTitle/SectionTitle.component";
import { useAuth } from "../../../../hooks/useAuth";

type TabType = "paths" | "lessons" | "resources";
const LearnTabs = ({ activeTab, onTabChange }: { activeTab: TabType; onTabChange: (tab: TabType) => void }) => {
  const tabs = [
    { id: "paths", label: "Ścieżki nauki" },
    { id: "lessons", label: "Lekcje" },
    { id: "resources", label: "Materiały" }
  ];

  return (
    <div className="flex space-x-4 border-b border-js/10 pb-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as TabType)}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === tab.id ? "text-js border-b-2 border-js" : "text-gray-400 hover:text-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export const LearnSection = memo(() => {
  const [activeTab, setActiveTab] = useState<TabType>("paths");
  const userId = "current-user";
  const { token } = useAuth();

  useQuery({
    queryKey: ['userProgress', userId],
    queryFn: () => fetchUserProgress(userId, token || ''),
    enabled: activeTab === "lessons" && !!token
  });

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
      className="py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Nauka JavaScript"
          subtitle="Wybierz swoją ścieżkę nauki i rozpocznij przygodę z JS"
          className="mb-8"
          titleClassName="text-js drop-shadow-lg"
          subtitleClassName="text-gray-400"
        />

        <div className="bg-dark-800/50 border border-js/10 rounded-xl p-6">
          <LearnTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="mt-8"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}); 