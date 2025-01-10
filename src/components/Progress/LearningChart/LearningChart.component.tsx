import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { week: 'Tydz 1', progress: 25, tasks: 15 },
  { week: 'Tydz 2', progress: 45, tasks: 28 },
  { week: 'Tydz 3', progress: 65, tasks: 42 },
  { week: 'Tydz 4', progress: 85, tasks: 56 },
  { week: 'Tydz 5', progress: 95, tasks: 64 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a]/90 border border-[#f7df1e]/20 p-4 rounded-lg shadow-lg">
        <p className="text-[#f7df1e] font-bold mb-1">{label}</p>
        <p className="text-gray-400">
          <span className="text-[#f7df1e]">Postęp:</span> {payload[0].value}%
        </p>
        <p className="text-gray-400">
          <span className="text-[#f7df1e]">Zadania:</span> {payload[1].value}
        </p>
      </div>
    );
  }
  return null;
};

export const LearningChart = () => (
  <div className="p-6 space-y-6">
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

    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(247, 223, 30, 0.1)" 
          />
          <XAxis 
            dataKey="week" 
            stroke="#666"
            tick={{ fill: '#666' }}
          />
          <YAxis 
            stroke="#666"
            tick={{ fill: '#666' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              color: '#f7df1e',
              fontFamily: "'Space Grotesk', sans-serif"
            }}
          />
          <Line
            type="monotone"
            dataKey="progress"
            name="Postęp nauki"
            stroke="rgba(247, 223, 30, 0.8)"
            strokeWidth={2}
            dot={{ 
              fill: '#1a1a1a',
              stroke: 'rgba(247, 223, 30, 0.8)',
              strokeWidth: 2,
              r: 6
            }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="tasks"
            name="Ukończone zadania"
            stroke="rgba(247, 223, 30, 0.4)"
            strokeWidth={2}
            dot={{ 
              fill: '#1a1a1a',
              stroke: 'rgba(247, 223, 30, 0.4)',
              strokeWidth: 2,
              r: 6
            }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
); 