import React from 'react';
import { SellingOptionComparison } from '../../types';
import { Sparkles, ArrowUpRight, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { formatINR } from '../../utils/calculations';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface RecommendationCardProps {
  option: SellingOptionComparison;
  quantityKg: number;
  breakEvenPrice: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  option,
  quantityKg,
  breakEvenPrice,
}) => {
  const { language } = useLanguage();
  const isAboveBreakEven = option.estimatedNetRealizationPerKg > breakEvenPrice;
  const netMarginPerKg = option.estimatedNetRealizationPerKg - breakEvenPrice;

  const rText = {
    mr: {
      badge: 'सर्वोत्तम नफा देणारा पर्याय (Top Choice)',
      benefit: 'कमाल निव्वळ नफा परतावा',
      estProfit: 'अंदाजित एकूण नफा:',
      netRate: 'खरा अंदाजित निव्वळ भाव (Net Rate)',
      baseOffer: 'मूळ ऑफर भाव:',
      transport: 'वाहतूक वजावट (Transport):',
      hamali: 'हमाली व पॅकिंग (Hamali/Pack):',
      cess: 'आडत व सेस (APMC Cess):',
      totalNet: 'एकूण निव्वळ रक्कम:',
      breakEven: 'किमान ब्रेक-इव्हन भाव:',
      netMargin: 'प्रति किलो निव्वळ नफा मार्जिन:',
      contactCta: 'या खरेदीदाराशी संपर्क साधा',
      detailsCta: 'सविस्तर हिशोब पहा',
    },
    hi: {
      badge: 'सर्वोत्तम मुनाफा विकल्प (Top Choice)',
      benefit: 'अधिकतम शुद्ध मुनाफा',
      estProfit: 'अनुमानित कुल मुनाफा:',
      netRate: 'असली शुद्ध भाव (Net Rate)',
      baseOffer: 'मूल ऑफर भाव:',
      transport: 'परिवहन कटौती (Transport):',
      hamali: 'हमाली व पैकिंग (Hamali/Pack):',
      cess: 'मंडी सेस व आढ़त (APMC Cess):',
      totalNet: 'कुल शुद्ध राशि:',
      breakEven: 'न्यूनतम ब्रेक-ईवन भाव:',
      netMargin: 'प्रति किलो शुद्ध लाभ मार्जिन:',
      contactCta: 'इस खरीदार से संपर्क करें',
      detailsCta: 'विस्तृत गणना देखें',
    },
    en: {
      badge: 'Highest Profit Channel (Top Choice)',
      benefit: 'Maximum Net Realization',
      estProfit: 'Est. Total Profit:',
      netRate: 'Estimated Net Realization Rate',
      baseOffer: 'Base Offer Rate:',
      transport: 'Transport Deduction:',
      hamali: 'Loading & Packaging:',
      cess: 'Mandi Commission & Cess:',
      totalNet: 'Total Estimated Net Realization:',
      breakEven: 'Break-Even Production Cost:',
      netMargin: 'Net Profit Margin per Kg:',
      contactCta: 'Contact Buyer Directly',
      detailsCta: 'View Cost Breakdown',
    }
  };

  const rt = rText[language] || rText.mr;

  return (
    <div className="rounded-3xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
      {/* Top Banner Tag */}
      <div className="absolute top-0 right-0 bg-amber-400 text-stone-950 text-xs font-black uppercase px-5 py-1.5 rounded-bl-2xl tracking-wider flex items-center space-x-1.5 shadow-md">
        <Sparkles className="w-4 h-4 text-stone-950" />
        <span>{rt.badge}</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
        {/* Buyer & Recommendation Info */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-emerald-800 text-emerald-100 text-xs font-black rounded-full border border-emerald-400">
              {option.targetType}
            </span>
            <span className="text-xs text-emerald-300 font-semibold">{option.location}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            {option.targetName}
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
            {option.reasoning}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <div className="bg-emerald-800/80 text-white px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 border border-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{rt.benefit}</span>
            </div>
            {option.differenceVsTopOption === 0 && (
              <div className="bg-white/10 text-emerald-200 px-3 py-1.5 rounded-xl font-semibold border border-white/15">
                {rt.estProfit} <strong className="text-white font-black">{formatINR(option.totalEstimatedProfit)}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Financial Highlights Box */}
        <div className="bg-white/10 backdrop-blur-md border-2 border-emerald-400/40 rounded-3xl p-6 shadow-md lg:min-w-[320px] text-center space-y-3">
          <div>
            <span className="text-xs font-black text-emerald-300 uppercase tracking-wider block">
              {rt.netRate}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-1">
              ₹{option.estimatedNetRealizationPerKg.toFixed(2)}
              <span className="text-sm font-bold text-stone-300"> / kg</span>
            </div>
            <span className="text-xs text-emerald-200 font-medium block mt-0.5">
              {rt.baseOffer} ₹{option.offerPricePerKg}/kg
            </span>
          </div>

          {/* Deductions Breakdown */}
          <div className="pt-3 border-t border-white/15 space-y-1.5 text-xs text-stone-200 text-left">
            <div className="flex justify-between">
              <span>{rt.transport}</span>
              <span className="font-bold text-white">
                -₹{option.transportCostPerKg.toFixed(2)}/kg
              </span>
            </div>
            <div className="flex justify-between">
              <span>{rt.hamali}</span>
              <span className="font-bold text-white">
                -₹{(option.loadingUnloadingCostPerKg + option.packagingOtherCostPerKg).toFixed(2)}/kg
              </span>
            </div>
            {option.marketCessCommissionPerKg > 0 && (
              <div className="flex justify-between">
                <span>{rt.cess}</span>
                <span className="font-bold text-white">
                  -₹{option.marketCessCommissionPerKg.toFixed(2)}/kg
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-white/15 flex justify-between font-black text-sm text-white">
              <span>{rt.totalNet}</span>
              <span className="text-amber-300 font-black">{formatINR(option.totalEstimatedNetRealization)}</span>
            </div>
          </div>

          {/* Break-even badge */}
          <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px]">
            <span className="text-emerald-200">{rt.breakEven}</span>
            <span className="font-bold text-white">₹{breakEvenPrice.toFixed(0)}/kg</span>
          </div>

          {isAboveBreakEven && (
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400 text-[11px] text-emerald-300 font-bold">
              {rt.netMargin} +₹{netMarginPerKg.toFixed(1)}/kg
            </div>
          )}
        </div>
      </div>

      {/* CTA Links */}
      <div className="pt-4 border-t border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <Link
          to={`/buyer/${option.id}`}
          className="inline-flex items-center space-x-1.5 font-bold text-amber-300 hover:text-amber-200"
        >
          <span>{rt.contactCta}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <Link
          to="/profit"
          className="inline-flex items-center space-x-1.5 font-bold text-emerald-300 hover:text-emerald-200"
        >
          <span>{rt.detailsCta}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default RecommendationCard;
