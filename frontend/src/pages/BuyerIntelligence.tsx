import React, { useState, useMemo } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { BuyerCard } from '../components/cards/BuyerCard';
import { CropType } from '../types';
import {
  Building2,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Truck,
  CheckCircle2,
  PhoneCall,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerIntelligence: React.FC = () => {
  const { buyers, farmer } = useFarmData();
  const { language, t } = useLanguage();

  const [selectedCrop, setSelectedCrop] = useState<CropType | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [pickupOnly, setPickupOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuyers = useMemo(() => {
    return buyers.filter((b) => {
      const matchCrop = selectedCrop === 'All' || b.preferredCrop === selectedCrop;
      const matchDistrict = selectedDistrict === 'All' || b.district === selectedDistrict;
      const matchPickup = !pickupOnly || b.pickupAvailable;
      const matchSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.companyType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCrop && matchDistrict && matchPickup && matchSearch;
    });
  }, [buyers, selectedCrop, selectedDistrict, pickupOnly, searchQuery]);

  const maxOffer = useMemo(() => {
    return Math.max(...buyers.map((b) => b.offerPricePerKg));
  }, [buyers]);

  const verifiedCount = useMemo(() => {
    return buyers.filter((b) => b.verificationStatus.includes('Verified')).length;
  }, [buyers]);

  const bText = {
    mr: {
      badge: 'पडताळणीकृत थेट खरेदीदार',
      title: 'थेट खरेदीदार व एक्सपोर्टर्स (Direct Buyers)',
      subtitle: 'शेतावर येऊन रोख पेमेंट करणारे एक्सपोर्टर्स, कॉर्पोरेट खरेदीदार व पॅकहाऊसशी थेट संपर्क करा.',
      ctaDecision: 'स्मार्ट विक्री निर्णय कॅल्क्युलेटर',
      kpiActive: 'सक्रिय खरेदीदार',
      kpiActiveUnit: 'खरेदीदार',
      kpiVerified: `${verifiedCount} पडताळणीकृत पार्टनर्स`,
      kpiMax: 'सर्वोच्च ऑफर भाव (Max Offer)',
      kpiMaxSub: 'प्रीमियम एक्सपोर्ट ग्रेड द्राक्ष/डाळिंब',
      kpiPickup: 'थेट शेतावरून मोफत उचल',
      kpiPickupCount: `${buyers.filter((b) => b.pickupAvailable).length} कंपन्या`,
      kpiPickupSub: 'गाडीभाडे व हमाली शून्य (₹०)',
      kpiPayment: 'सुरक्षित बँक ट्रान्सफर',
      kpiPaymentDays: '३-७ दिवस',
      kpiPaymentSub: 'वेळेवर पेमेंट पडताळणी',
      searchPlaceholder: 'कंपनीचे नाव, ठिकाण किंवा खरेदीदार शोधा...',
      districtLabel: 'जिल्हा:',
      allDistricts: 'सर्व जिल्हे (All Districts)',
      allCrops: 'सर्व पिके',
      cropGrapes: '🍇 द्राक्ष (Grapes)',
      cropPom: '🍎 डाळिंब (Pomegranate)',
      pickupOnlyLabel: 'फक्त मोफत शेत उचल देणारे',
      listTitle: 'उपलब्ध खरेदीदार सूची',
    },
    hi: {
      badge: 'सत्यापित सीधे खरीदार',
      title: 'सीधे खरीदार व एक्सपोर्टर्स (Direct Buyers)',
      subtitle: 'खेत पर आकर त्वरित भुगतान करने वाले एक्सपोर्टर्स, कॉर्पोरेट खरीदार व पैकहाउस से सीधे जुड़ें।',
      ctaDecision: 'स्मार्ट बिक्री निर्णय कैलकुलेटर',
      kpiActive: 'सक्रिय खरीदार',
      kpiActiveUnit: 'खरीदार',
      kpiVerified: `${verifiedCount} सत्यापित पार्टनर्स`,
      kpiMax: 'अधिकतम ऑफर भाव (Max Offer)',
      kpiMaxSub: 'प्रीमियम एक्सपोर्ट ग्रेड अंगूर/अनार',
      kpiPickup: 'सीधे खेत से मुफ्त उठान',
      kpiPickupCount: `${buyers.filter((b) => b.pickupAvailable).length} कंपनियां`,
      kpiPickupSub: 'गाड़ी भाड़ा व हमाली शून्य (₹०)',
      kpiPayment: 'सुरक्षित बैंक ट्रांसफर',
      kpiPaymentDays: '३-७ दिन',
      kpiPaymentSub: 'समय पर भुगतान गारंटी',
      searchPlaceholder: 'कंपनी का नाम, स्थान या खरीदार खोजें...',
      districtLabel: 'जिला:',
      allDistricts: 'सभी जिले (All Districts)',
      allCrops: 'सभी फसलें',
      cropGrapes: '🍇 अंगूर (Grapes)',
      cropPom: '🍎 अनार (Pomegranate)',
      pickupOnlyLabel: 'केवल खेत से उठान वाले',
      listTitle: 'उपलब्ध खरीदार सूची',
    },
    en: {
      badge: 'Verified Buyer Network',
      title: 'Direct Buyers & Exporters (खरेदीदार)',
      subtitle: 'Direct farm-gate exporters, retail aggregators, and institutional packhouses.',
      ctaDecision: 'Run Selling Engine',
      kpiActive: 'Active Buyers',
      kpiActiveUnit: 'buyers',
      kpiVerified: `${verifiedCount} Verified Partners`,
      kpiMax: 'Top Peak Offer (Max)',
      kpiMaxSub: 'Premium Export Lot Quality',
      kpiPickup: 'Farm-Gate Free Pickup',
      kpiPickupCount: `${buyers.filter((b) => b.pickupAvailable).length} Companies`,
      kpiPickupSub: 'Zero Transport Expense (₹0)',
      kpiPayment: 'Direct Settlement',
      kpiPaymentDays: '3-7 Days',
      kpiPaymentSub: 'Verified Payment History',
      searchPlaceholder: 'Search buyer name, company or location...',
      districtLabel: 'District:',
      allDistricts: 'All Districts',
      allCrops: 'All Crops',
      cropGrapes: '🍇 Grapes',
      cropPom: '🍎 Pomegranate',
      pickupOnlyLabel: 'Farm pickup only',
      listTitle: 'Available Direct Buyers Directory',
    }
  };

  const bt = bText[language] || bText.mr;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <Building2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {bt.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {bt.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {bt.subtitle}
          </p>
        </div>

        <Link
          to="/selling-decision"
          className="flex items-center space-x-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black rounded-2xl text-xs sm:text-sm shadow-md transition shrink-0 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>{bt.ctaDecision}</span>
        </Link>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Verified Buyers */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {bt.kpiActive}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">
            {filteredBuyers.length} {bt.kpiActiveUnit}
          </div>
          <span className="text-xs font-bold text-emerald-800 block">
            {bt.kpiVerified}
          </span>
        </div>

        {/* Card 2: Highest Offer Price */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {bt.kpiMax}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">
            ₹{maxOffer} / kg
          </div>
          <span className="text-xs font-bold text-stone-500 block">
            {bt.kpiMaxSub}
          </span>
        </div>

        {/* Card 3: Free Farm Pickup */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {bt.kpiPickup}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">
            {bt.kpiPickupCount}
          </div>
          <span className="text-xs font-bold text-emerald-700 block">
            {bt.kpiPickupSub}
          </span>
        </div>

        {/* Card 4: Payment Reliability */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {bt.kpiPayment}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">
            {bt.kpiPaymentDays}
          </div>
          <span className="text-xs font-bold text-stone-500 block">
            {bt.kpiPaymentSub}
          </span>
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
              placeholder={bt.searchPlaceholder}
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
            <span className="text-xs font-black text-stone-600">{bt.districtLabel}</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-2 bg-stone-50 border-2 border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="All">{bt.allDistricts}</option>
              <option value="Nashik">Nashik (नाशिक)</option>
              <option value="Sangli">Sangli (सांगली)</option>
              <option value="Pune">Pune (पुणे)</option>
              <option value="Solapur">Solapur (सोलापूर)</option>
            </select>
          </div>
        </div>

        {/* Crop Pills & Pickup Checkbox */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <div className="inline-flex rounded-2xl bg-stone-100 p-1 border border-stone-200 text-xs font-black">
            <button
              onClick={() => setSelectedCrop('All')}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                selectedCrop === 'All' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {bt.allCrops}
            </button>
            <button
              onClick={() => setSelectedCrop('Grapes')}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                selectedCrop === 'Grapes' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {bt.cropGrapes}
            </button>
            <button
              onClick={() => setSelectedCrop('Pomegranate')}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                selectedCrop === 'Pomegranate' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {bt.cropPom}
            </button>
          </div>

          <label className="flex items-center space-x-2 text-xs font-bold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={pickupOnly}
              onChange={(e) => setPickupOnly(e.target.checked)}
              className="w-4 h-4 text-emerald-800 rounded border-stone-300 focus:ring-emerald-600 cursor-pointer"
            />
            <span>{bt.pickupOnlyLabel}</span>
          </label>
        </div>
      </div>

      {/* Buyer Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-stone-900">
            {bt.listTitle} ({filteredBuyers.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBuyers.map((buyer) => (
            <BuyerCard key={buyer.id} buyer={buyer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerIntelligence;
