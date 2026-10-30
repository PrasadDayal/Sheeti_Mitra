import React, { useState } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { Modal } from '../components/common/Modal';
import { FieldForm } from '../components/forms/FieldForm';
import { IMAGES } from '../images/images';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  PlusCircle,
  MapPin,
  Droplets,
  Layers,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Phone,
  ArrowRight,
  TrendingUp,
  Activity,
  Check,
} from 'lucide-react';

export const FarmProfile: React.FC = () => {
  const { farmer, fields } = useFarmData();
  const { language, t } = useLanguage();
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [selectedCropFilter, setSelectedCropFilter] = useState<'All' | 'Grapes' | 'Pomegranate'>('All');

  const filteredFields = fields.filter((f) => {
    if (selectedCropFilter === 'All') return true;
    return f.crop === selectedCropFilter;
  });

  const fpText = {
    mr: {
      badge: 'शेती मास्टर प्रोफाइल',
      title: 'माझी शेती व पीक तपशील (Farm Profile)',
      subtitle: 'जमीन क्षेत्र, ठिबक सिंचन, माती प्रकार आणि पिकाच्या वाढीचे टप्पे व्यवस्थापित करा.',
      addBtn: '+ नवीन प्लॉट जोडा',
      verifiedFarmer: 'पडताळणीकृत महाराष्ट्र बागायतदार',
      seasonActive: 'हंगाम २०२५-२६ सक्रिय',
      kpiArea: 'एकूण शेती क्षेत्र',
      kpiAreaUnit: 'एकर',
      kpiActivePlots: `${fields.length} सक्रिय प्लॉट`,
      kpiIrrigation: 'सिंचन पद्धत',
      kpiIrrigationType: 'ठिबक सिंचन (Drip)',
      kpiIrrigationSub: 'ऑटोमेटेड व्हॉल्व्ह सिस्टीम',
      kpiSoil: 'माती प्रकार',
      kpiSoilType: 'मध्यम काळी कसदार',
      kpiSoilSub: 'pH ७.२ उत्तम निचरा',
      kpiCropStatus: 'पिकाचा चालू टप्पा',
      kpiCropStage: 'मणी मऊ पडणे (Berry Soft)',
      kpiCropSub: 'साखर प्रमाण १५.५ Brix',
      plotsTitle: 'माझे शेत प्लॉट तपशील',
      allPlots: 'सर्व प्लॉट',
      cropGrapes: '🍇 द्राक्ष',
      cropPom: '🍎 डाळिंब',
      modalTitle: 'नवीन शेत प्लॉट जोडा (Add New Plot)',
    },
    hi: {
      badge: 'खेत मास्टर प्रोफाइल',
      title: 'मेरा खेत व फसल विवरण (Farm Profile)',
      subtitle: 'जमीन रकबा, ड्रिप सिंचाई, मिट्टी प्रकार और फसल की अवस्था प्रबंधित करें।',
      addBtn: '+ नया प्लॉट जोड़ें',
      verifiedFarmer: 'सत्यापित महाराष्ट्र किसान',
      seasonActive: 'सीजन २०२५-२६ सक्रिय',
      kpiArea: 'कुल खेती रकबा',
      kpiAreaUnit: 'एकड़',
      kpiActivePlots: `${fields.length} सक्रिय प्लॉट`,
      kpiIrrigation: 'सिंचाई विधि',
      kpiIrrigationType: 'ड्रिप सिंचाई (Drip)',
      kpiIrrigationSub: 'स्वचालित वाल्व प्रणाली',
      kpiSoil: 'मिट्टी प्रकार',
      kpiSoilType: 'मध्यम काली उपजाऊ',
      kpiSoilSub: 'pH ७.२ उत्तम जल निकासी',
      kpiCropStatus: 'फसल की वर्तमान अवस्था',
      kpiCropStage: 'बेरी नरम होना (Berry Soft)',
      kpiCropSub: 'शर्करा स्तर १५.५ Brix',
      plotsTitle: 'मेरे खेत प्लॉट विवरण',
      allPlots: 'सभी प्लॉट',
      cropGrapes: '🍇 अंगूर',
      cropPom: '🍎 अनार',
      modalTitle: 'नया खेत प्लॉट जोड़ें (Add New Plot)',
    },
    en: {
      badge: 'Farm Master Profile & Acreage',
      title: 'My Farm & Plot Configuration (माझी शेती)',
      subtitle: 'Manage land parcels, drip irrigation networks, soil analysis, and crop growth stages.',
      addBtn: '+ Add New Plot Parcel',
      verifiedFarmer: 'Verified Orchard Grower',
      seasonActive: 'Active Season 2025-26',
      kpiArea: 'Total Cultivated Land',
      kpiAreaUnit: 'Acres',
      kpiActivePlots: `${fields.length} Active Plots`,
      kpiIrrigation: 'Irrigation Setup',
      kpiIrrigationType: 'Drip Micro-Irrigation',
      kpiIrrigationSub: 'Automated fertigation lines',
      kpiSoil: 'Soil Classification',
      kpiSoilType: 'Medium Black Clay Loam',
      kpiSoilSub: 'pH 7.2 Optimal Drainage',
      kpiCropStatus: 'Primary Growth Stage',
      kpiCropStage: 'Berry Softening (Veraison)',
      kpiCropSub: 'Sugar maturity 15.5 Brix',
      plotsTitle: 'Active Farm Parcels & Plot Inventory',
      allPlots: 'All Parcels',
      cropGrapes: '🍇 Grapes',
      cropPom: '🍎 Pomegranate',
      modalTitle: 'Add New Farm Plot Parcel',
    }
  };

  const fpt = fpText[language] || fpText.mr;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <Sprout className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {fpt.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {fpt.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {fpt.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddFieldModal(true)}
          className="flex items-center space-x-2 px-5 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 text-emerald-300" />
          <span>{fpt.addBtn}</span>
        </button>
      </div>

      {/* Farmer & Land Specification Card */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white font-black text-3xl flex items-center justify-center border-2 border-emerald-600 shadow-sm shrink-0">
              {(farmer.name || 'S').charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">{farmer.name}</h2>
              <p className="text-sm font-semibold text-stone-600">
                {farmer.nameMr} • {farmer.village}, {farmer.district}
              </p>
              <span className="inline-flex items-center space-x-1.5 text-xs text-emerald-900 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{fpt.verifiedFarmer}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3.5 py-1.5 bg-amber-100 text-amber-900 font-black text-xs sm:text-sm rounded-xl border border-amber-300">
              {fpt.seasonActive}
            </span>
          </div>
        </div>

        {/* 4 Key Specs Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-stone-50 rounded-2xl border-2 border-stone-200 space-y-1">
            <span className="text-stone-500 font-bold block text-xs">{fpt.kpiArea}</span>
            <span className="font-black text-emerald-800 text-xl sm:text-2xl block">{farmer.totalAcres} {fpt.kpiAreaUnit}</span>
            <span className="text-stone-600 font-medium block text-xs">{fpt.kpiActivePlots}</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border-2 border-stone-200 space-y-1">
            <span className="text-stone-500 font-bold block text-xs">{fpt.kpiIrrigation}</span>
            <span className="font-black text-stone-900 text-base sm:text-lg block">
              {farmer.waterSource || fields[0]?.irrigationType || fpt.kpiIrrigationType}
            </span>
            <span className="text-emerald-700 font-bold block text-xs">{fpt.kpiIrrigationSub}</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border-2 border-stone-200 space-y-1">
            <span className="text-stone-500 font-bold block text-xs">{fpt.kpiSoil}</span>
            <span className="font-black text-stone-900 text-base sm:text-lg block">
              {farmer.soilType || fields[0]?.soilType || fpt.kpiSoilType}
            </span>
            <span className="text-stone-600 font-medium block text-xs">{fpt.kpiSoilSub}</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border-2 border-stone-200 space-y-1">
            <span className="text-stone-500 font-bold block text-xs">{fpt.kpiCropStatus}</span>
            <span className="font-black text-amber-800 text-base sm:text-lg block">
              {fields[0]?.currentStage || fpt.kpiCropStage}
            </span>
            <span className="text-stone-600 font-medium block text-xs">
              {fields[0]?.variety ? `${fields[0].variety}` : fpt.kpiCropSub}
            </span>
          </div>
        </div>
      </div>

      {/* Plot List Section */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <h3 className="text-lg font-black text-stone-900">
            {fpt.plotsTitle} ({filteredFields.length})
          </h3>

          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-bold">
            <button
              onClick={() => setSelectedCropFilter('All')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedCropFilter === 'All' ? 'bg-emerald-800 text-white font-black' : 'text-stone-700'
              }`}
            >
              {fpt.allPlots}
            </button>
            <button
              onClick={() => setSelectedCropFilter('Grapes')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedCropFilter === 'Grapes' ? 'bg-emerald-800 text-white font-black' : 'text-stone-700'
              }`}
            >
              {fpt.cropGrapes}
            </button>
            <button
              onClick={() => setSelectedCropFilter('Pomegranate')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedCropFilter === 'Pomegranate' ? 'bg-emerald-800 text-white font-black' : 'text-stone-700'
              }`}
            >
              {fpt.cropPom}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFields.map((field) => (
            <div
              key={field.id}
              className="p-5 rounded-2xl bg-stone-50 border-2 border-stone-200 space-y-4 hover:border-emerald-400 transition"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <h4 className="font-black text-base text-stone-900">{field.name}</h4>
                  <span className="text-xs text-stone-500 font-semibold">{field.crop} • {field.variety}</span>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-950 font-black text-xs rounded-full border border-emerald-300">
                  {field.acres} {language === 'en' ? 'Acres' : 'एकर'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-500 block">{language === 'en' ? 'Planting Year' : 'लागवड वर्ष:'}</span>
                  <strong className="text-stone-900 font-black">{field.plantingYear}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">{language === 'en' ? 'Irrigation' : 'सिंचन प्रकार:'}</span>
                  <strong className="text-stone-900 font-black">{field.irrigationType}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">{language === 'en' ? 'Current Stage' : 'सध्याचा टप्पा:'}</span>
                  <strong className="text-emerald-800 font-black">{field.currentStage}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">{language === 'en' ? 'Plot Status' : 'प्लॉट स्थिती:'}</span>
                  <strong className="text-stone-900 font-black">{field.status}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Plot Modal */}
      {showAddFieldModal && (
        <Modal
          isOpen={showAddFieldModal}
          onClose={() => setShowAddFieldModal(false)}
          title={fpt.modalTitle}
        >
          <FieldForm
            onSuccess={() => setShowAddFieldModal(false)}
            onCancel={() => setShowAddFieldModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default FarmProfile;
