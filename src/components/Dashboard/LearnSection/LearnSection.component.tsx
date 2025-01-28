import { motion } from "framer-motion";
import { memo, useState } from "react";
import { SectionTitle } from "../../UI/SectionTitle/SectionTitle.component";
import { Lessons } from "./Lessons/Lessons.component";
import { Resources } from "./Resources/Resources.component";
import { LearningPaths } from "./LearningPaths/LearningPaths.component";
import { LearnTabs } from "./LearnTabs/LearnTabs.component";
import { useAuth } from "./hooks/useAuth";
import { LoadingSpinner } from "./components/UI/LoadingSpinner.component";


type TabType = "paths" | "lessons" | "resources" | "articles";

export const LearnSection = memo(() => {
  const [activeTab, setActiveTab] = useState<TabType>("paths");
  const { token, isAuthenticated } = useAuth();

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
    if (!isAuthenticated) {
      return (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      );
    }

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
      className="min-h-screen bg-dark/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

LearnSection.displayName = "LearnSection"; 