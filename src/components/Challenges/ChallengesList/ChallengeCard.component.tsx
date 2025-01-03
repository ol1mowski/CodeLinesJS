import { motion } from "framer-motion";
import { DiJavascript1 } from "react-icons/di";

type ChallengeCardProps = {
  title: string;
  description: string;
  difficulty: "Łatwy" | "Średni" | "Trudny";
  index: number;
};

const difficultyColors = {
  "Łatwy": "from-green-500/20 to-emerald-500/20 group-hover:from-green-500/30 group-hover:to-emerald-500/30 text-emerald-400",
  "Średni": "from-yellow-500/20 to-orange-500/20 group-hover:from-yellow-500/30 group-hover:to-orange-500/30 text-orange-400",
  "Trudny": "from-red-500/20 to-rose-500/20 group-hover:from-red-500/30 group-hover:to-rose-500/30 text-rose-400",
};

export const ChallengeCard = ({ title, description, difficulty, index }: ChallengeCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all group hover:shadow-lg hover:shadow-indigo-500/10"
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg bg-gradient-to-br transition-colors ${difficultyColors[difficulty]}`}>
        <DiJavascript1 className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold font-space text-gray-100">{title}</h3>
          <span className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <p className="text-gray-400 font-inter">{description}</p>
      </div>
    </div>
  </motion.div>
); 