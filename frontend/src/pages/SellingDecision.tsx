import React, { useState, useMemo } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { CropType } from '../types';
import {
  calculateTransportCostPerKg,
  calculateSellingComparisons,
  formatINR,
  VEHICLE_OPTIONS,
} from '../utils/calculations';
import { RecommendationCard } from '../components/cards/RecommendationCard';
import {
  Sparkles,
  Truck,
  Calculator,
  Building2,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Info,
  ShieldCheck,
  Share2,
  ArrowRight,
  Lightbulb,
  Scale,
  Sliders,
  Award,
} from 'lucide-react';

export const SellingDecision: React.FC = () => {
  const { farmer, buyers, totalCost, expectedYieldKg, marketPrices } = useFarmData();
  const { language, t } = useLanguage();

  // Input states
  const [selectedCrop, setSelectedCrop] = useState<CropType>(farmer.primaryCrop || 'Grapes');
  const [harvestQuantityKg, setHarvestQuantityKg] = useState<number>(expectedYieldKg > 0 ? expectedYieldKg : 3500);
  const [customFarmCost, setCustomFarmCost] = useState<number>(totalCost > 0 ? totalCost : 200000);
  const [mandiBenchmarkRate, setMandiBenchmarkRate] = useState<number>(
    marketPrices.find((m) => m.crop === (farmer.primaryCrop || 'Grapes'))?.modalPrice || 102
  );
  
  // Transport calculator states
  const [transportDistanceKm, setTransportDistanceKm] = useState<number>(35);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>(VEHICLE_OPTIONS[0].type);
  const [customFuelRate, setCustomFuelRate] = useState<number>(VEHICLE_OPTIONS[0].baseRatePerKm);

  // Filter buyers for selected crop
  const relevantBuyers = useMemo(() => {
    return buyers.filter((b) => b.preferredCrop === selectedCrop);
  }, [buyers, selectedCrop]);

  // Compute dynamic comparisons
  const computedOptions = useMemo(() => {
    return calculateSellingComparisons(relevantBuyers, harvestQuantityKg, customFarmCost, mandiBenchmarkRate);
  }, [relevantBuyers, harvestQuantityKg, customFarmCost, mandiBenchmarkRate]);

  const topRecommendation = computedOptions[0];

  // Transport calculator computation
  const calculatedTransport = useMemo(() => {
    return calculateTransportCostPerKg(transportDistanceKm, harvestQuantityKg, customFuelRate);
  }, [transportDistanceKm, harvestQuantityKg, customFuelRate]);

  const sText = {
    mr: {
      badge: 'स्मार्ट विक्री निर्णय इंजिन',
      title: 'माल कुठे विकल्यास जास्त नफा होईल? (Selling Decision)',
      subtitle: 'बाजार समिती, स्थानिक दलाल आणि थेट एक्सपोर्टर्स मधील वाहतूक व हमाली वजा करून मिळणारा खरा निव्वळ भाव (Net Rate).',
      whatsappShare: 'व्हॉट्सॲपवर शेअर करा',
      whyTitle: `शेतीमित्र का शिफारस करत आहे (${topRecommendation?.targetName}):`,
      whyDesc: `काही व्यापारी वरवर जास्त दर सांगतात, परंतु दूरच्या बाजारपेठेत वाहतूक, हमाली आणि अडत वजा जाता हातात कमी पैसे येतात. ${topRecommendation?.targetName} यांच्याकडून शेतावर मोफत माल उचल आणि ३ दिवसांत थेट पेमेंट मिळत असल्याने तुमचा निव्वळ भाव ₹${topRecommendation?.estimatedNetRealizationPerKg.toFixed(2)}/किलो असा सर्वाधिक ठरतो.`,
      paramTitle: '१. शेत उत्पादन व खर्च मापदंड (Parameters)',
      cropLabel: 'पीक निवडा',
      cropGrapes: '🍇 द्राक्ष (Grapes)',
      cropPom: '🍎 डाळिंब (Pomegranate)',
      yieldLabel: 'तोडणी वजन (किलो)',
      costLabel: 'एकूण झालेला खर्च (₹)',
      mandiRateLabel: 'बाजार भाव लिलाव दर (₹/kg)',
      prodAnalysis: 'उत्पादन विश्लेषण:',
      costPerKg: 'प्रति किलो उत्पादन खर्च (Cost/kg):',
      cratesEst: 'एकूण क्रेट्स संख्या (~२० किलो):',
      cratesUnit: 'क्रेट्स',
      transTitle: '२. वाहतूक खर्च कॅल्क्युलेटर',
      transBadge: 'गाडी भाडे',
      distanceLabel: 'वाहतूक अंतर:',
      vehicleLabel: 'वाहन प्रकार:',
      ratePerKm: 'दर प्रति किमी:',
      transPerKg: 'प्रति किलो वाहतूक खर्च:',
      fuelCostEst: 'एकूण अंदाजित गाडी भाडे:',
      tableTitle: '३. सर्व विक्री पर्यायांची सविस्तर तुलना (Channel Comparison)',
      tableChannel: 'विक्री चॅनेल / खरेदीदार',
      tableOffer: 'ऑफर भाव',
      tableTransport: 'वाहतूक',
      tableHamali: 'हमाली/सेस',
      tableNetRate: 'खरा निव्वळ भाव',
      tableEstProfit: 'अंदाजित नफा',
      tableDifference: 'तफावत (फरक)',
      benchmark: 'सर्वोत्तम पर्याय (Benchmark)',
      lossLabel: 'कमी नफा',
    },
    hi: {
      badge: 'स्मार्ट बिक्री निर्णय इंजन',
      title: 'कहाँ बेचने पर ज्यादा मुनाफा होगा? (Selling Decision)',
      subtitle: 'मंडी, स्थानीय दलाल और सीधे एक्सपोर्टर्स में परिवहन व हमाली घटाकर असली शुद्ध भाव (Net Rate)।',
      whatsappShare: 'व्हाट्सएप पर शेयर करें',
      whyTitle: `शेतीमित्र क्यों सिफारिश कर रहा है (${topRecommendation?.targetName}):`,
      whyDesc: `दूर की मंडियों में परिवहन, हमाली और आढ़त कटने के बाद हाथ में कम पैसे आते हैं। ${topRecommendation?.targetName} द्वारा खेत से मुफ्त उठान और ३ दिन में भुगतान मिलने से आपका शुद्ध भाव ₹${topRecommendation?.estimatedNetRealizationPerKg.toFixed(2)}/किलो सबसे अधिक रहता है।`,
      paramTitle: '१. खेत उत्पादन व लागत मापदंड (Parameters)',
      cropLabel: 'फसल चुनें',
      cropGrapes: '🍇 अंगूर (Grapes)',
      cropPom: '🍎 अनार (Pomegranate)',
      yieldLabel: 'कटाई वजन (किलो)',
      costLabel: 'कुल लागत (₹)',
      mandiRateLabel: 'मंडी नीलामी दर (₹/kg)',
      prodAnalysis: 'उत्पादन विश्लेषण:',
      costPerKg: 'प्रति किलो उत्पादन लागत (Cost/kg):',
      cratesEst: 'कुल कैरेट संख्या (~२० किलो):',
      cratesUnit: 'कैरेट',
      transTitle: '२. परिवहन लागत कैलकुलेटर',
      transBadge: 'गाड़ी भाड़ा',
      distanceLabel: 'परिवहन दूरी:',
      vehicleLabel: 'वाहन का प्रकार:',
      ratePerKm: 'दर प्रति किमी:',
      transPerKg: 'प्रति किलो परिवहन लागत:',
      fuelCostEst: 'कुल अनुमानित गाड़ी भाड़ा:',
      tableTitle: '३. सभी बिक्री विकल्पों की विस्तृत तुलना (Channel Comparison)',
      tableChannel: 'बिक्री चैनल / खरीदार',
      tableOffer: 'ऑफर भाव',
      tableTransport: 'परिवहन',
      tableHamali: 'हमाली/सेस',
      tableNetRate: 'असली शुद्ध भाव',
      tableEstProfit: 'अनुमानित मुनाफा',
      tableDifference: 'अंतर (Difference)',
      benchmark: 'सर्वोत्तम विकल्प (Benchmark)',
      lossLabel: 'कम मुनाफा',
    },
    en: {
      badge: 'Smart Selling Decision Engine',
      title: 'Where Should I Sell for Highest Profit? (Selling Decision)',
      subtitle: 'Transparent Net Realization (Net Rate) calculated after deducting vehicle freight, loading, and APMC cess.',
      whatsappShare: 'Share on WhatsApp',
      whyTitle: `Why ShetiMitra Recommends (${topRecommendation?.targetName}):`,
      whyDesc: `Some distant buyers list high gross offers, but freight, loading, and commission eat into margins. ${topRecommendation?.targetName} offers free farm-gate pickup and 3-day direct settlement, yielding the highest net rate of ₹${topRecommendation?.estimatedNetRealizationPerKg.toFixed(2)}/kg.`,
      paramTitle: '1. Harvest Parameters & Farm Economics',
      cropLabel: 'Select Crop',
      cropGrapes: '🍇 Grapes',
      cropPom: '🍎 Pomegranate',
      yieldLabel: 'Harvest Volume (Kg)',
      costLabel: 'Total Season Cost (₹)',
      mandiRateLabel: 'APMC Benchmark Rate (₹/kg)',
      prodAnalysis: 'Economics Summary:',
      costPerKg: 'Production Cost per Kg:',
      cratesEst: 'Approximate Crates (~20kg):',
      cratesUnit: 'crates',
      transTitle: '2. Vehicle Freight & Logistics Calculator',
      transBadge: 'Freight Engine',
      distanceLabel: 'Distance to Market:',
      vehicleLabel: 'Vehicle Type:',
      ratePerKm: 'Freight Rate per Km:',
      transPerKg: 'Transport Cost per Kg:',
      fuelCostEst: 'Total Estimated Freight:',
      tableTitle: '3. Full Channel Comparison Matrix',
      tableChannel: 'Selling Channel / Buyer',
      tableOffer: 'Gross Offer',
      tableTransport: 'Transport',
      tableHamali: 'Handling/Cess',
      tableNetRate: 'Net Realization',
      tableEstProfit: 'Est. Net Profit',
      tableDifference: 'Variance vs Top',
      benchmark: 'Optimal Channel (Benchmark)',
      lossLabel: 'less profit',
    }
  };

  const st = sText[language] || sText.mr;

  const handleShareWhatsApp = () => {
    const text = `*${language === 'mr' ? 'शेतीमित्र विक्री निर्णय' : 'ShetiMitra Selling Decision'}*\nCrop: ${selectedCrop}\nVolume: ${harvestQuantityKg} kg\nRecommended Buyer: ${topRecommendation?.targetName}\nNet Rate: ₹${topRecommendation?.estimatedNetRealizationPerKg.toFixed(2)}/kg\nEst. Profit: ${formatINR(topRecommendation?.totalEstimatedProfit || 0)}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-amber-400 text-stone-950 font-black">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
              {st.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {st.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {st.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="flex items-center space-x-2 px-5 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition shrink-0 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>{st.whatsappShare}</span>
        </button>
      </div>

      {/* Flagship Recommendation Spotlight Card */}
      {topRecommendation && (
        <RecommendationCard
          option={topRecommendation}
          quantityKg={harvestQuantityKg}
          breakEvenPrice={customFarmCost / (harvestQuantityKg || 1)}
        />
      )}

      {/* Why Top Option Wins - Human Explanation Card */}
      <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-3xl text-xs sm:text-sm space-y-2 text-emerald-950 shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <Lightbulb className="w-5 h-5 text-emerald-800 shrink-0" />
          <h4 className="font-black text-base text-emerald-950">{st.whyTitle}</h4>
        </div>
        <p className="text-emerald-900 leading-relaxed font-medium">
          {st.whyDesc}
        </p>
      </div>

      {/* Decision Inputs and Transport Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Scenario Parameters */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
            <Calculator className="w-5 h-5 text-emerald-800" />
            <h3 className="text-base sm:text-lg font-black text-stone-900">{st.paramTitle}</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-stone-700 mb-1">{st.cropLabel}</label>
              <select
                value={selectedCrop}
                onChange={(e) => {
                  const c = e.target.value as CropType;
                  setSelectedCrop(c);
                  setMandiBenchmarkRate(c === 'Grapes' ? 102 : 142);
                }}
                className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-black text-emerald-950 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="Grapes">{st.cropGrapes}</option>
                <option value="Pomegranate">{st.cropPom}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">{st.yieldLabel}</label>
              <input
                type="number"
                value={harvestQuantityKg}
                onChange={(e) => setHarvestQuantityKg(Number(e.target.value))}
                className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-black text-stone-900 focus:outline-none focus:border-emerald-600"
                min="100"
                step="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-stone-700 mb-1">{st.costLabel}</label>
              <input
                type="number"
                value={customFarmCost}
                onChange={(e) => setCustomFarmCost(Number(e.target.value))}
                className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-black text-stone-900 focus:outline-none focus:border-emerald-600"
                min="10000"
                step="5000"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">{st.mandiRateLabel}</label>
              <input
                type="number"
                value={mandiBenchmarkRate}
                onChange={(e) => setMandiBenchmarkRate(Number(e.target.value))}
                className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-black text-emerald-800 focus:outline-none focus:border-emerald-600"
                min="30"
                step="1"
              />
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl text-xs space-y-1.5 text-stone-600 border border-stone-200">
            <span className="font-black text-stone-800 block text-xs">{st.prodAnalysis}</span>
            <div className="flex justify-between">
              <span>{st.costPerKg}</span>
              <span className="font-black text-stone-900">
                ₹{(customFarmCost / (harvestQuantityKg || 1)).toFixed(2)} / kg
              </span>
            </div>
            <div className="flex justify-between">
              <span>{st.cratesEst}</span>
              <span className="font-bold text-stone-700">~{(harvestQuantityKg / 20).toFixed(0)} {st.cratesUnit}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Transport Calculator */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-emerald-800" />
              <h3 className="text-base sm:text-lg font-black text-stone-900">{st.transTitle}</h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-black">
              {st.transBadge}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                {st.distanceLabel} <strong>{transportDistanceKm} km</strong>
              </label>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={transportDistanceKm}
                onChange={(e) => setTransportDistanceKm(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700 mt-2"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">{st.vehicleLabel}</label>
              <select
                value={selectedVehicleType}
                onChange={(e) => {
                  const v = VEHICLE_OPTIONS.find((opt) => opt.type === e.target.value);
                  if (v) {
                    setSelectedVehicleType(v.type);
                    setCustomFuelRate(v.baseRatePerKm);
                  }
                }}
                className="w-full p-2.5 bg-stone-50 border-2 border-stone-200 rounded-2xl font-bold text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer text-xs sm:text-sm"
              >
                {VEHICLE_OPTIONS.map((v) => (
                  <option key={v.type} value={v.type}>
                    {v.type} ({v.capacityKg} kg)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-2 text-emerald-950">
            <div className="flex justify-between items-center">
              <span className="font-bold">{st.ratePerKm}</span>
              <span className="font-black text-sm">₹{customFuelRate} / km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">{st.transPerKg}</span>
              <span className="font-black text-sm text-emerald-800">
                ₹{calculatedTransport.costPerKg.toFixed(2)} / kg
              </span>
            </div>
            <div className="pt-2 border-t border-emerald-200 flex justify-between font-black text-sm text-emerald-950">
              <span>{st.fuelCostEst}</span>
              <span>{formatINR(calculatedTransport.totalTransportCost)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Channel Comparison Table */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-5">
        <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
          <Scale className="w-5 h-5 text-emerald-800" />
          <h3 className="text-base sm:text-lg font-black text-stone-900">
            {st.tableTitle}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-stone-200 text-stone-500 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-3">{st.tableChannel}</th>
                <th className="py-3 px-3 text-right">{st.tableOffer}</th>
                <th className="py-3 px-3 text-right">{st.tableTransport}</th>
                <th className="py-3 px-3 text-right">{st.tableHamali}</th>
                <th className="py-3 px-3 text-right text-emerald-900 font-black">{st.tableNetRate}</th>
                <th className="py-3 px-3 text-right">{st.tableEstProfit}</th>
                <th className="py-3 px-3 text-right">{st.tableDifference}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {computedOptions.map((opt, idx) => {
                const isTop = idx === 0;
                return (
                  <tr
                    key={opt.id}
                    className={`transition ${
                      isTop
                        ? 'bg-emerald-50 font-bold text-emerald-950'
                        : 'hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <td className="py-4 px-3">
                      <div className="flex items-center space-x-2">
                        {isTop ? (
                          <Award className="w-5 h-5 text-amber-500 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-stone-300"></span>
                        )}
                        <div>
                          <strong className="block text-stone-900 font-black text-sm">{opt.targetName}</strong>
                          <span className="text-[11px] text-stone-500">{opt.location} • {opt.targetType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-right font-bold text-stone-900">
                      ₹{opt.offerPricePerKg}
                    </td>
                    <td className="py-4 px-3 text-right text-rose-600 font-semibold">
                      {opt.transportCostPerKg > 0 ? `-₹${opt.transportCostPerKg.toFixed(2)}` : '₹0'}
                    </td>
                    <td className="py-4 px-3 text-right text-rose-600 font-semibold">
                      -₹{(opt.loadingUnloadingCostPerKg + opt.marketCessCommissionPerKg).toFixed(2)}
                    </td>
                    <td className="py-4 px-3 text-right text-base font-black text-emerald-800">
                      ₹{opt.estimatedNetRealizationPerKg.toFixed(2)}
                    </td>
                    <td className="py-4 px-3 text-right font-black text-stone-900">
                      {formatINR(opt.totalEstimatedProfit)}
                    </td>
                    <td className="py-4 px-3 text-right">
                      {isTop ? (
                        <span className="px-2.5 py-1 bg-emerald-700 text-white text-[11px] font-black rounded-full">
                          {st.benchmark}
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold text-xs">
                          -{formatINR(opt.differenceVsTopOption)} {st.lossLabel}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellingDecision;
