import { memo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ProgressChartProps = {
  data: Array<{
    date: string;
    progress: number;
  }>;
};

export const ProgressChart = memo(({ data }: ProgressChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark/90 px-4 py-2 rounded-lg border border-js/10">
          <p className="text-js font-medium">{label}</p>
          <p className="text-gray-300">
            Postęp: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
          <XAxis 
            dataKey="date" 
            stroke="#666" 
            tick={{ fill: '#666' }}
          />
          <YAxis 
            stroke="#666" 
            tick={{ fill: '#666' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#f7df1e"
            strokeWidth={2}
            dot={{ 
              fill: '#1a1a1a',
              stroke: '#f7df1e',
              strokeWidth: 2,
              r: 4
            }}
            activeDot={{ 
              fill: '#f7df1e',
              stroke: '#1a1a1a',
              strokeWidth: 2,
              r: 6 
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

ProgressChart.displayName = "ProgressChart"; 