import { motion } from "framer-motion";
import { FaBrain, FaClock, FaCode, FaStar } from "react-icons/fa";

const stats = [
  {
    icon: FaCode,
    label: "Ukończone Zadania",
    value: "42/50",
    progress: 84,
    color: "from-green-500/20 to-emerald-500/20",
    hoverColor: "from-green-500/30 to-emerald-500/30"
  },
  {
    icon: FaClock,
    label: "Czas Nauki",
    value: "28h 15m",
    progress: 70,
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "from-blue-500/30 to-cyan-500/30"
  },
  {
    icon: FaStar,
    label: "Zdobyte Punkty",
    value: "2,450 XP",
    progress: 92,
    color: "from-yellow-500/20 to-amber-500/20",
    hoverColor: "from-yellow-500/30 to-amber-500/30"
  },
  {
    icon: FaBrain,
    label: "Skuteczność",
    value: "95%",
    progress: 95,
    color: "from-purple-500/20 to-pink-500/20",
    hoverColor: "from-purple-500/30 to-pink-500/30"
  }
];

export const ProgressStats = () => (
  <div className="w-full xl:w-1/2 space-y-6">
    {/* Nagłówek */}
    <div className="flex items-center justify-between border-b border-[#f7df1e]/20 pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#f7df1e]/10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#f7df1e]"
          >
            <FaStar className="w-6 h-6" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-[#f7df1e]">
          Twoje Statystyki
        </h2>
      </div>
      <span className="text-sm text-gray-400">
        Aktualny postęp
      </span>
    </div>

    {/* Statystyki */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative p-4 rounded-xl border border-[#f7df1e]/10 bg-[#1a1a1a]/30 
                     hover:border-[#f7df1e]/20 hover:bg-[#1a1a1a]/50 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-[#f7df1e]/10 text-[#f7df1e] 
                          group-hover:bg-[#f7df1e]/20 group-hover:scale-110 transition-all duration-300">
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold text-[#f7df1e] mt-1">
                {stat.value}
              </p>
              <div className="mt-3 relative h-1.5 rounded-full bg-[#1a1a1a]/50 overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${stat.color}
                             group-hover:${stat.hoverColor} transition-all duration-300`}
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
); 