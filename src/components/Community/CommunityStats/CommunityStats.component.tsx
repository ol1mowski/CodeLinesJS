import { motion } from "framer-motion";
import { FaUsers, FaCode, FaComments, FaStar } from "react-icons/fa";

const stats = [
  {
    icon: FaUsers,
    label: "Aktywni Użytkownicy",
    value: "5,234",
    change: "+12%",
    color: "from-green-500/20 to-emerald-500/20",
    hoverColor: "from-green-500/30 to-emerald-500/30"
  },
  {
    icon: FaCode,
    label: "Rozwiązane Zadania",
    value: "12,456",
    change: "+8%",
    color: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "from-blue-500/30 to-cyan-500/30"
  },
  {
    icon: FaComments,
    label: "Dyskusje",
    value: "3,789",
    change: "+15%",
    color: "from-yellow-500/20 to-amber-500/20",
    hoverColor: "from-yellow-500/30 to-amber-500/30"
  },
  {
    icon: FaStar,
    label: "Oceny Kodu",
    value: "8,921",
    change: "+10%",
    color: "from-purple-500/20 to-pink-500/20",
    hoverColor: "from-purple-500/30 to-pink-500/30"
  }
];

export const CommunityStats = () => (
  <div className="w-full xl:w-1/2 space-y-6">
    <div className="flex items-center justify-between border-b border-[#f7df1e]/20 pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#f7df1e]/10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#f7df1e]"
          >
            <FaUsers className="w-6 h-6" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-[#f7df1e]">
          Statystyki
        </h2>
      </div>
      <span className="text-sm text-gray-400">
        Ostatni miesiąc
      </span>
    </div>

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
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-[#f7df1e]">
                  {stat.value}
                </p>
                <span className="text-sm font-medium text-green-400 mb-1">
                  {stat.change}
                </span>
              </div>
              <div className="mt-3 relative h-1.5 rounded-full bg-[#1a1a1a]/50 overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${stat.color}
                             group-hover:${stat.hoverColor} transition-all duration-300`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
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