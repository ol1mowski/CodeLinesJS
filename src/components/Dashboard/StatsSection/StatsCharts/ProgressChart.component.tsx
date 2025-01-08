import { memo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ProgressChartProps = {
  data: Array<{
    date: string;
    points: number;
    challenges: number;
  }>;
};

export const ProgressChart = memo(({ data }: ProgressChartProps) => (
  <div className="w-full h-[300px]">
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF"
          tick={{ fill: "#9CA3AF" }}
        />
        <YAxis 
          stroke="#9CA3AF"
          tick={{ fill: "#9CA3AF" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            border: "1px solid rgba(107, 114, 128, 0.3)",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "#E5E7EB" }}
          itemStyle={{ color: "#E5E7EB" }}
        />
        <Line
          type="monotone"
          dataKey="points"
          stroke="#818CF8"
          strokeWidth={2}
          dot={{ fill: "#818CF8", strokeWidth: 2 }}
          name="Punkty"
        />
        <Line
          type="monotone"
          dataKey="challenges"
          stroke="#34D399"
          strokeWidth={2}
          dot={{ fill: "#34D399", strokeWidth: 2 }}
          name="Wyzwania"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
));

ProgressChart.displayName = "ProgressChart"; 