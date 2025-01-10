import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";

const chartData = [
  { week: 'Tydz 1', progress: 25, tasks: 15 },
  { week: 'Tydz 2', progress: 45, tasks: 28 },
  { week: 'Tydz 3', progress: 65, tasks: 42 },
  { week: 'Tydz 4', progress: 85, tasks: 56 },
  { week: 'Tydz 5', progress: 95, tasks: 64 }
];

export const LearningChart = () => (
  <div className="p-6 space-y-6">
    {/* Nagłówek */}
    <div className="flex items-center justify-between border-b border-[#f7df1e]/20 pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#f7df1e]/10">
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#f7df1e]"
          >
            <FaChartLine className="w-6 h-6" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-[#f7df1e]">
          Wykres Postępów
        </h2>
      </div>
      <span className="text-sm text-gray-400">
        Ostatnie 5 tygodni
      </span>
    </div>

    {/* Wykres */}
    <div className="h-64 flex items-end gap-4 pb-6 relative">
      {/* Linie pomocnicze */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[0, 25, 50, 75, 100].map((value) => (
          <div
            key={value}
            className="w-full h-px bg-[#f7df1e]/10 relative"
          >
            <span className="absolute -left-8 -top-2 text-xs text-gray-500">
              {value}%
            </span>
          </div>
        ))}
      </div>

      {/* Słupki */}
      <div className="relative z-10 flex-1 flex items-end justify-between gap-2">
        {chartData.map((data, index) => (
          <motion.div
            key={data.week}
            className="group relative flex flex-col items-center gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-[#f7df1e] text-black px-2 py-1 rounded text-xs whitespace-nowrap">
                {data.tasks} zadań
              </div>
            </div>

            {/* Słupek */}
            <motion.div
              className="w-8 bg-gradient-to-t from-[#f7df1e]/20 to-[#f7df1e]/40 rounded-t 
                         group-hover:from-[#f7df1e]/30 group-hover:to-[#f7df1e]/60 transition-all"
              initial={{ height: 0 }}
              animate={{ height: `${data.progress}%` }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
            <span className="text-xs text-gray-400">{data.week}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
); 