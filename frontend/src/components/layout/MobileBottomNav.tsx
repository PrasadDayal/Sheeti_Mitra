import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Building2, Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MobileBottomNav: React.FC = () => {
  const { language } = useLanguage();

  const items = [
    { 
      to: '/dashboard', 
      icon: LayoutDashboard, 
      label: language === 'mr' ? 'आजची माहिती' : language === 'hi' ? 'आज की जानकारी' : 'Today Info' 
    },
    { 
      to: '/market', 
      icon: TrendingUp, 
      label: language === 'mr' ? 'आजचा भाव' : language === 'hi' ? 'आज का भाव' : 'Mandi Rates' 
    },
    { 
      to: '/selling-decision', 
      icon: Sparkles, 
      label: language === 'mr' ? 'कुठे विकावे?' : language === 'hi' ? 'कहाँ बेचें?' : 'Where to Sell?', 
      highlight: true 
    },
    { 
      to: '/buyers', 
      icon: Building2, 
      label: language === 'mr' ? 'Buyer शोधा' : language === 'hi' ? 'Buyer खोजें' : 'Find Buyers' 
    },
    { 
      to: '/assistant', 
      icon: Bot, 
      label: language === 'mr' ? 'AI शेतमित्र' : language === 'hi' ? 'AI शेतमित्र' : 'AI Assistant' 
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200 pb-safe">
      <div className="flex items-center justify-around h-16 px-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-bold transition ${
                isActive
                  ? item.highlight
                    ? 'text-amber-800 font-black'
                    : 'text-emerald-800 font-black'
                  : 'text-stone-500 hover:text-stone-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-1.5 rounded-xl relative transition ${
                    item.highlight
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs'
                      : isActive
                      ? 'bg-emerald-100 text-emerald-900'
                      : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.highlight && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                  )}
                </div>
                <span className="mt-0.5 tracking-tight">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
