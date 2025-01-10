import { motion } from "framer-motion";

import { DiJavascript } from "react-icons/di";
import { challenges } from "../../../data/challengesData.data";

export const ChallengesList = () => (
  <div className="w-full xl:w-1/2 space-y-6">
    <div className="flex items-center justify-between border-b border-[#f7df1e]/20 pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#f7df1e]/10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#f7df1e]"
          >
            <DiJavascript className="w-6 h-6" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-[#f7df1e]">
          Wyzwania
        </h2>
      </div>
      <span className="text-sm text-gray-400">
        Sprawdź swoje umiejętności
      </span>
    </div>

    <div className="grid gap-4">
      {challenges.map((challenge, index) => (
        <motion.div
          key={challenge.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group p-4 rounded-xl border border-[#f7df1e]/10 bg-[#1a1a1a]/30 
                     hover:border-[#f7df1e]/20 hover:bg-[#1a1a1a]/50 transition-all duration-300
                     hover:shadow-lg hover:shadow-[#f7df1e]/5"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-[#f7df1e]/10 text-[#f7df1e] 
                          group-hover:bg-[#f7df1e]/20 group-hover:scale-110 transition-all duration-300">
              <challenge.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-[#f7df1e] group-hover:translate-x-1 transition-transform duration-300">
                  {challenge.title}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-[#f7df1e]/5 border border-[#f7df1e]/10 text-gray-400">
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {challenge.description}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-4">
                  <span className="text-sm text-gray-400">
                    🏆 {challenge.xp} XP
                  </span>
                  <span className="text-sm text-gray-400">
                    ⏱️ {challenge.timeEstimate}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-1.5 rounded-lg bg-[#f7df1e]/10 text-[#f7df1e] text-sm font-medium
                           hover:bg-[#f7df1e]/20 transition-colors duration-300"
                >
                  Rozpocznij
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
); 