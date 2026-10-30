import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  CalendarCheck2,
  ReceiptIndianRupee,
  Users2,
  Store,
  TrendingUp,
  Building2,
  Sparkles,
  PieChart,
  Bot,
  Bell,
  User,
  UserPlus,
  LogIn,
  LogOut,
  Settings,
  X,
  PhoneCall,
  Wrench,
} from 'lucide-react';
import { useFarmData } from '../../context/FarmDataContext';
import { useLanguage } from '../../context/LanguageContext';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  highlight?: boolean;
  badge?: string;
  count?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { farmer, notifications, logout } = useFarmData();
  const { t, language } = useLanguage();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Categorized Navigation Menu
  const navSections: NavSection[] = [
    {
      title: language === 'mr' ? 'मुख्य' : language === 'hi' ? 'मुख्य' : 'MAIN',
      items: [
        { to: '/dashboard', icon: LayoutDashboard, label: language === 'mr' ? 'आजची माहिती' : language === 'hi' ? 'आज की जानकारी' : 'Dashboard' },
        { to: '/farm', icon: Sprout, label: language === 'mr' ? 'माझी शेती' : language === 'hi' ? 'मेरा खेत' : 'My Farm' },
        { to: '/crop-activities', icon: CalendarCheck2, label: language === 'mr' ? 'पीक व शेतीकामे' : language === 'hi' ? 'फसल व कृषि कार्य' : 'Crop & Activities' },
      ]
    },
    {
      title: language === 'mr' ? 'शेती व्यवस्थापन' : language === 'hi' ? 'खेत प्रबंधन' : 'FARM MANAGEMENT',
      items: [
        { to: '/expenses', icon: ReceiptIndianRupee, label: language === 'mr' ? 'खर्च नोंद' : language === 'hi' ? 'लागत दर्ज करें' : 'Expenses & Production' },
        { to: '/harvest', icon: Sparkles, label: language === 'mr' ? 'तोडणी व उत्पन्न' : language === 'hi' ? 'तुड़ाई व आवक' : 'Harvest & Yield' },
        { to: '/inputs', icon: Store, label: language === 'mr' ? 'खते व औषधे' : language === 'hi' ? 'खाद व दवाइयां' : 'Inputs & Fertilizers' },
        { to: '/equipment', icon: Wrench, label: language === 'mr' ? 'शेती अवजारे व यंत्रे' : language === 'hi' ? 'कृषि उपकरण व मशीनरी' : 'Equipment Store' },
      ]
    },
    {
      title: language === 'mr' ? 'बाजार व विक्री' : language === 'hi' ? 'मंडी व बिक्री' : 'MARKET & SELLING',
      items: [
        { to: '/market', icon: TrendingUp, label: language === 'mr' ? 'आजचे बाजारभाव' : language === 'hi' ? 'आज के मंडी भाव' : 'Market Prices' },
        { to: '/buyers', icon: Building2, label: language === 'mr' ? 'जवळचे खरेदीदार' : language === 'hi' ? 'पास के खरीदार' : 'Buyers' },
        { 
          to: '/selling-decision', 
          icon: Sparkles, 
          label: language === 'mr' ? '⭐ कुठे विकल्यावर जास्त मिळेल?' : language === 'hi' ? '⭐ कहाँ बेचने पर ज्यादा मिलेगा?' : '⭐ Smart Selling Decision',
          highlight: true,
          badge: language === 'mr' ? 'प्रमुख' : language === 'hi' ? 'प्रमुख' : 'Flagship'
        },
      ]
    },
    {
      title: language === 'mr' ? 'नफा विश्लेषण' : language === 'hi' ? 'मुनाफा विश्लेषण' : 'PROFIT',
      items: [
        { to: '/profit', icon: PieChart, label: language === 'mr' ? 'खरा नफा' : language === 'hi' ? 'असली मुनाफा' : 'Profit Analysis' },
      ]
    },
    {
      title: language === 'mr' ? 'साधने' : language === 'hi' ? 'उपकरण' : 'TOOLS',
      items: [
        { 
          to: '/assistant', 
          icon: Bot, 
          label: language === 'mr' ? 'AI शेतमित्र' : language === 'hi' ? 'AI कृषि मित्र' : 'AI Assistant',
          badge: 'AI'
        },
        { 
          to: '/notifications', 
          icon: Bell, 
          label: language === 'mr' ? 'महत्त्वाच्या सूचना' : language === 'hi' ? 'महत्वपूर्ण सूचनाएं' : 'Alerts',
          count: unreadCount > 0 ? unreadCount : undefined
        },
      ]
    },
    {
      title: language === 'mr' ? 'खाते व नोंदणी' : language === 'hi' ? 'खाता व पंजीकरण' : 'ACCOUNT & ACCESS',
      items: [
        { to: '/profile', icon: User, label: language === 'mr' ? 'शेतकरी प्रोफाइल' : language === 'hi' ? 'किसान प्रोफाइल' : 'Profile' },
        { 
          to: '/register', 
          icon: UserPlus, 
          label: language === 'mr' ? 'नवीन शेतकरी नोंदणी' : language === 'hi' ? 'नया किसान पंजीकरण' : 'Register New Farmer',
          highlight: true,
          badge: language === 'mr' ? 'नोंदणी' : language === 'hi' ? 'पंजीकरण' : 'Join'
        },
        { to: '/login', icon: LogIn, label: language === 'mr' ? 'खाते बदला / लॉगिन' : language === 'hi' ? 'खाता बदलें / लॉगिन' : 'Switch Account / Login' },
        { to: '/settings', icon: Settings, label: language === 'mr' ? 'सेटिंग्ज' : language === 'hi' ? 'सेटिंग्स' : 'Settings' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r-2 border-stone-200 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b-2 border-emerald-950 bg-emerald-900 text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center text-emerald-300 shadow-xs">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base tracking-tight block">
                {language === 'mr' ? 'शेतीमित्र AI' : language === 'hi' ? 'शेतीमित्र AI' : 'ShetiMitra AI'}
              </span>
              <p className="text-[11px] text-emerald-300 font-semibold">
                {language === 'mr' ? 'शेतीमित्र महाराष्ट्र' : language === 'hi' ? 'शेतीमित्र भारत' : 'ShetiMitra Platform'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-xl transition cursor-pointer flex items-center justify-center"
            title={language === 'mr' ? 'मेनू बंद करा' : language === 'hi' ? 'मेनू बंद करें' : 'Close Menu'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Farmer summary capsule */}
        <div className="p-3.5 bg-stone-50 border-b border-stone-200 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-black text-stone-900 truncate max-w-[140px]">{farmer.name}</p>
              <p className="text-stone-500 text-[11px] font-medium">{farmer.village}, {farmer.district}</p>
            </div>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-[11px] font-black rounded-full border border-emerald-300">
              {farmer.primaryCrop === 'Grapes'
                ? language === 'mr' ? 'द्राक्ष' : language === 'hi' ? 'अंगूर' : 'Grapes'
                : farmer.primaryCrop}
            </span>
          </div>
        </div>

        {/* Categorized Navigation Menu */}
        <div className="flex-1 px-3 py-3 overflow-y-auto space-y-4">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-stone-400">
                {section.title}
              </div>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? item.highlight
                          ? 'bg-amber-400 text-stone-950 font-black shadow-sm ring-1 ring-amber-300'
                          : 'bg-emerald-800 text-white font-black shadow-sm'
                        : item.highlight
                        ? 'text-amber-950 bg-amber-50 hover:bg-amber-100 font-black border border-amber-200'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <item.icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive
                              ? item.highlight ? 'text-stone-950' : 'text-emerald-300'
                              : item.highlight ? 'text-amber-700' : 'text-stone-500'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-1 shrink-0 ml-1">
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider ${
                              isActive
                                ? 'bg-stone-950/20 text-stone-950'
                                : item.highlight
                                ? 'bg-amber-200 text-amber-950'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.count && (
                          <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                            {item.count}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}

          {/* Logout Action */}
          <div className="pt-2 px-1">
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
                navigate('/login');
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{language === 'mr' ? 'खाते लॉगआउट करा' : language === 'hi' ? 'खाता लॉगआउट करें' : 'Log Out'}</span>
            </button>
          </div>

          {/* Quick Helpline banner at end of menu */}
          <div className="pt-3 pb-1 px-1">
            <a
              href="tel:18001234567"
              className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 transition group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-200 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-black leading-tight">
                    {language === 'mr' ? 'शेतकरी हेल्पलाइन' : language === 'hi' ? 'किसान हेल्पलाइन' : 'Farmer Helpline'}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold">1800 123 4567</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
