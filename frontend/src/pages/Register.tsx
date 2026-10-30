import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  User, 
  Layers, 
  Droplets,
  ChevronRight,
  ArrowLeft,
  Check,
  RefreshCw,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { CropType, DistrictMaharashtra, LanguageCode } from '../types';
import { api } from '../services/api';
import { IMAGES } from '../images/images';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { updateFarmerProfile, addField } = useFarmData();
  const { language, setLanguage } = useLanguage();

  // Form State
  const [fullName, setFullName] = useState('');
  const [nameMr, setNameMr] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState<DistrictMaharashtra>('Nashik');
  const [preferredLang, setPreferredLang] = useState<LanguageCode>('mr');
  const [primaryCrop, setPrimaryCrop] = useState<CropType>('Grapes');
  const [farmAcres, setFarmAcres] = useState<number>(3.5);
  const [waterSource, setWaterSource] = useState('Drip System + Farm Pond');
  const [soilType, setSoilType] = useState('Medium Black Loam');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const t = {
    mr: {
      badge: 'महाराष्ट्र शेतकरी महासंघ',
      title: 'नवीन शेतकरी नोंदणी',
      subtitle: 'तुमच्या बागेसाठी आजच अचूक डिजिटल हिशोब व थेट निर्यातदार नेटवर्क सुरू करा',
      step1Title: '१. शेतकरी माहिती (Personal Details)',
      step2Title: '२. शेती व मुख्य पीक तपशील (Farm & Crop Details)',
      nameLabel: 'शेतकऱ्याचे संपूर्ण नाव',
      namePlaceholder: 'उदा. शेतकरी नाव',
      mobileLabel: 'मोबाईल नंबर (Mobile Number)',
      mobilePlaceholder: '१० अंकी मोबाईल नंबर',
      villageLabel: 'गाव / तालुका (Village / Taluka)',
      villagePlaceholder: 'उदा. दिंडोरी, नाशिक',
      districtLabel: 'जिल्हा (District)',
      cropLabel: 'तुमचे मुख्य पीक निवडा (Select Primary Crop):',
      acresLabel: 'एकूण बागेचे क्षेत्र (Farm Area in Acres):',
      acresUnit: 'एकर बाग',
      langLabel: 'प्राधान्याची भाषा (App Language)',
      waterLabel: 'पाण्याचा मुख्य स्रोत (Water Source)',
      waterOptions: ['ठिबक + शेततळे (Drip + Farm Pond)', 'विहीर / बोअरवेल (Well / Borewell)', 'कॅनल पाणी (Canal Irrigation)'],
      soilLabel: 'जमिनीचा प्रकार (Soil Type)',
      soilOptions: ['मध्यम काळी जमीन (Medium Black Loam)', 'लाल मुरुमाड जमीन (Red Murrum Loam)', 'काळी चिकण जमीन (Heavy Clay)'],
      submitBtn: 'नोंदणी पूर्ण करा व डॅशबोर्ड उघडा',
      registering: 'नोंदणी सुरू आहे...',
      alreadyAccount: 'आधीच नोंदणी झाली आहे?',
      loginHere: 'येथे थेट लॉगिन करा',
      securityNote: 'तुमचा डेटा १००% सुरक्षित असून फक्त तुम्हाला व तुमच्या सहमतीने खरेदीदारांना दिसेल.',
    },
    hi: {
      badge: 'महाराष्ट्र किसान नेटवर्क',
      title: 'नया किसान पंजीकरण',
      subtitle: 'अपने खेत के लिए सटीक डिजिटल हिसाब और सत्यापित खरीदार नेटवर्क शुरू करें',
      step1Title: '1. किसान विवरण (Personal Details)',
      step2Title: '2. खेत और मुख्य फसल विवरण (Farm & Crop Details)',
      nameLabel: 'किसान का पूरा नाम',
      namePlaceholder: 'उदा. किसान का नाम',
      mobileLabel: 'मोबाइल नंबर (Mobile Number)',
      mobilePlaceholder: '10 अंकों का मोबाइल नंबर',
      villageLabel: 'गाँव / तहसील (Village / Tehsil)',
      villagePlaceholder: 'उदा. दिंडोरी, नाशिक',
      districtLabel: 'ज़िला (District)',
      cropLabel: 'अपनी मुख्य फसल चुनें (Select Primary Crop):',
      acresLabel: 'कुल खेत का क्षेत्रफल (Farm Area in Acres):',
      acresUnit: 'एकड़ खेत',
      langLabel: 'पसंदीदा भाषा (App Language)',
      waterLabel: 'सिंचाई का मुख्य स्रोत (Water Source)',
      waterOptions: ['ड्रिप + खेत तालाब (Drip + Farm Pond)', 'कुआं / बोरवेल (Well / Borewell)', 'नहर का पानी (Canal)'],
      soilLabel: 'मिट्टी का प्रकार (Soil Type)',
      soilOptions: ['मध्यम काली दोमट (Medium Black Loam)', 'लाल मुरुम मिट्टी (Red Murrum Loam)', 'भारी चिकनी मिट्टी (Heavy Clay)'],
      submitBtn: 'पंजीकरण पूरा करें और डैशबोर्ड खोलें',
      registering: 'पंजीकरण जारी है...',
      alreadyAccount: 'पहले से खाता है?',
      loginHere: 'यहाँ सीधा लॉगिन करें',
      securityNote: 'आपका डेटा 100% सुरक्षित है और केवल आपके नियंत्रण में रहेगा।',
    },
    en: {
      badge: 'Maharashtra Farmers Network',
      title: 'Farmer Registration',
      subtitle: 'Join Maharashtra’s premier Grape & Pomegranate farm intelligence platform',
      step1Title: '1. Personal Details',
      step2Title: '2. Farm & Crop Details',
      nameLabel: 'Full Farmer Name',
      namePlaceholder: 'e.g. Farmer Full Name',
      mobileLabel: 'Mobile Number',
      mobilePlaceholder: '10-digit mobile number',
      villageLabel: 'Village / Taluka',
      villagePlaceholder: 'e.g. Dindori, Nashik',
      districtLabel: 'District',
      cropLabel: 'Select Your Primary Crop:',
      acresLabel: 'Total Farm Area in Acres:',
      acresUnit: 'Acres Farm',
      langLabel: 'Preferred Language',
      waterLabel: 'Irrigation & Water Source',
      waterOptions: ['Drip System + Farm Pond', 'Borewell / Open Well', 'Canal Irrigation'],
      soilLabel: 'Soil Type',
      soilOptions: ['Medium Black Loam', 'Light Red Murrum Loam', 'Heavy Black Clay'],
      submitBtn: 'Complete Registration & Open Dashboard',
      registering: 'Creating Account...',
      alreadyAccount: 'Already have an account?',
      loginHere: 'Log in directly',
      securityNote: 'Your farm data is 100% private and protected by 256-bit encryption.',
    },
  }[language];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) {
      setErrorMessage(language === 'mr' ? 'कृपया तुमचे नाव आणि मोबाईल नंबर टाका.' : language === 'hi' ? 'कृपया अपना नाम और मोबाइल नंबर दर्ज करें।' : 'Please fill in your name and mobile number.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage(language === 'mr' ? 'कृपया खात्यासाठी पासवर्ड तयार करा.' : language === 'hi' ? 'कृपया खाते के लिए पासवर्ड बनाएं।' : 'Please create a password for your account.');
      return;
    }

    if (password.trim().length < 4) {
      setErrorMessage(language === 'mr' ? 'पासवर्ड किमान ४ अक्षरांचा असावा.' : language === 'hi' ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।' : 'Password must be at least 4 characters long.');
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setErrorMessage(language === 'mr' ? 'दोन्ही पासवर्ड जुळत नाहीत.' : language === 'hi' ? 'पासवर्ड मेल नहीं खा रहे हैं।' : 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const newFarmerData = {
      name: fullName.trim(),
      nameMr: nameMr.trim() || fullName.trim(),
      mobile: mobileNumber.startsWith('+91') ? mobileNumber : `+91 ${mobileNumber}`,
      village: village.trim() || 'Nashik',
      district,
      language: preferredLang,
      primaryCrop,
      totalAcres: farmAcres,
      waterSource,
      soilType,
      memberSince: '2026',
      password: password.trim() || undefined,
    };

    try {
      const res = await api.register(newFarmerData);
      if (res && res.farmer) {
        updateFarmerProfile(res.farmer);
        localStorage.setItem('sheetimitra_token', res.token || 'sm_registered_session');
        localStorage.setItem('sheetimitra_farmer_id', res.farmer.id);
      } else {
        updateFarmerProfile(newFarmerData);
      }

      // Add default field automatically for the registered crop
      addField({
        name: `Plot 01 - ${primaryCrop} Orchard`,
        acres: farmAcres,
        crop: primaryCrop,
        variety: primaryCrop === 'Grapes' ? 'Thompson Seedless' : 'Bhagwa (भगवा)',
        plantingYear: 2021,
        irrigationType: waterSource,
        soilType,
        status: 'Active',
        currentStage: primaryCrop === 'Grapes' ? 'Berry Development' : 'Fruit Sizing & Bagging',
      });

      setLanguage(preferredLang);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch {
      setErrorMessage('Registration failed. Please check network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Ambient Blurred Glow Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Container Card */}
      <div className="w-full max-w-4xl rounded-3xl bg-stone-900/85 border border-stone-800 shadow-2xl backdrop-blur-2xl overflow-hidden relative z-10">
        
        {/* Top Header Bar */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-950/80 via-stone-900 to-stone-950 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <Link to="/" className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-stone-950 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl text-white">Sheti<span className="text-emerald-400">Mitra</span> AI</span>
                <span className="text-[10px] uppercase font-bold text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-medium mt-0.5">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Language Switcher */}
            <div className="inline-flex rounded-xl bg-stone-800/80 p-1 text-xs font-semibold border border-stone-700/60">
              {(['mr', 'hi', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setLanguage(lang);
                    setPreferredLang(lang);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    language === lang
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'EN'}
                </button>
              ))}
            </div>

            <Link 
              to="/login"
              className="text-xs font-semibold text-stone-400 hover:text-white px-3 py-1.5 rounded-lg border border-stone-800 hover:border-stone-700 transition-colors"
            >
              लॉगिन (Login)
            </Link>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleRegister} className="p-6 sm:p-10 space-y-8">
          
          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Personal Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-stone-800">
              <User className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.step1Title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t.nameLabel} <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3 bg-stone-800/60 border border-stone-700 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-white text-sm font-medium transition-all"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t.mobileLabel} <span className="text-emerald-400">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <span className="font-bold text-xs pr-2 border-r border-stone-700 text-stone-300">
                      🇮🇳 +91
                    </span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder={t.mobilePlaceholder}
                    className="w-full pl-20 pr-4 py-3 bg-stone-800/60 border border-stone-700 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none font-mono text-sm tracking-wider text-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Village */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t.villageLabel} <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder={t.villagePlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-stone-800/60 border border-stone-700 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-white text-sm transition-all"
                    required
                  />
                </div>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t.districtLabel} <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as DistrictMaharashtra)}
                  className="w-full px-4 py-3 bg-stone-800/80 border border-stone-700 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-white text-sm font-semibold transition-all"
                >
                  <option value="Nashik">Nashik (नाशिक) - द्राक्ष पट्टा</option>
                  <option value="Sangli">Sangli (सांगली) - तासगाव द्राक्ष</option>
                  <option value="Solapur">Solapur (सोलापूर) - सांगोला डाळिंब</option>
                  <option value="Pune">Pune (पुणे) - जुन्नर / बारामती</option>
                  <option value="Ahilyanagar">Ahilyanagar / Ahmednagar (अहिल्यानगर)</option>
                  <option value="Satara">Satara (सातारा)</option>
                  <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar (छ. संभाजीनगर)</option>
                </select>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-1">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {language === 'mr' ? 'खात्याचा पासवर्ड तयार करा' : language === 'hi' ? 'खाते का पासवर्ड बनाएं' : 'Create Account Password'}{' '}
                  <span className="text-emerald-400">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={language === 'mr' ? 'किमान ४ अक्षरे (उदा. Sheti@2026)' : language === 'hi' ? 'कम से कम 4 अक्षर' : 'Min 4 characters'}
                    className="w-full pl-11 pr-11 py-3 bg-stone-800/60 border border-stone-700 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-white text-sm transition-all shadow-inner"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    {language === 'mr' ? 'पासवर्ड पुन्हा टाका (Confirm)' : language === 'hi' ? 'पासवर्ड दोबारा दर्ज करें' : 'Confirm Password'}{' '}
                    <span className="text-emerald-400">*</span>
                  </label>
                  {confirmPassword && password === confirmPassword && (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'पासवर्ड जुळला' : language === 'hi' ? 'पासवर्ड मिल गया' : 'Matched'}</span>
                    </span>
                  )}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={language === 'mr' ? 'तोच पासवर्ड पुन्हा टाका' : language === 'hi' ? 'वही पासवर्ड दोबारा दर्ज करें' : 'Re-enter password'}
                    className={`w-full pl-11 pr-11 py-3 bg-stone-800/60 border rounded-xl focus:ring-2 focus:outline-none text-white text-sm transition-all shadow-inner ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-stone-700 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Farm & Crop Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-stone-800">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.step2Title}
              </h3>
            </div>

            {/* Interactive Visual Crop Cards */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-2.5">
                {t.cropLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Grapes Card */}
                <div
                  onClick={() => setPrimaryCrop('Grapes')}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-4 overflow-hidden group ${
                    primaryCrop === 'Grapes'
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/10'
                      : 'border-stone-800 bg-stone-800/40 hover:border-stone-700'
                  }`}
                >
                  <img
                    src={IMAGES.grapesThompsonLush}
                    alt="Grapes"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-700"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-base">द्राक्ष (Grapes)</h4>
                      {primaryCrop === 'Grapes' && (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Thompson, Sonaka, Sharad & Jumbo
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      Live APMC + Export Buyers
                    </span>
                  </div>
                </div>

                {/* Pomegranate Card */}
                <div
                  onClick={() => setPrimaryCrop('Pomegranate')}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-4 overflow-hidden group ${
                    primaryCrop === 'Pomegranate'
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/10'
                      : 'border-stone-800 bg-stone-800/40 hover:border-stone-700'
                  }`}
                >
                  <img
                    src={IMAGES.pomegranateBhagwaFresh}
                    alt="Pomegranate"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-700"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-base">डाळिंब (Pomegranate)</h4>
                      {primaryCrop === 'Pomegranate' && (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Bhagwa (भगवा), Super Bhagwa, Arakta
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      Solapur & Nashik Mandi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Area Slider + Input */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-800/40 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300">
                  {t.acresLabel}
                </label>
                <div className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-black text-sm">
                  {farmAcres} {t.acresUnit}
                </div>
              </div>

              <input
                type="range"
                min={0.5}
                max={20}
                step={0.5}
                value={farmAcres}
                onChange={(e) => setFarmAcres(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-stone-700 rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                <span>०.५ एकर</span>
                <span>५ एकर</span>
                <span>१० एकर</span>
                <span>२०+ एकर</span>
              </div>
            </div>

            {/* Irrigation & Soil */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t.waterLabel}
                </label>
                <select
                  value={waterSource}
                  onChange={(e) => setWaterSource(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-800/80 border border-stone-700 rounded-xl focus:border-emerald-500 focus:outline-none text-white text-xs font-medium"
                >
                  {t.waterOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {t.soilLabel}
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-800/80 border border-stone-700 rounded-xl focus:border-emerald-500 focus:outline-none text-white text-xs font-medium"
                >
                  {t.soilOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Trust Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start space-x-3 text-xs text-emerald-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t.securityNote}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-stone-950 font-black text-sm rounded-xl shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 group cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                <span>{t.registering}</span>
              </>
            ) : (
              <>
                <span>{t.submitBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-stone-950" />
              </>
            )}
          </button>

          {/* Bottom Link to Login */}
          <div className="pt-4 border-t border-stone-800 text-center text-xs text-stone-400">
            <span>{t.alreadyAccount} </span>
            <Link 
              to="/login" 
              className="font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 ml-1 transition-colors"
            >
              {t.loginHere} →
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
};
