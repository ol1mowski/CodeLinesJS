import { motion } from "framer-motion";
import { IconType } from "react-icons";

type StatCardProps = {
  title: string;
  value: string;
  Icon: IconType;
  description: string;
  index: number;
};

export const StatCard = ({ title, value, Icon, description, index }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all group"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-colors">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold font-space text-gray-100 mb-1">{title}</h3>
        <p className="text-3xl font-bold font-space bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {value}
        </p>
        <p className="text-gray-400 font-inter text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
); 