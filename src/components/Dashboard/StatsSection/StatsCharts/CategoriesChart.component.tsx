import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

type CategoriesChartProps = {
  data: Array<{
    name: string;
    completed: number;
    total: number;
  }>;
};

export const CategoriesChart = memo(({ data }: CategoriesChartProps) => {
  const chartData = data.map(item => ({
    name: item.name,
    progress: Math.round((item.completed / item.total) * 100)
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
        <XAxis 
          dataKey="name" 
          stroke="#666"
          tickLine={false}
          tick={{ fill: '#666' }}
          axisLine={{ stroke: '#333' }}
        />
        <YAxis 
          stroke="#666"
          tickLine={false}
          tick={{ fill: '#666' }}
          axisLine={{ stroke: '#333' }}
          label={{ 
            value: 'Postęp (%)', 
            angle: -90, 
            position: 'insideLeft',
            fill: '#666'
          }}
          domain={[0, 100]}
        />
        <Bar dataKey="progress" maxBarSize={50}>
          {chartData.map((_, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={`hsl(${index * 40}, 70%, 50%)`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});

CategoriesChart.displayName = "CategoriesChart"; 