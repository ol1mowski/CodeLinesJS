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

const COLORS = ['#818CF8', '#34D399', '#F472B6', '#FBBF24', '#60A5FA'];

export const CategoriesChart = memo(({ data }: CategoriesChartProps) => {
  const chartData = data.map(category => ({
    name: category.name,
    value: (category.completed / category.total) * 100,
    completed: category.completed,
    total: category.total,
  }));

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
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid rgba(107, 114, 128, 0.3)",
              borderRadius: "0.5rem",
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, "Ukończone"]}
            labelStyle={{ color: "#E5E7EB" }}
          />
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