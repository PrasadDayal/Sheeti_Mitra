
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sprout,
  ArrowRight,
  Phone,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  Globe2,
  RefreshCw,
  Lock,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  X,
  Check
} from 'lucide-react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { IMAGES } from '../images/images';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { updateFarmerProfile } = useFarmData();
  const { language, setLanguage } = useLanguage();

  const [mobileNumber, setMobileNumber] = useState('');
  const [loginMode, setLoginMode] = useState<'otp' | 'password'>('otp');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  // Forgot Password State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [forgotMobile, setForgotMobile] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotShowPassword, setForgotShowPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const handleSendForgotOtp = async () => {
    if (!forgotMobile.trim()) {
      setForgotError(language === 'mr' ? 'कृपया मोबाईल नंबर टाका.' : language === 'hi' ? 'कृपया मोबाइल नंबर दर्ज करें।' : 'Please enter your mobile number.');
      return;
    }
    setForgotLoading(true);
    setForgotError('');
    try {
      const res = await api.forgotPassword(forgotMobile.trim());
      if (res && res.success) {
        setForgotStep(2);
        setForgotOtp('');
      } else {
        setForgotError(res?.message || 'OTP request failed.');
      }
    } catch (err: unknown) {
      setForgotError(err instanceof Error ? err.message : 'Mobile number not found.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!forgotOtp.trim()) {
      setForgotError(language === 'mr' ? 'कृपया ४-अंकी OTP टाका.' : language === 'hi' ? 'कृपया 4-अंकीय OTP दर्ज करें।' : 'Please enter 4-digit OTP.');
      return;
    }
    if (!forgotNewPassword.trim() || forgotNewPassword.trim().length < 4) {
      setForgotError(language === 'mr' ? 'नवीन पासवर्ड किमान ४ अक्षरांचा असावा.' : language === 'hi' ? 'नया पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।' : 'New password must be at least 4 characters long.');
      return;
    }
    if (forgotNewPassword.trim() !== forgotConfirmPassword.trim()) {
      setForgotError(language === 'mr' ? 'दोन्ही पासवर्ड जुळत नाहीत.' : language === 'hi' ? 'पासवर्ड मेल नहीं खा रहे हैं।' : 'Passwords do not match.');
      return;
    }

    setForgotLoading(true);
    setForgotError('');
    try {
      const res = await api.forgotPassword(forgotMobile.trim(), forgotOtp.trim(), forgotNewPassword.trim());
      if (res && res.success && res.farmer) {
        updateFarmerProfile(res.farmer);
        if (res.token) {
          localStorage.setItem('sheetimitra_token', res.token);
          localStorage.setItem('sheetimitra_farmer_id', res.farmer.id);
        }
        setShowForgotPassword(false);
        navigate('/dashboard');
      } else {
        setForgotError(res?.message || 'Password reset failed.');
      }
    } catch (err: unknown) {
      setForgotError(err instanceof Error ? err.message : 'Password reset failed.');
    } finally {
      setForgotLoading(false);
    }
  };

  const t = {
    mr: {
      badge: 'महाराष्ट्र शेतकरी महासंघ',
      title: 'शेतीमित्र मध्ये लॉगिन करा',
      subtitle: 'तुमच्या शेतीचा अचूक हishोब, आजचे बाजार भाव व थेट निर्यातदार खरेदीदार',
      tabOtp: '📱 OTP द्वारे लॉगिन',
      tabPassword: '🔑 पासवर्ड द्वारे लॉगिन',
      mobileLabel: 'नोंदणीकृत मोबाईल नंबर',
      mobilePlaceholder: '१० अंकी मोबाईल नंबर टाका',
      passwordLabel: 'खात्याचा पासवर्ड (Password)',
      passwordPlaceholder: 'तुमचा पासवर्ड टाका',
      sendOtp: 'ओटीपी पाठवा (Send OTP)',
      otpLabel: '४-अंकी सुरक्षित OTP टाका',
      resendIn: 'पुन्हा OTP पाठवा',
      resendBtn: 'पुन्हा पाठवा (Resend)',
      submitBtn: 'सुरक्षित लॉगिन करा',
      submitPasswordBtn: 'पासवर्डने लॉगिन करा',
      authenticating: 'तपासणी सुरू आहे...',
      newFarmer: 'अजून खाते नाही?',
      registerNow: 'येथे नवीन शेतकरी नोंदणी करा',
      statsRate: 'आजचा सरासरी भाव: ₹१०२/किलो',
      statsExporter: 'थेट शेतातून उचल: ₹१०६/किलो',
      statFarms: '४,२००+ नोंदणीकृत बागायतदार',
    },
    hi: {
      badge: 'महाराष्ट्र किसान नेटवर्क',
      title: 'शेतीमित्र में लॉगिन करें',
      subtitle: 'अपनी खेती की सही लागत, आज के मंडी भाव व सत्यापित निर्यातक खरीदार',
      tabOtp: '📱 OTP द्वारा लॉगिन',
      tabPassword: '🔑 पासवर्ड द्वारा लॉगिन',
      mobileLabel: 'पंजीकृत मोबाइल नंबर',
      mobilePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
      passwordLabel: 'खाते का पासवर्ड (Password)',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      sendOtp: 'ओटीपी भेजें (Send OTP)',
      otpLabel: '4-अंकीय सुरक्षित OTP दर्ज करें',
      resendIn: 'दोबारा OTP भेजें',
      resendBtn: 'दोबारा भेजें (Resend)',
      submitBtn: 'सुरक्षित लॉगिन करें',
      submitPasswordBtn: 'पासवर्ड से लॉगिन करें',
      authenticating: 'सत्यापन जारी है...',
      newFarmer: 'नया खाता बनाना है?',
      registerNow: 'यहाँ नया किसान पंजीकरण करें',
      statsRate: 'आज का मॉडल भाव: ₹102/किग्रा',
      statsExporter: 'खेत से सीधी खरीद: ₹106/किग्रा',
      statFarms: '4,200+ पंजीकृत किसान',
    },
    en: {
      badge: 'Maharashtra Farmers Network',
      title: 'Welcome Back to ShetiMitra',
      subtitle: 'Real-time production economics, live APMC rates, and direct verified buyers',
      tabOtp: '📱 OTP Login',
      tabPassword: '🔑 Password Login',
      mobileLabel: 'Registered Mobile Number',
      mobilePlaceholder: 'Enter 10-digit mobile number',
      passwordLabel: 'Account Password',
      passwordPlaceholder: 'Enter your account password',
      sendOtp: 'Send OTP',
      otpLabel: 'Enter 4-Digit Secure OTP',
      resendIn: 'Resend OTP in',
      resendBtn: 'Resend OTP',
      submitBtn: 'Secure Login to Dashboard',
      submitPasswordBtn: 'Login with Password',
      authenticating: 'Authenticating...',
      newFarmer: 'New to ShetiMitra?',
      registerNow: 'Register your farm for free',
      statsRate: 'Pimpalgaon APMC: ₹102/kg',
      statsExporter: 'Direct Farm Pickup: ₹106/kg',
      statFarms: '4,200+ Verified Farmers',
    },
  }[language];

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input box
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const performLogin = async (mobile: string, otpCode: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await api.login(mobile, otpCode);
      if (res && res.farmer) {
        updateFarmerProfile(res.farmer);
        localStorage.setItem('sheetimitra_token', res.token || 'sm_demo_session');
        localStorage.setItem('sheetimitra_farmer_id', res.farmer.id);
      } else {
        updateFarmerProfile({
          mobile,
          name: 'Farmer',
          nameMr: 'शेतकरी',
        });
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err: unknown) {
      const msg = (err as Error)?.message || 'Login failed. Please check credentials and try again.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const performPasswordLogin = async (mobile: string, pass: string) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await api.loginWithPassword(mobile, pass);
      if (res && res.farmer) {
        updateFarmerProfile(res.farmer);
        localStorage.setItem('sheetimitra_token', res.token || 'sm_pass_session');
        localStorage.setItem('sheetimitra_farmer_id', res.farmer.id);
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        setErrorMessage('लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
      }
    } catch (err: unknown) {
      const msg = (err as Error)?.message || 'Login failed. Please check credentials and try again.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (loginMode === 'password') {
      if (!password) {
        setErrorMessage('कृपया तुमचा पासवर्ड टाका. (Please enter your password.)');
        return;
      }
      performPasswordLogin(mobileNumber, password);
      return;
    }

    // OTP mode
    if (!otpSent) {
      setOtpSent(true);
      return;
    }

    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      setErrorMessage('Please enter all 4 digits of the OTP.');
      return;
    }
    performLogin(mobileNumber, fullOtp);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-[40%] right-[30%] w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Container Card */}
      <div className="w-full max-w-5xl rounded-3xl bg-stone-900/80 border border-stone-800 shadow-2xl backdrop-blur-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">

        {/* Left Column: Visual Showcase & Farm Intelligence Highlights */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 border-r border-stone-800/80 overflow-hidden">
          {/* Subtle Background Photo with Deep Gradient Mask */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none transform scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url(${IMAGES.heroFarmerVineyardSun})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-emerald-950/70 to-transparent pointer-events-none" />

          {/* Top Header & Branding */}
          <div className="relative z-10 space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-stone-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight text-white block">
                  Sheti<span className="text-emerald-400">Mitra</span> AI
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">
                  {t.badge}
                </span>
              </div>
            </Link>

            <div className="pt-6">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>द्राक्ष व डाळिंब विशेष तंत्रज्ञान</span>
              </span>
              <h2 className="text-2xl font-black text-white mt-3 leading-snug">
                नफ्याची शेती, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-amber-300">
                  माहिती व तंत्रज्ञानाची साथ!
                </span>
              </h2>
            </div>
          </div>

          {/* Middle: Floating Interactive Stat Cards */}
          <div className="relative z-10 space-y-3 my-6">
            <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-emerald-500/20 backdrop-blur-md shadow-lg flex items-center space-x-3.5 animate-float-slow">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="text-stone-400 font-medium">लाइव्ह पिंपळगाव बाजार भाव</p>
                <p className="font-bold text-white text-sm">
                  ₹१०२/किलो <span className="text-emerald-400 text-xs font-semibold">(+४.२% वाढ)</span>
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-amber-500/20 backdrop-blur-md shadow-lg flex items-center space-x-3.5 animate-float-slow" style={{ animationDelay: '1.5s' }}>
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="text-stone-400 font-medium">थेट निर्यातदार खरेदीदार</p>
                <p className="font-bold text-white text-sm">
                  ₹१०६/किलो <span className="text-amber-400 text-xs font-semibold">(मोफत शेतातून उचल)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Trust Quote */}
          <div className="relative z-10 pt-4 border-t border-stone-800/80">
            <p className="text-xs text-stone-300 italic leading-relaxed">
              &quot;शेतीमित्रमुळे आम्हाला द्राक्षाचा खरा उत्पादन खर्च (₹६९.५०) कळाला आणि व्यापाऱ्याशी बोलताना थेट ₹१०६ भाव मिळवता आला.&quot;
            </p>
            <div className="flex items-center space-x-2 mt-3">
              <img
                src={IMAGES.farmerVitthal}
                alt="Vitthal Shinde"
                className="w-7 h-7 rounded-full border border-emerald-400/50 object-cover"
              />
              <span className="text-[11px] font-bold text-stone-200">
                विठ्ठल शिंदे • द्राक्ष बागायतदार, दिंडोरी (नाशिक)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">

          {/* Top Bar: Language Switcher & Back Link */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 text-xs text-stone-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>मुख्य पान (Home)</span>
            </Link>

            {/* Language Pill Switcher */}
            <div className="inline-flex rounded-xl bg-stone-800/80 p-1 text-xs font-semibold border border-stone-700/60">
              {(['mr', 'hi', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${language === lang
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                    }`}
                >
                  {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'EN'}
                </button>
              ))}
            </div>
          </div>

          {/* Login Type Tabs (OTP vs Password) */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-950/60 rounded-2xl border border-stone-800 mb-6">
            <button
              type="button"
              onClick={() => {
                setLoginMode('otp');
                setErrorMessage('');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${loginMode === 'otp'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.tabOtp}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode('password');
                setErrorMessage('');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${loginMode === 'password'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>{t.tabPassword}</span>
            </button>
          </div>

          {/* Form Header */}
          <div className="pb-6 space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              {loginMode === 'otp' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>OTP द्वारे सुरक्षित शेतकरी प्रवेश</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>पासवर्डद्वारे थेट शेतकरी प्रवेश</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Mobile Number Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                {t.mobileLabel} <span className="text-emerald-400">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-emerald-400 transition-colors">
                  <span className="font-bold text-xs pr-2 border-r border-stone-700 text-stone-300">
                    🇮🇳 +91
                  </span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setMobileNumber(val);
                  }}
                  placeholder={t.mobilePlaceholder}
                  className="w-full pl-20 pr-4 py-3 bg-stone-800/60 border border-stone-700 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none font-mono text-sm tracking-wider text-white placeholder-stone-500 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* PASSWORD MODE: Password Input Field */}
            {loginMode === 'password' && (
              <div className="space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-stone-300">
                    {t.passwordLabel} <span className="text-emerald-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotMobile(mobileNumber);
                      setShowForgotPassword(true);
                      setForgotError('');
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {language === 'mr' ? 'पासवर्ड विसरलात?' : language === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-emerald-400 transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full pl-11 pr-11 py-3 bg-stone-800/60 border border-stone-700 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-sm text-white placeholder-stone-500 transition-all shadow-inner"
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
            )}

            {/* OTP MODE: OTP Input Boxes */}
            {loginMode === 'otp' && otpSent && (
              <div className="space-y-2 pt-1 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-stone-300">
                    {t.otpLabel} <span className="text-emerald-400">*</span>
                  </label>
                </div>

                <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-xs mx-auto">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-full h-13 sm:h-14 text-center font-mono text-xl font-black bg-stone-800/80 border-2 border-stone-700 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:outline-none text-white transition-all shadow-sm"
                      required
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                  <span className="flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>256-Bit Encrypted OTP</span>
                  </span>
                  <span>
                    {resendTimer > 0 ? (
                      <span className="text-stone-500">
                        {t.resendIn} {resendTimer}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setResendTimer(30)}
                        className="text-emerald-400 font-bold hover:underline"
                      >
                        {t.resendBtn}
                      </button>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Action Button with Glowing Shimmer */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-stone-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center space-x-2 group cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                  <span>{t.authenticating}</span>
                </>
              ) : (
                <>
                  <span>{loginMode === 'password' ? t.submitPasswordBtn : (!otpSent ? t.sendOtp : t.submitBtn)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-stone-950" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switch to Register Link */}
          <div className="pt-6 border-t border-stone-800/80 text-center text-xs text-stone-400">
            <span>{t.newFarmer} </span>
            <Link
              to="/register"
              className="font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 ml-1 transition-colors"
            >
              {t.registerNow} →
            </Link>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-stone-100 relative">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setForgotStep(1);
                setForgotError('');
              }}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {language === 'mr' ? 'पासवर्ड रीसेट करा' : language === 'hi' ? 'पासवर्ड रीसेट करें' : 'Reset Password'}
                </h3>
                <p className="text-xs text-stone-400">
                  {forgotStep === 1
                    ? (language === 'mr' ? 'नोंदणीकृत मोबाईल नंबरवर OTP मिळवा' : language === 'hi' ? 'पंजीकृत मोबाइल नंबर पर OTP प्राप्त करें' : 'Verify mobile with OTP')
                    : (language === 'mr' ? 'OTP टाका आणि नवीन पासवर्ड तयार करा' : language === 'hi' ? 'OTP दर्ज करें और नया पासवर्ड बनाएं' : 'Enter OTP & set new password')}
                </p>
              </div>
            </div>

            {forgotError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotStep === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {language === 'mr' ? 'नोंदणीकृत मोबाईल नंबर' : language === 'hi' ? 'पंजीकृत मोबाइल नंबर' : 'Registered Mobile Number'}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-stone-400 pointer-events-none">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={forgotMobile}
                      onChange={(e) => setForgotMobile(e.target.value.replace(/\D/g, ''))}
                      placeholder="१० अंकी मोबाईल नंबर"
                      className="w-full pl-20 pr-4 py-3 bg-stone-800/80 border border-stone-700 rounded-xl text-white text-sm font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={forgotLoading}
                  onClick={handleSendForgotOtp}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-sm transition shadow-md cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {forgotLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{language === 'mr' ? 'OTP पाठवा (Send OTP)' : language === 'hi' ? 'OTP भेजें' : 'Send Verification OTP'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-stone-300">
                      {language === 'mr' ? '४-अंकी OTP टाका' : language === 'hi' ? '4-अंकीय OTP दर्ज करें' : 'Enter 4-Digit OTP'}
                    </label>
                  </div>
                  <input
                    type="text"
                    maxLength={4}
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••"
                    className="w-full px-4 py-3 bg-stone-800/80 border border-stone-700 rounded-xl text-white text-center font-mono text-lg font-black tracking-widest focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {language === 'mr' ? 'नवीन पासवर्ड तयार करा' : language === 'hi' ? 'नया पासवर्ड बनाएं' : 'New Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={forgotShowPassword ? 'text' : 'password'}
                      value={forgotNewPassword}
                      onChange={(e) => setForgotNewPassword(e.target.value)}
                      placeholder="किमान ४ अक्षरांचा पासवर्ड"
                      className="w-full pl-4 pr-11 py-3 bg-stone-800/80 border border-stone-700 rounded-xl text-white text-sm focus:border-emerald-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setForgotShowPassword(!forgotShowPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white cursor-pointer"
                    >
                      {forgotShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {language === 'mr' ? 'नवीन पासवर्ड पुन्हा टाका' : language === 'hi' ? 'नया पासवर्ड दोबारा दर्ज करें' : 'Confirm New Password'}
                  </label>
                  <input
                    type="password"
                    value={forgotConfirmPassword}
                    onChange={(e) => setForgotConfirmPassword(e.target.value)}
                    placeholder="तोच पासवर्ड पुन्हा टाका"
                    className="w-full px-4 py-3 bg-stone-800/80 border border-stone-700 rounded-xl text-white text-sm focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  disabled={forgotLoading}
                  onClick={handleResetPassword}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm transition shadow-md cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {forgotLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{language === 'mr' ? 'पासवर्ड बदला व डॅशबोर्ड उघडा' : language === 'hi' ? 'पासवर्ड बदलें और लॉगिन करें' : 'Reset Password & Login'}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
