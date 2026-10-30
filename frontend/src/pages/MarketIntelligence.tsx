import React, { useState, useMemo } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { CropType } from '../types';
import { PriceLineChart } from '../components/charts/PriceLineChart';
import { MarketCard } from '../components/cards/MarketCard';
import {
  TrendingUp,
  MapPin,
  Calendar,
  Filter,
  ArrowUpRight,
  Sparkles,
  Info,
  Layers,
  Search,
  Scale,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MarketIntelligence: React.FC = () => {
  const { marketPrices, farmer } = useFarmData();
  const { language, t } = useLanguage();

  const [selectedCrop, setSelectedCrop] = useState<CropType>(farmer.primaryCrop || 'Grapes');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPrices = useMemo(() => {
    return marketPrices.filter((p) => {
      const matchCrop = p.crop === selectedCrop;
      const matchDistrict = selectedDistrict === 'All' || p.district === selectedDistrict;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.marketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCrop && matchDistrict && matchSearch;
    });
  }, [marketPrices, selectedCrop, selectedDistrict, searchQuery]);

  const avgPrice = useMemo(() => {
    if (filteredPrices.length === 0) return 0;
    const sum = filteredPrices.reduce((acc, curr) => acc + curr.modalPrice, 0);
    return Math.round(sum / filteredPrices.length);
  }, [filteredPrices]);

  const highestPrice = useMemo(() => {
    if (filteredPrices.length === 0) return 0;
    return Math.max(...filteredPrices.map((p) => p.maxPrice));
  }, [filteredPrices]);

  const lowestPrice = useMemo(() => {
    if (filteredPrices.length === 0) return 0;
    return Math.min(...filteredPrices.map((p) => p.minPrice));
  }, [filteredPrices]);

  const totalArrivals = useMemo(() => {
    return filteredPrices.reduce((acc, curr) => acc + curr.arrivalTonnes, 0);
  }, [filteredPrices]);

  const mText = {
    mr: {
      badge: 'थेट APMC बाजार समिती दर',
      title: 'आजचे बाजार भाव व कल (Mandi Rates)',
      subtitle: 'पिंपळगाव, लासलगाव, तासगाव, गुलटेकडी (पुणे) व सोलापूर बाजार समित्यांमधील ताजे दर व चढ-उतार.',
      feedLive: 'Agmarknet लाईव्ह फीड चालू',
      feedSub: 'दैनिक लिलाव व आवक आकडेवारी',
      kpiAvg: 'सरासरी मॉडेल भाव (Modal Avg)',
      kpiAvgSub: 'सक्रिय बाजार समित्या सरासरी',
      kpiMax: 'कमाल सर्वोच्च बोली भाव',
      kpiMaxSub: '🌟 प्रीमियम ग्रेड A एक्सपोर्ट माल',
      kpiMin: 'किमान तळ बोली भाव',
      kpiMinSub: 'लोकल / प्रोसेसिंग ग्रेड माल',
      kpiArrival: 'एकूण दैनिक आवक (Arrivals)',
      kpiArrivalSub: 'हंगामी आवक वेग चालू',
      searchPlaceholder: 'बाजार समिती, जिल्हा किंवा व्हरायटी शोधा...',
      districtLabel: 'जिल्हा:',
      allDistricts: 'सर्व जिल्हे (All Districts)',
      cropGrapes: '🍇 द्राक्ष (Grapes)',
      cropPom: '🍎 डाळिंब (Pomegranate)',
      timelineLabel: 'कालावधी:',
      perKg: '/ किलो',
      tonnes: 'टन',
      sellingDecisionBannerTitle: '💡 केवळ बाजार भावावर जाऊ नका!',
      sellingDecisionBannerSub: 'गाडीभाडे व सेस वजा केल्यावर मिळणारा खरा निव्वळ भाव (Net Rate) तपासा.',
      sellingDecisionBannerBtn: 'कुठे विकल्यावर जास्त मिळेल? →',
    },
    hi: {
      badge: 'लाइव APMC मंडी दर',
      title: 'आज के मंडी भाव व रुझान (Mandi Rates)',
      subtitle: 'पिंपलगांव, लासलगांव, तासगांव, गुलटेकड़ी (पुणे) व सोलापुर मंडियों के ताजे भाव व उतार-चढ़ाव।',
      feedLive: 'Agmarknet लाइव फीड चालू',
      feedSub: 'दैनिक नीलामी व आवक आंकड़े',
      kpiAvg: 'औसत मॉडल भाव (Modal Avg)',
      kpiAvgSub: 'सक्रिय मंडियों का औसत भाव',
      kpiMax: 'अधिकतम बोली भाव',
      kpiMaxSub: '🌟 प्रीमियम ग्रेड A एक्सपोर्ट माल',
      kpiMin: 'न्यूनतम बोली भाव',
      kpiMinSub: 'लोकल / प्रोसेसिंग ग्रेड माल',
      kpiArrival: 'कुल दैनिक आवक (Arrivals)',
      kpiArrivalSub: 'सीजन की सामान्य आवक चालू',
      searchPlaceholder: 'मंडी, जिला या किस्म खोजें...',
      districtLabel: 'जिला:',
      allDistricts: 'सभी जिले (All Districts)',
      cropGrapes: '🍇 अंगूर (Grapes)',
      cropPom: '🍎 अनार (Pomegranate)',
      timelineLabel: 'अवधि:',
      perKg: '/ किलो',
      tonnes: 'टन',
      sellingDecisionBannerTitle: '💡 केवल मंडी भाव देखकर निर्णय न लें!',
      sellingDecisionBannerSub: 'गाड़ी भाड़ा व सेस घटाने के बाद मिलने वाला शुद्ध भाव (Net Rate) जांचें।',
      sellingDecisionBannerBtn: 'कहाँ बेचने पर ज्यादा मिलेगा? →',
    },
    en: {
      badge: 'Live APMC Market Feeds',
      title: 'Today Mandi Prices & Trends (Market Rates)',
      subtitle: 'Live price discovery across Pimpalgaon, Lasalgaon, Tasgaon, Gultekdi (Pune) and Solapur APMCs.',
      feedLive: 'Agmarknet Live Feed Active',
      feedSub: 'Daily auction arrival statistics',
      kpiAvg: 'Average Modal Price (Avg)',
      kpiAvgSub: 'Weighted active mandi average',
      kpiMax: 'Highest Peak Bid',
      kpiMaxSub: '🌟 Grade A Export Lot',
      kpiMin: 'Floor Minimum Bid',
      kpiMinSub: 'Local / Processing Grade Lot',
      kpiArrival: 'Total Daily Arrivals',
      kpiArrivalSub: 'Active seasonal arrivals',
      searchPlaceholder: 'Search mandi, district or variety...',
      districtLabel: 'District:',
      allDistricts: 'All Districts',
      cropGrapes: '🍇 Grapes',
      cropPom: '🍎 Pomegranate',
      timelineLabel: 'Timeline:',
      perKg: '/ kg',
      tonnes: 'Tonnes',
      sellingDecisionBannerTitle: "💡 Don't just look at the gross mandi rate!",
      sellingDecisionBannerSub: 'Calculate your actual Net Realization after vehicle freight and mandi cess.',
      sellingDecisionBannerBtn: 'Where to Sell for Highest Profit? →',
    }
  };

  const mt = mText[language] || mText.mr;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {mt.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {mt.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {mt.subtitle}
          </p>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-300 px-4 py-2.5 rounded-2xl text-xs text-emerald-950 flex items-center space-x-2.5 shrink-0 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <div>
            <span className="font-black block text-xs">{mt.feedLive}</span>
            <span className="text-[11px] text-emerald-800">{mt.feedSub}</span>
          </div>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Modal Average Price */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {mt.kpiAvg}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">₹{avgPrice} {mt.perKg}</div>
          <span className="text-xs font-bold text-stone-500 block">{mt.kpiAvgSub}</span>
        </div>

        {/* Card 2: Highest Peak Bid */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {mt.kpiMax}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">₹{highestPrice} {mt.perKg}</div>
          <span className="text-xs font-bold text-emerald-700 block">{mt.kpiMaxSub}</span>
        </div>

        {/* Card 3: Lowest Floor Bid */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {mt.kpiMin}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">₹{lowestPrice} {mt.perKg}</div>
          <span className="text-xs font-bold text-stone-500 block">{mt.kpiMinSub}</span>
        </div>

        {/* Card 4: Total Arrivals */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {mt.kpiArrival}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-700">{totalArrivals.toLocaleString()} {mt.tonnes}</div>
          <span className="text-xs font-bold text-blue-600 block">{mt.kpiArrivalSub}</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={mt.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border-2 border-stone-200 rounded-2xl text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* District Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-stone-600">{mt.districtLabel}</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-2 bg-stone-50 border-2 border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="All">{mt.allDistricts}</option>
              <option value="Nashik">Nashik (नाशिक)</option>
              <option value="Sangli">Sangli (सांगली)</option>
              <option value="Pune">Pune (पुणे)</option>
              <option value="Solapur">Solapur (सोलापूर)</option>
              <option value="Ahilyanagar">Ahilyanagar (अहिल्यानगर)</option>
            </select>
          </div>
        </div>

        {/* Crop Pills & Timeline Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <div className="inline-flex rounded-2xl bg-stone-100 p-1 border border-stone-200 text-xs font-black">
            <button
              onClick={() => setSelectedCrop('Grapes')}
              className={`px-4 py-1.5 rounded-xl transition cursor-pointer ${
                selectedCrop === 'Grapes' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {mt.cropGrapes}
            </button>
            <button
              onClick={() => setSelectedCrop('Pomegranate')}
              className={`px-4 py-1.5 rounded-xl transition cursor-pointer ${
                selectedCrop === 'Pomegranate' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {mt.cropPom}
            </button>
          </div>

          {/* Timeline */}
          <div className="flex items-center space-x-1.5 text-xs font-bold">
            <span className="text-stone-500">{mt.timelineLabel}</span>
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                  dateRange === range
                    ? 'bg-emerald-800 text-white font-black shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {range === '7d' ? (language === 'mr' ? '७ दिवस' : language === 'hi' ? '७ दिन' : '7 Days') : range === '30d' ? (language === 'mr' ? '३० दिवस' : language === 'hi' ? '३० दिन' : '30 Days') : (language === 'mr' ? '३ महिने' : language === 'hi' ? '३ महीने' : '90 Days')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selling Engine Banner */}
      <div className="p-5 rounded-3xl bg-emerald-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <strong className="text-sm font-black text-amber-300 block">
            {mt.sellingDecisionBannerTitle}
          </strong>
          <p className="text-xs text-emerald-100">
            {mt.sellingDecisionBannerSub}
          </p>
        </div>
        <Link
          to="/selling-decision"
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm rounded-xl transition shrink-0 flex items-center space-x-1.5"
        >
          <span>{mt.sellingDecisionBannerBtn}</span>
        </Link>
      </div>

      {/* Price Trend Chart Card */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-stone-900">
              {language === 'mr' ? '७ दिवसांचा भाव कल व चढ-उतार आलेख' : language === 'hi' ? '७ दिनों का भाव चार्ट व रुझान' : '7-Day APMC Price Trend Chart'}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'mr' ? 'पिंपळगाव, तासगाव, लासलगाव व पुणे बाजार' : language === 'hi' ? 'पिंपलगांव, तासगांव, लासलगांव व पुणे मंडी' : 'Pimpalgaon, Tasgaon, Lasalgaon & Pune'}
            </p>
          </div>
        </div>

        <PriceLineChart crop={selectedCrop} />
      </div>

      {/* Mandi Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-stone-900">
          {language === 'mr' ? 'बाजार समिती निहाय दर सूची' : language === 'hi' ? 'मंडी अनुसार दर सूची' : 'Mandi-Wise Live Price List'} ({filteredPrices.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrices.map((price) => (
            <MarketCard key={price.id} pricePoint={price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
