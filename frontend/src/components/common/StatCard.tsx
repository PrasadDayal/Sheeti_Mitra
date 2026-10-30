import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  variant?: 'emerald' | 'amber' | 'blue' | 'slate' | 'red';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'emerald',
  className = '',
}) => {
  const variantStyles = {
    emerald: 'border-emerald-300 bg-white text-emerald-950 shadow-xs',
    amber: 'border-amber-300 bg-white text-amber-950 shadow-xs',
    blue: 'border-blue-300 bg-white text-blue-950 shadow-xs',
    slate: 'border-gray-300 bg-white text-gray-900 shadow-xs',
    red: 'border-rose-300 bg-white text-rose-950 shadow-xs',
  };

  const iconBgStyles = {
    emerald: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    blue: 'bg-blue-100 text-blue-800',
    slate: 'bg-gray-100 text-gray-800',
    red: 'bg-rose-100 text-rose-800',
  };

  return (
    <div className={`p-5 rounded-2xl border-2 hover:shadow-md transition-all ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5 flex-1 pr-2">
          <p className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-950">{value}</h3>
            {trend && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  trend.isPositive
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-rose-100 text-rose-900'
                }`}
              >
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs sm:text-sm font-semibold text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl shrink-0 ${iconBgStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
