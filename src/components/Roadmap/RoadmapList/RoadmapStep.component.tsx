import { motion } from "framer-motion";
import { IconType } from "react-icons";

type RoadmapStepProps = {
  title: string;
  description: string;
  Icon: IconType;
  topics: string[];
  index: number;
};

export const RoadmapStep = ({ title, description, Icon, topics, index }: RoadmapStepProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative pl-16 pb-12 last:pb-0"
  >
    <div className="absolute left-6 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-lg shadow-fuchsia-500/50" />
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-fuchsia-500/50 transition-all group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 group-hover:from-fuchsia-500/30 group-hover:to-pink-500/30 transition-colors">
          <Icon className="w-6 h-6 text-fuchsia-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold font-space text-gray-100 mb-2">{title}</h3>
          <p className="text-gray-400 font-inter mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 text-fuchsia-300 font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
); 