import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { formatINR } from '../../utils/calculations';

interface ProfitBarChartProps {
  totalCost: number;
  expectedRevenue: number;
  estimatedProfit: number;
}

export const ProfitBarChart: React.FC<ProfitBarChartProps> = ({
  totalCost,
  expectedRevenue,
  estimatedProfit,
}) => {
  const data = [
    { name: 'Total Farm Cost', amount: totalCost, fill: '#64748b' },
    { name: 'Gross Revenue', amount: expectedRevenue, fill: '#0284c7' },
    { name: 'Estimated Profit', amount: estimatedProfit, fill: '#16a34a' },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            stroke="#cbd5e1"
            tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
          />
          <Tooltip
            formatter={(value: any) => [formatINR(Number(value)), 'Amount']}
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={45}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
