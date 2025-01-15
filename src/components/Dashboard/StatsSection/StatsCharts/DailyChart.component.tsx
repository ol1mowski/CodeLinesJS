import { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type DailyChartProps = {
  data: Array<{
    date: string;
    points: number;
    challenges: number;
  }>;
};

export const DailyChart = memo(({ data }: DailyChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
        <XAxis 
          dataKey="date" 
          stroke="#666"
          tickLine={false}
        />
        <YAxis 
          stroke="#666"
          tickLine={false}
        />
        <Tooltip 
          contentStyle={{ 
            background: "#1A1A1A", 
            border: "1px solid #333",
            borderRadius: "4px"
          }}
        />
        <Line 
          type="monotone" 
          dataKey="points" 
          stroke="#F7DF1E" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

DailyChart.displayName = "DailyChart"; 