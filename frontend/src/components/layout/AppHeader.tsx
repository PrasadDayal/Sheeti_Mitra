import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  X, 
  Sprout, 
  MapPin, 
  TrendingUp, 
  AlertTriangle,
  PhoneCall,
  Sparkles,
  Building2,
  Users2,
  Bot,
  LogOut,
} from 'lucide-react';
import { useFarmData } from '../../context/FarmDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageCode } from '../../types';
import { IMAGES } from '../../images/images';

interface AppHeaderProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  isPublic?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar, sidebarOpen = false, isPublic = false }) => {
  const { farmer, notifications, markAllNotificationsRead, logout } = useFarmData();
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'en', label: 'English', native: 'English' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Sidebar Toggle */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            {!isPublic && onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="p-2 sm:p-2.5 rounded-xl text-stone-800 bg-stone-100 hover:bg-emerald-100 hover:text-emerald-950 border border-stone-300 focus:outline-none cursor-pointer transition shadow-2xs flex items-center justify-center"
                aria-label="Toggle menu"
                title={language === 'mr' ? 'मेनू उघडा / बंद करा' : language === 'hi' ? 'मेनू खोलें / बंद करें' : 'Toggle Menu'}
              >
                <Menu className="w-5 h-5 text-emerald-800 shrink-0" />
              </button>
            )}

            <Link to={isPublic ? '/' : '/dashboard'} className="flex items-center space-x-2.5 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition shrink-0">
                <Sprout className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-emerald-300" />
              </div>
              <div className="whitespace-nowrap">
                <div className="flex items-center space-x-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-stone-900">
                    Sheti<span className="text-emerald-800">Mitra</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-black bg-amber-400 text-stone-950 rounded shadow-2xs">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 hidden md:block leading-none font-bold mt-0.5">
                  {language === 'mr'
                    ? 'शेती अर्थशास्त्र व बाजार भाव'
                    : language === 'hi'
                    ? 'कृषि अर्थशास्त्र व मंडी भाव'
                    : 'Farm Economics & Market Intelligence'}
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Clean & Responsive Navigation Links for Public Platform */}
          {isPublic ? (
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs xl:text-sm font-black text-stone-700 whitespace-nowrap">
              <Link
                to="/market"
                className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-emerald-900 transition flex items-center space-x-1.5 whitespace-nowrap"
              >
                <TrendingUp className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{language === 'mr' ? 'आजचे बाजारभाव' : language === 'hi' ? 'आज के मंडी भाव' : 'Mandi Rates'}</span>
              </Link>
              
              <Link
                to="/buyers"
                className="px-3 py-2 rounded-xl hover:bg-stone-100 hover:text-emerald-900 transition flex items-center space-x-1.5 whitespace-nowrap"
              >
                <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{language === 'mr' ? 'खरेदीदार' : language === 'hi' ? 'खरीदार' : 'Buyers'}</span>
              </Link>
              
              <Link
                to="/assistant"
                className="px-3 py-2 rounded-xl text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition flex items-center space-x-1.5 whitespace-nowrap"
              >
                <Bot className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{language === 'mr' ? 'AI शेतमित्र' : language === 'hi' ? 'AI शेतमित्र' : 'AI Assistant'}</span>
              </Link>
            </nav>
          ) : (
            /* Logged-in farmer summary indicator */
            <div className="hidden xl:flex items-center space-x-2.5 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-950 shadow-2xs whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{farmer.district}</span>
              <span className="text-emerald-300">•</span>
              <span>{farmer.totalAcres} {language === 'mr' ? 'एकर' : language === 'hi' ? 'एकड़' : 'Acres'}</span>
              <span className="text-emerald-300">•</span>
              <span className="text-emerald-900 font-black">
                {farmer.primaryCrop === 'Grapes'
                  ? language === 'mr' ? '🍇 द्राक्ष' : language === 'hi' ? '🍇 अंगूर' : '🍇 Grapes'
                  : '❤️ ' + farmer.primaryCrop}
              </span>
            </div>
          )}

          {/* Right: Actions, Language Switcher, Helpline & Profile */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 whitespace-nowrap shrink-0">
            
            {/* Language Selector Direct 1-Tap Pills */}
            <div className="flex items-center bg-stone-100 p-0.5 sm:p-1 rounded-xl border border-stone-200 whitespace-nowrap">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-black rounded-lg transition cursor-pointer whitespace-nowrap ${
                    language === l.code
                      ? 'bg-emerald-800 text-white shadow-2xs'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
                  }`}
                  title={`Switch to ${l.label}`}
                >
                  {l.native}
                </button>
              ))}
            </div>

            {/* Helpline quick link (visible on xl screens) */}
            <a
              href="tel:18001234567"
              className="hidden 2xl:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 rounded-xl text-xs font-black transition whitespace-nowrap"
              title={language === 'mr' ? 'शेतकरी मदत हेल्पलाइन' : language === 'hi' ? 'किसान सहायता हेल्पलाइन' : 'Farmer Support Helpline'}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{language === 'mr' ? 'शेतकरी मदत' : language === 'hi' ? 'किसान सहायता' : 'Helpline'}</span>
            </a>

            {/* Notifications Dropdown for Logged-in */}
            {!isPublic && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 transition cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-stone-800" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-stone-200 rounded-2xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-sm text-stone-900">
                          {language === 'mr' ? 'शेतकरी सूचना' : language === 'hi' ? 'किसान सूचनाएं' : 'Farmer Alerts'}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                          {language === 'mr' ? 'दैनिक अपडेट' : language === 'hi' ? 'दैनिक अपडेट' : 'Daily Feed'}
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllNotificationsRead}
                          className="text-xs text-emerald-800 hover:underline font-bold cursor-pointer"
                        >
                          {language === 'mr' ? 'सर्व वाचल्याचे चिन्हांकित करा' : language === 'hi' ? 'सभी पढ़ा हुआ मार्क करें' : 'Mark all read'}
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                      {notifications.slice(0, 4).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            setShowNotifications(false);
                            if (notif.actionableRoute) navigate(notif.actionableRoute);
                          }}
                          className={`p-3 text-xs hover:bg-stone-50 cursor-pointer transition ${
                            !notif.read ? 'bg-amber-50/60' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-2.5">
                            {notif.priority === 'high' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className="font-black text-stone-900 leading-snug">
                                {language === 'mr' && notif.titleMr ? notif.titleMr : notif.title}
                              </p>
                              <p className="text-stone-600 mt-0.5 line-clamp-2 font-medium">
                                {language === 'mr' && notif.messageMr ? notif.messageMr : notif.message}
                              </p>
                              <span className="text-[10px] text-stone-400 mt-1 block">{notif.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-3 pt-2 border-t border-stone-100 text-center">
                      <Link
                        to="/notifications"
                        onClick={() => setShowNotifications(false)}
                        className="text-xs text-emerald-800 hover:text-emerald-900 font-black block py-1"
                      >
                        {language === 'mr'
                          ? 'सर्व सूचना आणि सल्ले पहा →'
                          : language === 'hi'
                          ? 'सभी सूचनाएं और सलाह देखें →'
                          : 'View all advisories & alerts →'}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Avatar / CTA */}
            {isPublic ? (
              <div className="flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap">
                <Link
                  to="/login"
                  className="px-2.5 sm:px-3 py-1.5 text-xs font-black text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-xl transition whitespace-nowrap"
                >
                  {language === 'mr' ? 'लॉगिन (Login)' : language === 'hi' ? 'लॉगिन (Login)' : 'Log in'}
                </Link>
                <Link
                  to="/register"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-black text-white bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 rounded-xl shadow-xs transition whitespace-nowrap flex items-center space-x-1.5"
                >
                  <Sprout className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span>
                    {language === 'mr' ? 'नोंदणी करा (Register)' : language === 'hi' ? 'पंजीकरण (Register)' : 'Register Free'}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/register"
                  className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-black text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition whitespace-nowrap"
                  title="नवीन शेतकरी नोंदणी (Register New Farmer / Plot)"
                >
                  <Sprout className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{language === 'mr' ? '+ नवीन नोंदणी' : language === 'hi' ? '+ नया पंजीकरण' : '+ Register'}</span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center space-x-2 p-1 hover:bg-stone-100 rounded-xl border border-stone-200 transition group whitespace-nowrap"
                  title="प्रोफाइल व खाते (Profile & Account)"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-800 text-white font-black text-xs flex items-center justify-center border border-emerald-600 shrink-0">
                    {(farmer.name || 'S').charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-black text-stone-900 group-hover:text-emerald-800 transition">
                    {farmer.name.split(' ')[0]}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="p-1.5 sm:p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 border border-stone-200 transition flex items-center justify-center cursor-pointer"
                  title={language === 'mr' ? 'लॉगआउट करा (Logout)' : language === 'hi' ? 'लॉगआउट करें (Logout)' : 'Logout'}
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger for Public */}
            {isPublic && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-stone-700 hover:text-stone-950 bg-stone-100 rounded-xl border border-stone-300 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu for Public */}
      {isPublic && mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            to="/market"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2.5 py-2.5 text-sm font-black text-stone-800 border-b border-stone-100"
          >
            <span>📊</span>
            <span>{language === 'mr' ? 'आजचे बाजार भाव' : language === 'hi' ? 'आज के मंडी भाव' : 'Live Market Prices'}</span>
          </Link>
          <Link
            to="/selling-decision"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2.5 py-2.5 text-sm font-black text-amber-950 bg-amber-50 px-3 rounded-xl border border-amber-200"
          >
            <span>⭐</span>
            <span>{language === 'mr' ? 'कुठे विकल्यावर जास्त मिळेल?' : language === 'hi' ? 'कहाँ बेचने पर ज्यादा मिलेगा?' : 'Where to Sell?'}</span>
          </Link>
          <Link
            to="/buyers"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2.5 py-2.5 text-sm font-black text-stone-800 border-b border-stone-100"
          >
            <span>🤝</span>
            <span>{language === 'mr' ? 'थेट खरेदीदार व व्यापारी' : language === 'hi' ? 'सीधे खरीदार व व्यापारी' : 'Direct Buyers & Traders'}</span>
          </Link>
          <Link
            to="/inputs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2.5 py-2.5 text-sm font-black text-stone-800 border-b border-stone-100"
          >
            <span>🌾</span>
            <span>{language === 'mr' ? 'खते व औषधे भाव' : language === 'hi' ? 'खाद व दवाइयां भाव' : 'Inputs & Fertilizers'}</span>
          </Link>
          <Link
            to="/assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2.5 py-2.5 text-sm font-black text-emerald-950 bg-emerald-50 px-3 rounded-xl border border-emerald-200"
          >
            <span>🤖</span>
            <span>{language === 'mr' ? 'AI शेतमित्र सल्ला' : language === 'hi' ? 'AI कृषि मित्र सलाह' : 'AI Farmer Assistant'}</span>
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-black text-stone-800 bg-stone-100 rounded-xl"
            >
              {language === 'mr' ? 'लॉगिन करा (Login)' : language === 'hi' ? 'लॉगिन करें (Login)' : 'Log in to Account'}
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-black text-white bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 rounded-xl shadow-xs flex items-center justify-center space-x-1.5"
            >
              <Sprout className="w-4 h-4 text-emerald-300" />
              <span>
                {language === 'mr' ? 'नवीन शेतकरी नोंदणी (Register)' : language === 'hi' ? 'नया किसान पंजीकरण (Register)' : 'New Farmer Registration'}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
