import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PricePointData {
  date: string;
  pimpalgaon: number;
  tasgaon: number;
  pune: number;
}

const getDynamicPriceData = (crop: string, range: '7d' | '30d'): PricePointData[] => {
  const isPom = crop === 'Pomegranate';
  const baseRate = isPom ? 142 : 102;
  const count = range === '7d' ? 7 : 5;
  const stepDays = range === '7d' ? 1 : 6;
  const list: PricePointData[] = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * stepDays * 86400000);
    const dateStr = i === 0 
      ? `${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} (Today)` 
      : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const factor = 1 - (i * (range === '7d' ? 0.012 : 0.025));
    list.push({
      date: dateStr,
      pimpalgaon: Math.round((baseRate - 4) * factor),
      tasgaon: Math.round(baseRate * factor),
      pune: Math.round((baseRate - 6) * factor),
    });
  }
  return list;
};

export const PriceLineChart: React.FC<{ crop?: string }> = ({ crop = 'Grapes' }) => {
  const { language } = useLanguage();
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [compareMarkets, setCompareMarkets] = useState<boolean>(false);

  const data = getDynamicPriceData(crop, timeRange);
  const bestMarketName = crop === 'Pomegranate' 
    ? (language === 'mr' ? 'सोलापूर APMC' : language === 'hi' ? 'सोलापूर APMC' : 'Solapur APMC')
    : (language === 'mr' ? 'तासगाव APMC' : language === 'hi' ? 'तासगांव APMC' : 'Tasgaon APMC');
  const bestMarketPrice = crop === 'Pomegranate' ? 148 : 106;

  const t = {
    mr: {
      bestMarketHeadline: 'आजचा सर्वोत्तम बाजारभाव',
      bestMarketLabel: 'आजचा सर्वोत्तम भाव:',
      unit: '/किलो',
      sevenDays: '📈 ७ दिवस',
      thirtyDays: '📅 ३० दिवस',
      showAll: 'सर्व बाजार दाखवत आहे',
      compare: 'बाजार तुलना करा',
      targetRate: '₹१०० लक्ष्य भाव',
      myMarket: 'तासगाव APMC (माझी बाजार समिती)',
      pimpalgaonMarket: 'पिंपळगाव APMC (नाशिक)',
      puneMarket: 'गुलटेकडी APMC (पुणे)',
    },
    hi: {
      bestMarketHeadline: 'आज का सर्वोत्तम मंडी भाव',
      bestMarketLabel: 'आज का सर्वोत्तम भाव:',
      unit: '/किग्रा',
      sevenDays: '📈 7 दिन',
      thirtyDays: '📅 30 दिन',
      showAll: 'सभी मंडियां दिख रही हैं',
      compare: 'मंडी तुलना करें',
      targetRate: '₹100 लक्ष्य भाव',
      myMarket: 'तासगांव APMC (मेरी मंडी)',
      pimpalgaonMarket: 'पिंपलगांव APMC (नाशिक)',
      puneMarket: 'गुलटेकड़ी APMC (पुणे)',
    },
    en: {
      bestMarketHeadline: 'Best Market Today',
      bestMarketLabel: "Today's Best Market:",
      unit: '/kg',
      sevenDays: '📈 7 Days',
      thirtyDays: '📅 30 Days',
      showAll: 'Showing All Markets',
      compare: 'Compare Markets',
      targetRate: '₹100 Target Rate',
      myMarket: 'Tasgaon APMC (My Market)',
      pimpalgaonMarket: 'Pimpalgaon APMC (Nashik)',
      puneMarket: 'Gultekdi APMC (Pune)',
    },
  }[language];

  return (
    <div className="space-y-4">
      {/* Top Bar: Headline Best Market + Time Tabs + Compare Markets Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
        {/* Today's Best Market Headline */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
              {t.bestMarketHeadline}
            </span>
            <p className="text-sm font-black text-stone-900">
              {t.bestMarketLabel} <span className="text-emerald-800">₹{bestMarketPrice}{t.unit}</span> — {bestMarketName}
            </p>
          </div>
        </div>

        {/* Controls: Time Tabs & Compare Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Tabs */}
          <div className="inline-flex rounded-xl bg-stone-200/80 p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                timeRange === '7d' ? 'bg-white text-emerald-950 shadow-2xs font-black' : 'text-stone-600'
              }`}
            >
              {t.sevenDays}
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                timeRange === '30d' ? 'bg-white text-emerald-950 shadow-2xs font-black' : 'text-stone-600'
              }`}
            >
              {t.thirtyDays}
            </button>
          </div>

          {/* Compare Markets Toggle */}
          <button
            type="button"
            onClick={() => setCompareMarkets(!compareMarkets)}
            className={`px-3 py-1 rounded-xl text-xs font-bold border transition flex items-center space-x-1.5 cursor-pointer ${
              compareMarkets
                ? 'bg-emerald-800 text-white border-emerald-700 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{compareMarkets ? t.showAll : t.compare}</span>
          </button>
        </div>
      </div>

      {/* Recharts Canvas */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
            <YAxis
              domain={['dataMin - 5', 'dataMax + 5']}
              tick={{ fontSize: 11, fill: '#64748b' }}
              stroke="#cbd5e1"
              unit="₹"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`₹${value}${t.unit}`, '']}
            />
            {compareMarkets && <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />}
            <ReferenceLine
              y={100}
              stroke="#cbd5e1"
              strokeDasharray="3 3"
              label={{ value: t.targetRate, position: 'insideTopRight', fontSize: 10, fill: '#94a3b8' }}
            />

            {/* Primary Selected Market Trend Line */}
            <Line
              type="monotone"
              dataKey="tasgaon"
              name={t.myMarket}
              stroke="#15803d"
              strokeWidth={3}
              dot={{ r: 4, fill: '#15803d' }}
              activeDot={{ r: 7 }}
            />

            {/* Additional comparison lines shown only when Compare Markets is toggled */}
            {compareMarkets && (
              <>
                <Line
                  type="monotone"
                  dataKey="pimpalgaon"
                  name={t.pimpalgaonMarket}
                  stroke="#0284c7"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#0284c7' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="pune"
                  name={t.puneMarket}
                  stroke="#d97706"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 2 }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
