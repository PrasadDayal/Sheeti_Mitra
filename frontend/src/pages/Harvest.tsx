import React, { useState, useMemo } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { Modal } from '../components/common/Modal';
import { HarvestForm } from '../components/forms/HarvestForm';
import { formatINR } from '../utils/calculations';
import {
  Scale,
  PlusCircle,
  TrendingUp,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Search,
  Award,
  Truck,
  ShieldCheck,
  FileText,
  Percent,
  Layers,
  ArrowRight,
  Package,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Harvest: React.FC = () => {
  const { harvestBatches, farmer } = useFarmData();
  const { language, t } = useLanguage();

  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredBatches = useMemo(() => {
    return harvestBatches.filter((b) => {
      const matchCrop = selectedCrop === 'All' || b.crop === selectedCrop;
      const matchGrade = selectedGrade === 'All' || b.grade.includes(selectedGrade);
      const matchSearch =
        searchQuery.trim() === '' ||
        b.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.notes.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCrop && matchGrade && matchSearch;
    });
  }, [harvestBatches, selectedCrop, selectedGrade, searchQuery]);

  const totalHarvestedKg = useMemo(() => {
    return filteredBatches.reduce((sum, b) => sum + b.quantityKg, 0);
  }, [filteredBatches]);

  const totalHarvestRevenue = useMemo(() => {
    return filteredBatches.reduce((sum, b) => sum + b.totalRevenue, 0);
  }, [filteredBatches]);

  const avgRealization = totalHarvestedKg > 0 ? (totalHarvestRevenue / totalHarvestedKg).toFixed(2) : '0';

  const exportQty = filteredBatches.filter((b) => b.grade.includes('Export')).reduce((sum, b) => sum + b.quantityKg, 0);
  const exportPercent = totalHarvestedKg > 0 ? Math.round((exportQty / totalHarvestedKg) * 100) : 0;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const hText = {
    mr: {
      badge: 'उत्पादन व विक्री पावती',
      title: 'तोडणी, वजन व विक्री नोंद (Harvest & Yield)',
      subtitle: 'तोडणी वजन (किलो), फळांची साखर (Brix), खरेदीदार विक्री पावती आणि निव्वळ उत्पन्न नोंदवा.',
      addBtn: '+ नवीन तोडणी नोंदवा',
      kpiYield: 'एकूण तोडलेले उत्पादन (Total Yield)',
      kpiYieldSub: `${filteredBatches.length} तोडणी बॅचेस नोंदवल्या`,
      kpiRevenue: 'एकूण विक्री महसूल (Revenue)',
      kpiRevenueSub: 'थेट शेतावर वजन व विक्री',
      kpiAvg: 'मिळालेला सरासरी भाव (Avg Rate)',
      kpiAvgSub: 'एक्सपोर्ट व लोकल सरासरी',
      kpiExport: 'एक्सपोर्ट ग्रेड प्रमाण (Export %)',
      kpiExportSub: '१७.५+ ब्रिक्स साखर गोडी',
      bannerTitle: 'पुढील तोडणीसाठी खरेदीदार शोधताय का? (Find Best Buyers)',
      bannerSub: 'थेट शेतावरून माल उचलणारे व्यापारी, एक्सपोर्टर्स व सुपरमार्केटच्या चालू ऑफर्स तपासा.',
      bannerBtn: 'स्मार्ट विक्री निर्णय इंजिन',
      searchPlaceholder: 'खरेदीदाराचे नाव, बॅच # किंवा शेत प्लॉट शोधा...',
      gradeLabel: 'दर्जा (Grade):',
      allGrades: 'सर्व ग्रेड (All Grades)',
      exportGrade: 'एक्सपोर्ट ग्रेड (Export Grade A)',
      domesticGrade: 'देशांतर्गत (Domestic Grade A)',
      cropLabel: 'पीक निवडा:',
      allCrops: 'सर्व पिके',
      cropGrapes: '🍇 थॉम्सन द्राक्ष',
      cropPom: '🍎 भगवा डाळिंब',
      listTitle: 'नोंदवलेल्या तोडणी बॅचेस',
      modalTitle: 'नवीन तोडणी व वजन नोंदवा (Log Harvest)',
    },
    hi: {
      badge: 'उत्पादन व बिक्री रसीद',
      title: 'कटाई, वजन व बिक्री दर्ज करें (Harvest & Yield)',
      subtitle: 'कटाई वजन (किलो), शर्करा स्तर (Brix), खरीदार बिक्री रसीद और शुद्ध आय दर्ज करें।',
      addBtn: '+ नई कटाई दर्ज करें',
      kpiYield: 'कुल कटाई उत्पादन (Total Yield)',
      kpiYieldSub: `${filteredBatches.length} कटाई बैच दर्ज`,
      kpiRevenue: 'कुल बिक्री आय (Revenue)',
      kpiRevenueSub: 'सीधे खेत पर वजन व बिक्री',
      kpiAvg: 'प्राप्त औसत भाव (Avg Rate)',
      kpiAvgSub: 'एक्सपोर्ट व लोकल औसत',
      kpiExport: 'एक्सपोर्ट ग्रेड अनुपात (Export %)',
      kpiExportSub: '१७.५+ ब्रिक्स शर्करा स्तर',
      bannerTitle: 'अगली कटाई के लिए खरीदार खोज रहे हैं? (Find Best Buyers)',
      bannerSub: 'खेत से सीधे माल उठाने वाले व्यापारी, एक्सपोर्टर्स व सुपरमार्केट की चालू दरें जांचें।',
      bannerBtn: 'स्मार्ट बिक्री निर्णय इंजन',
      searchPlaceholder: 'खरीदार का नाम, बैच # या खेत प्लॉट खोजें...',
      gradeLabel: 'ग्रेड (Grade):',
      allGrades: 'सभी ग्रेड (All Grades)',
      exportGrade: 'एक्सपोर्ट ग्रेड (Export Grade A)',
      domesticGrade: 'घरेलू ग्रेड (Domestic Grade A)',
      cropLabel: 'फसल चुनें:',
      allCrops: 'सभी फसलें',
      cropGrapes: '🍇 थॉमसन अंगूर',
      cropPom: '🍎 भगवा अनार',
      listTitle: 'दर्ज कटाई बैच सूची',
      modalTitle: 'नई कटाई व वजन दर्ज करें (Log Harvest)',
    },
    en: {
      badge: 'Yield & Sales Dispatch Logistics',
      title: 'Harvest, Yield & Sales Tracking (तोडणी)',
      subtitle: 'Track lot weight (Kg), Sugar Brix maturity, buyer sales receipts, and gross realizations.',
      addBtn: '+ Log New Harvest Batch',
      kpiYield: 'Total Harvested Volume (Yield)',
      kpiYieldSub: `${filteredBatches.length} harvest lots recorded`,
      kpiRevenue: 'Gross Sales Revenue (Revenue)',
      kpiRevenueSub: 'Direct farm-gate settlement',
      kpiAvg: 'Weighted Realization Rate',
      kpiAvgSub: 'Blended export & domestic average',
      kpiExport: 'Export Grade Share',
      kpiExportSub: '17.5+ Sugar Brix standard',
      bannerTitle: 'Looking for verified buyers for your next harvest?',
      bannerSub: 'Compare farm-gate exporters, domestic retail packhouses, and APMC mandis.',
      bannerBtn: 'Smart Selling Decision Engine',
      searchPlaceholder: 'Search buyer, batch number or field name...',
      gradeLabel: 'Grade:',
      allGrades: 'All Grades',
      exportGrade: 'Grade A (Export Quality)',
      domesticGrade: 'Grade A (Domestic Supermarket)',
      cropLabel: 'Crop:',
      allCrops: 'All Crops',
      cropGrapes: '🍇 Thomson Grapes',
      cropPom: '🍎 Bhagwa Pomegranate',
      listTitle: 'Logged Harvest & Sales Batches',
      modalTitle: 'Log Harvest & Weight Batch',
    }
  };

  const ht = hText[language] || hText.mr;

  const getGradeBadge = (grade: string) => {
    if (grade.includes('Export')) {
      return {
        bg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
        label: language === 'mr' ? '🌟 एक्सपोर्ट दर्जा (Grade A Export)' : language === 'hi' ? '🌟 एक्सपोर्ट दर्जा (Grade A Export)' : '🌟 Grade A Export Quality',
      };
    }
    if (grade.includes('Domestic')) {
      return {
        bg: 'bg-blue-100 text-blue-950 border-blue-300',
        label: language === 'mr' ? '🏪 देशांतर्गत सुपरमार्केट (Grade A Domestic)' : language === 'hi' ? '🏪 घरेलू सुपरमार्केट (Grade A Domestic)' : '🏪 Grade A Domestic Retail',
      };
    }
    return {
      bg: 'bg-amber-100 text-amber-950 border-amber-300',
      label: language === 'mr' ? '📦 लोकल मार्केट (Grade B)' : language === 'hi' ? '📦 लोकल मार्केट (Grade B)' : '📦 Local Mandi (Grade B)',
    };
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 text-sm font-bold border-2 border-emerald-400 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <Scale className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {ht.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {ht.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {ht.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-5 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 text-emerald-300" />
          <span>{ht.addBtn}</span>
        </button>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Harvest */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {ht.kpiYield}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">
            {totalHarvestedKg.toLocaleString()} kg
          </div>
          <span className="text-xs font-bold text-emerald-800 block">
            {ht.kpiYieldSub}
          </span>
        </div>

        {/* Card 2: Dispatched Revenue */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {ht.kpiRevenue}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">
            {formatINR(totalHarvestRevenue)}
          </div>
          <span className="text-xs font-bold text-stone-500 block">
            {ht.kpiRevenueSub}
          </span>
        </div>

        {/* Card 3: Average Realization Rate */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {ht.kpiAvg}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-700">
            ₹{avgRealization} / kg
          </div>
          <span className="text-xs font-bold text-blue-600 block">
            {ht.kpiAvgSub}
          </span>
        </div>

        {/* Card 4: Export Grade Percentage */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {ht.kpiExport}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{exportPercent}%</div>
          <span className="text-xs font-bold text-amber-700 block">
            {ht.kpiExportSub}
          </span>
        </div>
      </div>

      {/* Smart Selling Link Callout Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shrink-0">
            💡
          </div>
          <div>
            <h3 className="font-black text-base text-white">
              {ht.bannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              {ht.bannerSub}
            </p>
          </div>
        </div>

        <Link
          to="/selling-decision"
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm rounded-xl transition flex items-center space-x-2 shrink-0 shadow-sm"
        >
          <span>{ht.bannerBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ht.searchPlaceholder}
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

          {/* Grade Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-stone-600">{ht.gradeLabel}</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="p-2 bg-stone-50 border-2 border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="All">{ht.allGrades}</option>
              <option value="Export">{ht.exportGrade}</option>
              <option value="Domestic">{ht.domesticGrade}</option>
            </select>
          </div>
        </div>

        {/* Crop Pills Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-500 shrink-0">{ht.cropLabel}</span>
          <button
            onClick={() => setSelectedCrop('All')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              selectedCrop === 'All'
                ? 'bg-emerald-800 text-white font-black shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {ht.allCrops}
          </button>
          <button
            onClick={() => setSelectedCrop('Grapes')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              selectedCrop === 'Grapes'
                ? 'bg-emerald-800 text-white font-black shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {ht.cropGrapes}
          </button>
          <button
            onClick={() => setSelectedCrop('Pomegranate')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              selectedCrop === 'Pomegranate'
                ? 'bg-emerald-800 text-white font-black shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {ht.cropPom}
          </button>
        </div>
      </div>

      {/* Harvest Batches Table */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
        <h3 className="text-base sm:text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
          {ht.listTitle} ({filteredBatches.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-stone-200 text-stone-500 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-3">{language === 'en' ? 'Batch / Date' : 'बॅच # व तारीख'}</th>
                <th className="py-3 px-3">{language === 'en' ? 'Plot & Crop' : 'शेत व पीक'}</th>
                <th className="py-3 px-3">{language === 'en' ? 'Quality & Brix' : 'दर्जा व ब्रिक्स गोडी'}</th>
                <th className="py-3 px-3">{language === 'en' ? 'Buyer & Settlement' : 'खरेदीदार व पेमेंट'}</th>
                <th className="py-3 px-3 text-right">{language === 'en' ? 'Weight (Kg)' : 'तोडणी वजन (Kg)'}</th>
                <th className="py-3 px-3 text-right">{language === 'en' ? 'Rate (₹/Kg)' : 'दर (₹/Kg)'}</th>
                <th className="py-3 px-3 text-right text-emerald-950 font-black">{language === 'en' ? 'Gross Revenue' : 'एकूण रक्कम'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredBatches.map((batch) => {
                const badge = getGradeBadge(batch.grade);
                return (
                  <tr key={batch.id} className="hover:bg-stone-50 transition">
                    <td className="py-4 px-3">
                      <strong className="block text-stone-900 font-black">{batch.batchNumber}</strong>
                      <span className="text-stone-500 text-xs">{batch.harvestDate}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="font-bold text-stone-800 block">{batch.fieldName}</span>
                      <span className="text-xs text-stone-500">{batch.crop}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      {batch.sugarBrix && (
                        <span className="block text-xs font-bold text-amber-800 mt-1">
                          🍬 {batch.sugarBrix} Brix
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-3">
                      <strong className="text-stone-900 block font-bold">{batch.buyerName}</strong>
                      <span className="text-[11px] text-stone-500">{batch.notes || (language === 'en' ? 'Direct Farm Gate' : 'थेट शेतावर वजन')}</span>
                    </td>
                    <td className="py-4 px-3 text-right font-black text-stone-900 text-sm">
                      {batch.quantityKg.toLocaleString()} kg
                    </td>
                    <td className="py-4 px-3 text-right font-bold text-stone-800">
                      ₹{batch.sellingPricePerKg}
                    </td>
                    <td className="py-4 px-3 text-right font-black text-emerald-800 text-sm">
                      {formatINR(batch.totalRevenue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Harvest Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title={ht.modalTitle}
        >
          <HarvestForm
            onSuccess={() => {
              setShowAddModal(false);
              triggerToast('तोडणी बॅच यशस्वीरीत्या नोंदवली गेली / Logged!');
            }}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Harvest;
