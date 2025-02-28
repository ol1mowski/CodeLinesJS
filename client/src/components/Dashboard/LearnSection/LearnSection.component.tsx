import { motion } from "framer-motion";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { SectionTitle } from "../../UI/SectionTitle/SectionTitle.component";
import { Lessons } from "./Lessons/Lessons.component";
import { Resources } from "./Resources/Resources.component";
import { LearningPaths } from "./LearningPaths/LearningPaths.component";
import { LearnTabs } from "./LearnTabs/LearnTabs.component";
import { useAuth } from "./hooks/useAuth";
import { LoadingScreen } from "../../UI/LoadingScreen/LoadingScreen.component";

type TabType = "paths" | "lessons" | "resources" | "articles";

export const LearnSection = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  
  const activeTab = (searchParams.get("tab") as TabType) || "paths";

  const handleTabChange = (tab: TabType) => {
    setSearchParams(prev => {
      if (tab === "paths") {
        prev.delete("tab");
        prev.delete("filter");
      } else {
        prev.set("tab", tab);
      }
      return prev;
    });
  };

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

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center py-12">
        <LoadingScreen />
      </div>
    );
  }

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
          <LearnTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
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
            {activeTab === "paths" && <LearningPaths />}
            {activeTab === "lessons" && <Lessons />}
            {activeTab === "resources" && <Resources />}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

LearnSection.displayName = "LearnSection"; 