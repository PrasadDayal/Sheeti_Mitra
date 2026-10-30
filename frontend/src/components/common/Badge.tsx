import React from 'react';
import { CheckCircle2, AlertCircle, Clock, ShieldCheck, ShieldAlert } from 'lucide-react';
import { BuyerVerification } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'neutral' | 'crop';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  const variantClasses = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 border',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 border',
    info: 'bg-blue-50 text-blue-800 border-blue-200 border',
    danger: 'bg-rose-50 text-rose-800 border-rose-200 border',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200 border',
    crop: 'bg-emerald-800 text-white font-medium',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1 font-medium rounded-full ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const VerificationBadge: React.FC<{ status: BuyerVerification }> = ({ status }) => {
  if (status === 'Partner Verified') {
    return (
      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
        <ShieldCheck className="w-3 h-3 text-emerald-700" />
        <span>Partner Verified</span>
      </span>
    );
  }
  if (status === 'Demo Verified') {
    return (
      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
        <CheckCircle2 className="w-3 h-3 text-blue-600" />
        <span>Demo Verified</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
      <Clock className="w-3 h-3 text-gray-500" />
      <span>Verification Pending</span>
    </span>
  );
};
