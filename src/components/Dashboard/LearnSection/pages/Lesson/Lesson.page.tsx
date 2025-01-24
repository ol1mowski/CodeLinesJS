import { motion } from "framer-motion";
import { memo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { lessons } from "../../mocks/lessons.data";
import { FaClock, FaStar, FaChevronLeft } from "react-icons/fa";
import { LessonContent } from "./LessonContent.component";
import { LessonNavigation } from "./LessonNavigation.component";

export const LessonPage = memo(() => {
  const { id } = useParams();
  const lesson = lessons.find(l => l.id === id);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!lesson) {
    return <div>Lekcja nie została znaleziona</div>;
  }

  const handleSectionChange = (index: number) => {
    setActiveSection(index);
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark/50 backdrop-blur-sm py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/learn" 
          className="inline-flex items-center gap-2 text-js hover:text-js/80 transition-colors mb-6"
        >
          <FaChevronLeft className="w-4 h-4" />
          Wróć do lekcji
        </Link>

        <div className="grid grid-cols-12 gap-8">
          <div className="hidden lg:block col-span-3">
            <div className="sticky top-8">
              <LessonNavigation
                sections={lesson.sections}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800/50 border border-js/10 rounded-xl p-6 md:p-8"
            >
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium
                      ${lesson.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                        lesson.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'}`}
                    >
                      {lesson.difficulty === 'beginner' ? 'Podstawowy' :
                       lesson.difficulty === 'intermediate' ? 'Średni' : 'Zaawansowany'}
                    </span>
                    <span className="flex items-center gap-1 text-js bg-js/10 px-2.5 py-1 rounded-lg text-sm">
                      <FaStar className="w-4 h-4" />
                      {lesson.xp} XP
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-js mb-4">
                    {lesson.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaClock className="w-4 h-4" />
                      {lesson.duration}
                    </span>
                  </div>
                </div>

                <LessonContent sections={lesson.sections} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

LessonPage.displayName = "LessonPage"; 