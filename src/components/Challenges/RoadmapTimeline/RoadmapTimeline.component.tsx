import { motion } from "framer-motion";
import { roadmapSteps } from "./roadmapSteps.data";


export const RoadmapTimeline = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between border-b border-[#f7df1e]/20 pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#f7df1e]/10">
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#f7df1e] text-xl"
          >
            🚀
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-[#f7df1e]">
          Mapa Rozwoju
        </h2>
      </div>
      <span className="text-sm text-gray-400">
        Twoja droga do mistrzostwa
      </span>
    </div>

    <div className="space-y-8 relative">
      <div className="absolute left-[21px] top-3 bottom-3 w-0.5 bg-[#f7df1e]/20" />
      
      {roadmapSteps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex gap-6"
        >
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-11 h-11 rounded-full bg-[#f7df1e]/10 border border-[#f7df1e]/20 flex items-center justify-center text-[#f7df1e]"
            >
              <step.icon className="w-5 h-5" />
            </motion.div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#f7df1e]">
                {step.title}
              </h3>
              <span className="text-sm text-gray-400 px-2 py-1 rounded-full bg-[#f7df1e]/5 border border-[#f7df1e]/10">
                {step.duration}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {step.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {step.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 rounded-full bg-[#f7df1e]/10 text-[#f7df1e]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
); 