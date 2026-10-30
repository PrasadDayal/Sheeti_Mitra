import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MULTI_SEASON_DATA } from '../../data/mockData';
import { formatINR } from '../../utils/calculations';

export const MultiSeasonChart: React.FC<{ crop?: string }> = ({ crop = 'Grapes' }) => {
  const isGrapes = crop === 'Grapes';

  const chartData = MULTI_SEASON_DATA.map((d) => ({
    season: d.season,
    cost: isGrapes ? d.grapesCost : d.pomCost,
    revenue: isGrapes ? d.grapesRevenue : d.pomRevenue,
    profit: isGrapes ? d.grapesProfit : d.pomProfit,
    avgPrice: isGrapes ? d.grapesAvgPrice : 135,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="season" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: '#64748b' }}
            stroke="#cbd5e1"
            tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: '#64748b' }}
            stroke="#cbd5e1"
            unit="₹"
          />
          <Tooltip
            formatter={(value: any, name: any) => {
              if (name === 'Avg Realization (₹/kg)') return [`₹${value}/kg`, name];
              return [formatINR(Number(value)), name];
            }}
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Bar yAxisId="left" dataKey="cost" name="Farm Cost (₹)" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={25} />
          <Bar yAxisId="left" dataKey="revenue" name="Gross Revenue (₹)" fill="#0284c7" radius={[4, 4, 0, 0]} barSize={25} />
          <Bar yAxisId="left" dataKey="profit" name="Net Profit (₹)" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={25} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgPrice"
            name="Avg Realization (₹/kg)"
            stroke="#d97706"
            strokeWidth={3}
            dot={{ r: 4, fill: '#d97706' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
