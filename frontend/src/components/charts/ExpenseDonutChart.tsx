import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { FarmExpense } from '../../types';
import { formatINR } from '../../utils/calculations';

interface ExpenseDonutChartProps {
  expenses: FarmExpense[];
}

const COLORS: Record<string, string> = {
  Labour: '#15803d', // Forest green
  Fertilizer: '#0284c7', // Blue
  'Crop Protection': '#d97706', // Amber
  Irrigation: '#0d9488', // Teal
  Machinery: '#8b5cf6', // Violet
  Transport: '#e11d48', // Rose
  Packaging: '#ca8a04', // Yellow
  Other: '#64748b', // Slate
};

export const ExpenseDonutChart: React.FC<ExpenseDonutChartProps> = ({ expenses }) => {
  const categoryTotals: Record<string, number> = {};

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    color: COLORS[name] || '#94a3b8',
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-72 flex flex-col items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val: any) => [
              `${formatINR(Number(val))} (${((Number(val) / (total || 1)) * 100).toFixed(1)}%)`,
              'Cost',
            ]}
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <span className="text-[10px] text-gray-400 font-semibold uppercase block">Total Cost</span>
        <span className="text-base font-extrabold text-gray-900">{formatINR(total)}</span>
      </div>
    </div>
  );
};
