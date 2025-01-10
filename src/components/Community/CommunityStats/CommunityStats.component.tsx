import { motion } from "framer-motion";
import { FaUsers, FaCode, FaStar, FaTrophy, FaGithub } from "react-icons/fa";

const stats = [
  {
    icon: FaUsers,
    label: "Społeczność",
    mainValue: "5,234",
    subValue: "+156 w tym tygodniu",
    trend: "+12%",
    details: [
      { label: "Aktywni", value: "3,421" },
      { label: "Online", value: "642" }
    ]
  },
  {
    icon: FaCode,
    label: "Rozwiązania",
    mainValue: "12,456",
    subValue: "Średnio 45/dzień",
    trend: "+8%",
    details: [
      { label: "Zaakceptowane", value: "89%" },
      { label: "Code Review", value: "2,341" }
    ]
  },
  {
    icon: FaGithub,
    label: "Projekty",
    mainValue: "1,289",
    subValue: "Aktywne repozytoria",
    trend: "+15%",
    details: [
      { label: "Współpraca", value: "456" },
      { label: "Pull Requests", value: "892" }
    ]
  }
];

const topUsers = [
  { name: "Michał K.", points: "2,345", avatar: "👨‍💻", badge: FaTrophy },
  { name: "Anna W.", points: "2,156", avatar: "👩‍💻", badge: FaStar },
  { name: "Tomek L.", points: "1,987", avatar: "🧑‍💻", badge: FaStar }
];

export const CommunityStats = () => (
  <div className="w-full xl:w-1/2 space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative p-6 rounded-xl border border-[#f7df1e]/10 bg-[#1a1a1a]/30 
                     hover:border-[#f7df1e]/20 hover:bg-[#1a1a1a]/50 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-[#f7df1e]/10 text-[#f7df1e] 
                          group-hover:bg-[#f7df1e]/20 group-hover:scale-110 transition-all duration-300">
              <stat.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
              {stat.trend}
            </span>
          </div>

          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              {stat.label}
            </h3>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#f7df1e]">
                {stat.mainValue}
              </span>
              <span className="text-sm text-gray-500 mt-1">
                {stat.subValue}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#f7df1e]/10">
            {stat.details.map((detail) => (
              <div key={detail.label}>
                <p className="text-xs text-gray-500 mb-1">{detail.label}</p>
                <p className="text-sm font-medium text-gray-300">{detail.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl border border-[#f7df1e]/10 bg-[#1a1a1a]/30"
    >
      <h3 className="text-xl font-bold text-[#f7df1e] mb-4">Top Programiści</h3>
      <div className="space-y-4">
        {topUsers.map((user, index) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between group hover:bg-[#1a1a1a]/50 p-3 rounded-lg 
                       transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#f7df1e]/10 flex items-center justify-center text-2xl">
                  {user.avatar}
                </div>
                <user.badge className="absolute -top-1 -right-1 w-5 h-5 text-[#f7df1e]" />
              </div>
              <div>
                <p className="font-medium text-gray-300">{user.name}</p>
                <p className="text-sm text-gray-500">{user.points} pkt</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 rounded-full bg-[#f7df1e]/10 text-[#f7df1e] text-sm font-medium"
            >
              #{index + 1}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
); 