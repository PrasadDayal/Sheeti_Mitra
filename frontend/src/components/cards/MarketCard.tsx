import React from 'react';
import { MarketPricePoint } from '../../types';
import { TrendingUp, TrendingDown, Minus, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarketCardProps {
  pricePoint: MarketPricePoint;
  showLink?: boolean;
}

export const MarketCard: React.FC<MarketCardProps> = ({ pricePoint, showLink = true }) => {
  const isUp = pricePoint.trend === 'up';
  const isDown = pricePoint.trend === 'down';

  return (
    <div className="p-6 rounded-3xl border-2 border-stone-200 bg-white hover:border-emerald-400 hover:shadow-md transition group space-y-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300 inline-block">
            {pricePoint.crop} • {pricePoint.variety}
          </span>
          <h4 className="text-base sm:text-lg font-black text-stone-900 mt-1">{pricePoint.marketName}</h4>
          <p className="text-xs font-semibold text-stone-500 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>{pricePoint.district} जिल्हा</span>
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-2xl sm:text-3xl font-black text-stone-950">
            ₹{pricePoint.modalPrice}
            <span className="text-xs font-bold text-stone-500"> /kg</span>
          </div>
          <div className="flex items-center justify-end space-x-1 mt-0.5">
            {isUp && <TrendingUp className="w-4 h-4 text-emerald-600" />}
            {isDown && <TrendingDown className="w-4 h-4 text-rose-600" />}
            {!isUp && !isDown && <Minus className="w-4 h-4 text-stone-400" />}
            <span
              className={`text-xs font-black ${
                isUp ? 'text-emerald-700' : isDown ? 'text-rose-700' : 'text-stone-500'
              }`}
            >
              {pricePoint.dailyChangePercent > 0 ? `+${pricePoint.dailyChangePercent}%` : `${pricePoint.dailyChangePercent}%`}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <span className="text-[11px] text-stone-500 block font-bold">किमान तळ भाव</span>
          <span className="font-black text-stone-800 text-sm">₹{pricePoint.minPrice}</span>
        </div>
        <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-300">
          <span className="text-[11px] text-emerald-900 block font-black">मॉडेल (सरासरी)</span>
          <span className="font-black text-emerald-950 text-sm">₹{pricePoint.modalPrice}</span>
        </div>
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <span className="text-[11px] text-stone-500 block font-bold">कमाल सर्वोच्च</span>
          <span className="font-black text-stone-800 text-sm">₹{pricePoint.maxPrice}</span>
        </div>
      </div>

      {showLink && (
        <div className="pt-1 flex items-center justify-between text-xs border-t border-stone-100">
          <span className="text-stone-600 font-bold">दैनिक आवक: {pricePoint.arrivalTonnes} टन</span>
          <Link
            to="/selling-decision"
            className="text-emerald-800 hover:text-emerald-900 font-black flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>नफा तपासा</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};
