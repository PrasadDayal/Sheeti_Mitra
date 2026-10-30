import React, { useState, useMemo } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { InputShopCard } from '../components/cards/InputShopCard';
import {
  Store,
  Search,
  Filter,
  ShieldCheck,
  MapPin,
  Tag,
  Sparkles,
  Info,
  Droplets,
  Package,
  BadgePercent,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';

export const InputIntelligence: React.FC = () => {
  const { inputShops, farmer } = useFarmData();
  const { language, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredShops = useMemo(() => {
    return inputShops.filter((s) => {
      const matchDistrict = selectedDistrict === 'All' || s.district === selectedDistrict;
      const matchSearch =
        searchQuery.trim() === '' ||
        s.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.products.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === 'All' ||
        s.products.some((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

      return matchDistrict && matchSearch && matchCategory;
    });
  }, [inputShops, selectedDistrict, searchQuery, selectedCategory]);

  const inText = {
    mr: {
      badge: 'परवानाधारक कृषी सेवा केंद्र',
      title: 'खते, औषधे व कृषी दुकाने (Agro Inputs)',
      subtitle: 'जवळची कृषी सेवा केंद्र, विद्राव्य खते (0:0:50, 0:52:34, 12:61:0) व कीटकनाशकांचे थेट भाव तपासा.',
      verifiedBadge: '१००% अधिकृत परवानाधारक दुकाने',
      verifiedSub: 'थेट डिस्काउंट व ओरिजिनल बिल',
      kpiShops: 'नोंदणीकृत कृषी केंद्र',
      kpiShopsUnit: 'दुकाने',
      kpiShopsSub: `${farmer.district} व लगतचे तालुके`,
      kpiDiscount: 'खत खरेदी सरासरी सवलत',
      kpiDiscountSub: 'होलसेल कॅश डिस्काउंट',
      kpiStock: 'प्रमुख खते चालू स्टॉक',
      kpiStockSub: 'विद्राव्य व मायक्रोन्यूट्रिएंट्स',
      kpiDelivery: 'मोफत शेत पोहोच डिलिव्हरी',
      kpiDeliveryCount: '१०+ दुकाने',
      kpiDeliverySub: 'मोठ्या ऑर्डर्सवर शेतात थेट डिलिव्हरी',
      searchPlaceholder: 'दुकान, खताचे नाव (0:0:50, GA3, बोरॉन) शोधा...',
      districtLabel: 'जिल्हा:',
      allDistricts: 'सर्व जिल्हे (All Districts)',
      allCategories: 'सर्व उत्पादने (All)',
      catFertilizer: '🌱 विद्राव्य खते',
      catPesticide: '🧪 कीटकनाशके व टॉनिक',
      catBio: '🧫 जैविक खते',
      listTitle: 'उपलब्ध कृषी सेवा केंद्र व चालू दर',
    },
    hi: {
      badge: 'अधिकृत कृषि सेवा केंद्र',
      title: 'खाद, कीटनाशक व कृषि दुकानें (Agro Inputs)',
      subtitle: 'निकटतम कृषि सेवा केंद्र, वाटर सॉल्युबल खाद (0:0:50, 0:52:34, 12:61:0) व कीटनाशकों के सीधे भाव जांचें।',
      verifiedBadge: '१००% अधिकृत लाइसेंसधारी दुकानें',
      verifiedSub: 'सीधा डिस्काउंट व असली बिल',
      kpiShops: 'पंजीकृत कृषि केंद्र',
      kpiShopsUnit: 'दुकानें',
      kpiShopsSub: `${farmer.district} व आसपास के क्षेत्र`,
      kpiDiscount: 'खाद खरीद पर औसत छूट',
      kpiDiscountSub: 'होलसेल नकद डिस्काउंट',
      kpiStock: 'प्रमुख उर्वरक उपलब्ध स्टॉक',
      kpiStockSub: 'घुलनशील व सूक्ष्म पोषक तत्व',
      kpiDelivery: 'मुफ्त खेत तक डिलीवरी',
      kpiDeliveryCount: '१०+ दुकानें',
      kpiDeliverySub: 'बड़े ऑर्डर पर सीधे खेत पर डिलीवरी',
      searchPlaceholder: 'दुकान, खाद का नाम (0:0:50, GA3, बोरॉन) खोजें...',
      districtLabel: 'जिला:',
      allDistricts: 'सभी जिले (All Districts)',
      allCategories: 'सभी उत्पाद (All)',
      catFertilizer: '🌱 वाटर सॉल्युबल खाद',
      catPesticide: '🧪 कीटनाशक व टॉनिक',
      catBio: '🧫 जैविक खाद',
      listTitle: 'उपलब्ध कृषि सेवा केंद्र व चालू दरें',
    },
    en: {
      badge: 'Authorized Agri-Input Centers',
      title: 'Input & Fertilizer Intelligence (खते व औषधे)',
      subtitle: 'Locate certified agri-dealers, compare water-soluble fertilizer prices (0:0:50, 0:52:34) and agrochemicals.',
      verifiedBadge: '100% Authorized Dealers',
      verifiedSub: 'Genuine GST invoice with cash discount',
      kpiShops: 'Registered Agri Stores',
      kpiShopsUnit: 'stores',
      kpiShopsSub: `${farmer.district} and surrounding areas`,
      kpiDiscount: 'Average Input Discount',
      kpiDiscountSub: 'Wholesale seasonal cash rebate',
      kpiStock: 'Live Chemical Inventory',
      kpiStockSub: '100% genuine guaranteed stocks',
      kpiDelivery: 'Free Farm-Gate Delivery',
      kpiDeliveryCount: '10+ Stores',
      kpiDeliverySub: 'On bulk bag orders',
      searchPlaceholder: 'Search shop name, brand or chemical (0:0:50, GA3)...',
      districtLabel: 'District:',
      allDistricts: 'All Districts',
      allCategories: 'All Products',
      catFertilizer: '🌱 Water-Soluble Fertilizers',
      catPesticide: '🧪 Crop Protection',
      catBio: '🧫 Bio-Nutrients',
      listTitle: 'Nearby Authorized Agri-Input Dealers',
    }
  };

  const it = inText[language] || inText.mr;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <Store className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {it.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {it.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {it.subtitle}
          </p>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-300 px-4 py-2.5 rounded-2xl text-xs text-emerald-950 flex items-center space-x-2.5 shrink-0 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <div>
            <span className="font-black block text-xs">{it.verifiedBadge}</span>
            <span className="text-[11px] text-emerald-800">{it.verifiedSub}</span>
          </div>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Registered Agro Centers */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {it.kpiShops}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">
            {filteredShops.length} {it.kpiShopsUnit}
          </div>
          <span className="text-xs font-bold text-emerald-800 block">
            {it.kpiShopsSub}
          </span>
        </div>

        {/* Card 2: Average Discount */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {it.kpiDiscount}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">
            5% - 15%
          </div>
          <span className="text-xs font-bold text-stone-500 block">
            {it.kpiDiscountSub}
          </span>
        </div>

        {/* Card 3: Stock Status */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {it.kpiStock}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">
            100% {language === 'mr' ? 'उपलब्ध' : language === 'hi' ? 'उपलब्ध' : 'In-Stock'}
          </div>
          <span className="text-xs font-bold text-emerald-700 block">
            {it.kpiStockSub}
          </span>
        </div>

        {/* Card 4: Farm Delivery */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {it.kpiDelivery}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">
            {it.kpiDeliveryCount}
          </div>
          <span className="text-xs font-bold text-stone-500 block">
            {it.kpiDeliverySub}
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
              placeholder={it.searchPlaceholder}
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

          {/* District Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-stone-600">{it.districtLabel}</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-2 bg-stone-50 border-2 border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="All">{it.allDistricts}</option>
              <option value="Nashik">Nashik (नाशिक)</option>
              <option value="Sangli">Sangli (सांगली)</option>
              <option value="Pune">Pune (पुणे)</option>
              <option value="Solapur">Solapur (सोलापूर)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs font-bold">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              selectedCategory === 'All' ? 'bg-emerald-800 text-white font-black shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {it.allCategories}
          </button>
          <button
            onClick={() => setSelectedCategory('Fertilizer')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              selectedCategory === 'Fertilizer' ? 'bg-emerald-800 text-white font-black shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {it.catFertilizer}
          </button>
          <button
            onClick={() => setSelectedCategory('Pesticide')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              selectedCategory === 'Pesticide' ? 'bg-emerald-800 text-white font-black shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {it.catPesticide}
          </button>
          <button
            onClick={() => setSelectedCategory('Bio')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              selectedCategory === 'Bio' ? 'bg-emerald-800 text-white font-black shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {it.catBio}
          </button>
        </div>
      </div>

      {/* Shop Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-stone-900">
            {it.listTitle} ({filteredShops.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredShops.map((shop) => (
            <InputShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputIntelligence;
