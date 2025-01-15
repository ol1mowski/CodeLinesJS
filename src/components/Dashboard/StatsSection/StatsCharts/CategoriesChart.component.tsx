import { memo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

type CategoriesChartProps = {
  data: Array<{
    name: string;
    completed: number;
    total: number;
  }>;
};

const COLORS = [
  '#f7df1e', 
  '#fbbf24', 
  '#f59e0b', 
  '#92400e'
];

export const CategoriesChart = memo(({ data }: CategoriesChartProps) => {
  const chartData = data.map(category => ({
    name: category.name,
    value: (category.completed / category.total) * 100,
    completed: category.completed,
    total: category.total,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 px-4 py-2 rounded-lg border border-gray-700/50">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-white">
            Ukończono: {payload[0].value.toFixed(1)}%
          </p>
          <p className="text-gray-300 text-sm">
            ({payload[0].payload.completed}/{payload[0].payload.total})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            formatter={(value) => (
              <span className="text-gray-300">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

CategoriesChart.displayName = "CategoriesChart"; 