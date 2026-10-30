import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { CropType, DistrictMaharashtra, LanguageCode } from '../types';
import {
  User,
  UserPlus,
  LogIn,
  MapPin,
  Phone,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Bell,
  Lock,
  Save,
  ArrowRight,
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { farmer, updateFarmerProfile } = useFarmData();
  const { language, setLanguage } = useLanguage();

  const [name, setName] = useState(farmer.name);
  const [nameMr, setNameMr] = useState(farmer.nameMr || '');
  const [mobile, setMobile] = useState(farmer.mobile);
  const [village, setVillage] = useState(farmer.village);
  const [district, setDistrict] = useState<DistrictMaharashtra>(farmer.district);
  const [primaryCrop, setPrimaryCrop] = useState<CropType>(farmer.primaryCrop);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (farmer.name) setName(farmer.name);
    if (farmer.nameMr) setNameMr(farmer.nameMr);
    if (farmer.mobile) setMobile(farmer.mobile);
    if (farmer.village) setVillage(farmer.village);
    if (farmer.district) setDistrict(farmer.district);
    if (farmer.primaryCrop) setPrimaryCrop(farmer.primaryCrop);
  }, [farmer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile({
      name,
      nameMr,
      mobile,
      village,
      district,
      primaryCrop,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <User className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {language === 'mr' ? 'शेतकरी खाते' : 'Farmer Account'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {language === 'mr' ? 'शेतकरी प्रोफाइल व खाते तपशील (Profile)' : 'Profile & Farm Settings (माझे खाते)'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            वैयक्तिक माहिती, शेत पत्ता व प्राथमिक पीक पसंती व्यवस्थापित करा.
          </p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white font-black text-xl flex items-center justify-center shadow-sm shrink-0">
          {farmer.name.charAt(0)}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-100 text-emerald-950 rounded-2xl border-2 border-emerald-300 text-sm font-black flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
          <span>माहिती यशस्वीरीत्या जतन केली गेली आहे! (Profile saved successfully!)</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700">
        <h3 className="text-base sm:text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
          वैयक्तिक व संपर्क तपशील (Personal & Contact Details)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-stone-800 mb-1">पूर्ण नाव (इंग्रजी) *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-bold text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">पूर्ण नाव (मराठीत) *</label>
            <input
              type="text"
              value={nameMr}
              onChange={(e) => setNameMr(e.target.value)}
              placeholder="उदा. रामेश्वर पाटील"
              className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-bold text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">मोबाईल नंबर (WhatsApp) *</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-mono font-bold text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">गाव / तालुका *</label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-bold text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              required
            />
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-black text-stone-900 border-t border-stone-100 pt-5 pb-1">
          जिल्हा व पीक पसंती (Regional & Crop Preferences)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-stone-800 mb-1">जिल्हा (District) *</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value as DistrictMaharashtra)}
              className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-bold text-stone-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="Nashik">Nashik (नाशिक)</option>
              <option value="Sangli">Sangli (सांगली)</option>
              <option value="Pune">Pune (पुणे)</option>
              <option value="Solapur">Solapur (सोलापूर)</option>
              <option value="Ahilyanagar">Ahilyanagar (अहिल्यानगर)</option>
              <option value="Satara">Satara (सातारा)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">प्राथमिक मुख्य पीक *</label>
            <select
              value={primaryCrop}
              onChange={(e) => setPrimaryCrop(e.target.value as CropType)}
              className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-2xl font-bold text-stone-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="Grapes">🍇 द्राक्ष (Grapes)</option>
              <option value="Pomegranate">🍎 डाळिंब (Pomegranate)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center space-x-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>माहिती जतन करा (Save Changes)</span>
          </button>
        </div>
      </form>

      {/* Quick Account Navigation Cards: Registration & Login */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/register"
          className="p-5 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl border-2 border-emerald-700 shadow-md hover:scale-[1.01] transition-transform flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
                {language === 'mr' ? 'नवीन शेतकरी नोंदणी' : 'New Registration'}
              </span>
              <h4 className="text-sm font-bold text-white">
                {language === 'mr' ? 'नवीन शेतकरी किंवा बाग जोडा' : 'Register New Farm / Account'}
              </h4>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          to="/login"
          className="p-5 bg-white text-stone-900 rounded-3xl border-2 border-stone-200 shadow-xs hover:border-emerald-300 hover:scale-[1.01] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700">
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                {language === 'mr' ? 'खाते बदला' : 'Switch Account'}
              </span>
              <h4 className="text-sm font-bold text-stone-900">
                {language === 'mr' ? 'दुसऱ्या मोबाईलने लॉगिन करा' : 'Login with Another Number'}
              </h4>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
