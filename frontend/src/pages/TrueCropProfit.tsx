import React, { useState, useMemo } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { ProfitBarChart } from '../components/charts/ProfitBarChart';
import { ExpenseDonutChart } from '../components/charts/ExpenseDonutChart';
import { MultiSeasonChart } from '../components/charts/MultiSeasonChart';
import { computeStressScenario, formatINR } from '../utils/calculations';
import { CropType, StressScenario } from '../types';
import {
  PieChart,
  Scale,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Layers,
  Calculator,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Sliders,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TrueCropProfit: React.FC = () => {
  const {
    farmer,
    totalCost,
    expectedRevenue,
    estimatedProfit,
    profitMarginPercent,
    breakEvenPrice,
    expectedYieldKg,
    expenses,
  } = useFarmData();
  const { language, t } = useLanguage();

  const [selectedCropHistory, setSelectedCropHistory] = useState<CropType>('Grapes');

  // Stress Test Sliders State
  const [scenario, setScenario] = useState<StressScenario>({
    priceChangePercent: 0,
    yieldChangePercent: 0,
    inputCostChangePercent: 0,
    transportCostChangePercent: 0,
  });

  const basePrice = 100; // Base estimated price ₹/kg
  const baseYield = expectedYieldKg > 0 ? expectedYieldKg : 3500;
  const baseCost = totalCost;
  const baseTransport = 18000;

  // Stressed output calculation
  const stressResults = useMemo(() => {
    return computeStressScenario(basePrice, baseYield, baseCost, baseTransport, scenario);
  }, [basePrice, baseYield, baseCost, baseTransport, scenario]);

  const costPerKg = expectedYieldKg > 0 ? (totalCost / expectedYieldKg).toFixed(2) : '0.00';
  const profitPerAcre = farmer.totalAcres > 0 ? ((estimatedProfit || 0) / farmer.totalAcres).toFixed(0) : '0';

  const pText = {
    mr: {
      badge: 'आर्थिक ताळेबंद व नफा विश्लेषण',
      title: 'खरा पीक नफा विश्लेषण (True Crop Profit)',
      subtitle: 'प्रति किलो उत्पादन खर्च, ब्रेक-इव्हन भाव, मागील हंगामांची तुलना आणि बाजार जोखीम चाचणी.',
      sellingCta: 'विक्री निर्णय तपासा',
      kpiCost: 'एकूण शेती खर्च (Total Cost)',
      kpiCostSub: `${expenses.length} खर्च नोंदी`,
      kpiBreakEven: 'किमान परवडणारा भाव (Break-Even)',
      kpiBreakEvenSub: `प्रति किलो उत्पादन खर्च: ₹${costPerKg}`,
      kpiProfit: 'अंदाजित निव्वळ नफा (Net Profit)',
      kpiProfitSub: `+${profitMarginPercent}% मार्जिन • ₹${profitPerAcre}/एकर`,
      kpiRevenue: 'अपेक्षित एकूण महसूल (Revenue)',
      kpiRevenueSub: `${expectedYieldKg} किलो उत्पादन अंदाज`,
      costDonutTitle: 'खर्च विभाजन (Cost Breakdown by Category)',
      profitBarTitle: 'खर्च, महसूल व निव्वळ नफा तुलना',
      stressTitle: 'बाजार जोखीम व ताण चाचणी सिम्युलेटर (Stress Test Simulator)',
      stressSubtitle: 'भाव घसरण किंवा उत्पादन कमी झाल्यास नफ्यावर काय परिणाम होईल ते तपासा:',
      priceSlider: 'बाजार भाव बदल:',
      yieldSlider: 'उत्पादन बदल:',
      costSlider: 'इनपुट व मजुरी खर्च बदल:',
      stressRevenue: 'सुधारित महसूल:',
      stressCost: 'सुधारित खर्च:',
      stressProfit: 'सुधारित निव्वळ नफा (Stressed Profit):',
      multiSeasonTitle: 'मागील ३ हंगामांचे नफा ताळेबंद (Multi-Season Comparison)',
    },
    hi: {
      badge: 'वित्तीय विश्लेषण व मुनाफा',
      title: 'असली फसल मुनाफा विश्लेषण (True Crop Profit)',
      subtitle: 'प्रति किलो उत्पादन लागत, ब्रेक-ईवन भाव, पिछले सीजनों की तुलना और बाजार जोखिम परीक्षण।',
      sellingCta: 'बिक्री निर्णय जांचें',
      kpiCost: 'कुल खेती लागत (Total Cost)',
      kpiCostSub: `${expenses.length} खर्च प्रविष्टियां`,
      kpiBreakEven: 'न्यूनतम लाभकारी भाव (Break-Even)',
      kpiBreakEvenSub: `प्रति किलो लागत: ₹${costPerKg}`,
      kpiProfit: 'अनुमानित शुद्ध मुनाफा (Net Profit)',
      kpiProfitSub: `+${profitMarginPercent}% मार्जिन • ₹${profitPerAcre}/एकड़`,
      kpiRevenue: 'अनुमानित कुल आय (Revenue)',
      kpiRevenueSub: `${expectedYieldKg} किलो उत्पादन अनुमान`,
      costDonutTitle: 'लागत विभाजन (Cost Breakdown by Category)',
      profitBarTitle: 'लागत, आय व शुद्ध लाभ तुलना',
      stressTitle: 'बाजार जोखिम व तनाव परीक्षण (Stress Test Simulator)',
      stressSubtitle: 'मंडी भाव गिरने या उत्पादन घटने पर मुनाफे पर क्या असर होगा जांचें:',
      priceSlider: 'मंडी भाव बदलाव:',
      yieldSlider: 'उत्पादन बदलाव:',
      costSlider: 'लागत व मजदूरी बदलाव:',
      stressRevenue: 'संशोधित आय:',
      stressCost: 'संशोधित लागत:',
      stressProfit: 'संशोधित शुद्ध मुनाफा (Stressed Profit):',
      multiSeasonTitle: 'पिछले ३ सीजनों का मुनाफा तालेबंद (Multi-Season Comparison)',
    },
    en: {
      badge: 'Farm Economics & Profit Engine',
      title: 'True Crop Profit & Unit Economics (खरा नफा)',
      subtitle: 'Production cost per kg, break-even threshold, historical season audits, and stress testing.',
      sellingCta: 'Compare Selling Channels',
      kpiCost: 'Total Season Cost (Cost)',
      kpiCostSub: `${expenses.length} expense logs`,
      kpiBreakEven: 'Break-Even Price (Threshold)',
      kpiBreakEvenSub: `Production Cost: ₹${costPerKg}/kg`,
      kpiProfit: 'Estimated Net Profit',
      kpiProfitSub: `+${profitMarginPercent}% margin • ₹${profitPerAcre}/acre`,
      kpiRevenue: 'Gross Revenue (Yield × Price)',
      kpiRevenueSub: `${expectedYieldKg} kg harvest yield estimate`,
      costDonutTitle: 'Cost Breakdown by Input Category',
      profitBarTitle: 'Cost vs Revenue vs Net Profit Audit',
      stressTitle: 'Scenario Analysis & Stress Testing Simulator',
      stressSubtitle: 'Simulate price drops, yield shocks, and input inflation in real-time:',
      priceSlider: 'Market Price Shock:',
      yieldSlider: 'Yield Shock:',
      costSlider: 'Input Cost Inflation:',
      stressRevenue: 'Stressed Revenue:',
      stressCost: 'Stressed Farm Cost:',
      stressProfit: 'Calculated Stressed Profit:',
      multiSeasonTitle: 'Multi-Season Profit & Yield Historical Trends',
    }
  };

  const pt = pText[language] || pText.mr;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <PieChart className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {pt.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {pt.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {pt.subtitle}
          </p>
        </div>

        <Link
          to="/selling-decision"
          className="flex items-center space-x-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-2xl text-xs sm:text-sm shadow-md transition shrink-0 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>{pt.sellingCta}</span>
        </Link>
      </div>

      {/* Primary 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Cost */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {pt.kpiCost}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">{formatINR(totalCost)}</div>
          <span className="text-xs font-bold text-stone-500 block">{pt.kpiCostSub}</span>
        </div>

        {/* Card 2: Break Even */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {pt.kpiBreakEven}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-950">₹{breakEvenPrice.toFixed(2)} / kg</div>
          <span className="text-xs font-bold text-amber-800 block">{pt.kpiBreakEvenSub}</span>
        </div>

        {/* Card 3: Est Profit */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {pt.kpiProfit}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">{formatINR(estimatedProfit)}</div>
          <span className="text-xs font-bold text-emerald-700 block">{pt.kpiProfitSub}</span>
        </div>

        {/* Card 4: Expected Revenue */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {pt.kpiRevenue}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-700">{formatINR(expectedRevenue)}</div>
          <span className="text-xs font-bold text-blue-600 block">{pt.kpiRevenueSub}</span>
        </div>
      </div>

      {/* 2 Visual Charts: Expenses Donut & Profit Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cost Breakdown Donut */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base sm:text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
            {pt.costDonutTitle}
          </h3>
          <ExpenseDonutChart expenses={expenses} />
        </div>

        {/* Profit Breakdown Bar */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base sm:text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
            {pt.profitBarTitle}
          </h3>
          <ProfitBarChart
            totalCost={totalCost}
            expectedRevenue={expectedRevenue}
            estimatedProfit={estimatedProfit}
          />
        </div>
      </div>

      {/* Interactive Stress Test Simulator */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
          <Sliders className="w-5 h-5 text-emerald-800" />
          <div>
            <h3 className="text-base sm:text-lg font-black text-stone-900">
              {pt.stressTitle}
            </h3>
            <p className="text-xs text-stone-500">
              {pt.stressSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Price Shock */}
          <div className="p-4 bg-stone-50 rounded-2xl space-y-2 border border-stone-200">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>{pt.priceSlider}</span>
              <span className={`font-black ${scenario.priceChangePercent >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {scenario.priceChangePercent > 0 ? `+${scenario.priceChangePercent}` : scenario.priceChangePercent}%
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="5"
              value={scenario.priceChangePercent}
              onChange={(e) => setScenario({ ...scenario, priceChangePercent: Number(e.target.value) })}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
          </div>

          {/* Yield Shock */}
          <div className="p-4 bg-stone-50 rounded-2xl space-y-2 border border-stone-200">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>{pt.yieldSlider}</span>
              <span className={`font-black ${scenario.yieldChangePercent >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {scenario.yieldChangePercent > 0 ? `+${scenario.yieldChangePercent}` : scenario.yieldChangePercent}%
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="5"
              value={scenario.yieldChangePercent}
              onChange={(e) => setScenario({ ...scenario, yieldChangePercent: Number(e.target.value) })}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
          </div>

          {/* Cost Shock */}
          <div className="p-4 bg-stone-50 rounded-2xl space-y-2 border border-stone-200">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>{pt.costSlider}</span>
              <span className={`font-black ${scenario.inputCostChangePercent <= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {scenario.inputCostChangePercent > 0 ? `+${scenario.inputCostChangePercent}` : scenario.inputCostChangePercent}%
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              step="5"
              value={scenario.inputCostChangePercent}
              onChange={(e) => setScenario({ ...scenario, inputCostChangePercent: Number(e.target.value) })}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>
        </div>

        {/* Stress Results Outcome Box */}
        <div className="p-5 rounded-2xl bg-emerald-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <span className="text-xs text-emerald-300 font-bold">{pt.stressProfit}</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300">
              {formatINR(stressResults.netProfit)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-emerald-300 block">{pt.stressRevenue}</span>
              <strong className="text-base text-white">{formatINR(stressResults.totalRevenue)}</strong>
            </div>
            <div>
              <span className="text-emerald-300 block">{pt.stressCost}</span>
              <strong className="text-base text-white">{formatINR(stressResults.totalCost)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Season Historical Comparison */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <h3 className="text-base sm:text-lg font-black text-stone-900">
            {pt.multiSeasonTitle}
          </h3>
          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-bold">
            <button
              onClick={() => setSelectedCropHistory('Grapes')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                selectedCropHistory === 'Grapes' ? 'bg-emerald-800 text-white font-black' : 'text-stone-700'
              }`}
            >
              🍇 {language === 'mr' ? 'द्राक्ष' : language === 'hi' ? 'अंगूर' : 'Grapes'}
            </button>
            <button
              onClick={() => setSelectedCropHistory('Pomegranate')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                selectedCropHistory === 'Pomegranate' ? 'bg-emerald-800 text-white font-black' : 'text-stone-700'
              }`}
            >
              🍎 {language === 'mr' ? 'डाळिंब' : language === 'hi' ? 'अनार' : 'Pomegranate'}
            </button>
          </div>
        </div>

        <MultiSeasonChart crop={selectedCropHistory} />
      </div>
    </div>
  );
};

export default TrueCropProfit;
