import React from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Bell,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  ReceiptIndianRupee,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useFarmData();
  const { language } = useLanguage();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-amber-100 text-amber-900">
              <Bell className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
              {language === 'mr' ? 'शेतकरी सूचना व अलर्ट्स' : 'Farmer Alert Feed'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {language === 'mr' ? 'महत्त्वाच्या शेती सूचना (Notifications)' : 'Farmer Notifications (महत्त्वाच्या सूचना)'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            बाजार भाव वाढ, नवीन खरेदीदार कोटेशन्स, फवारणी सावधगिरी व बजेट अलर्ट्स.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-xs sm:text-sm rounded-xl transition self-start sm:self-auto cursor-pointer"
          >
            सर्व वाचल्या म्हणून नोंदवा
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className={`p-5 sm:p-6 rounded-3xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
              !notif.read
                ? 'bg-amber-50/60 border-amber-300 shadow-xs ring-2 ring-amber-100'
                : 'bg-white border-stone-200 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-start space-x-4 flex-1">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                  notif.priority === 'high'
                    ? 'bg-amber-400 text-stone-950'
                    : 'bg-emerald-800 text-white'
                }`}
              >
                {notif.priority === 'high' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <TrendingUp className="w-6 h-6" />
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300">
                    {notif.type}
                  </span>
                  <span className="text-xs font-bold text-stone-500">{notif.timestamp}</span>
                  {!notif.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-black text-stone-900">
                  {language === 'mr' && notif.titleMr ? notif.titleMr : notif.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  {language === 'mr' && notif.messageMr ? notif.messageMr : notif.message}
                </p>
              </div>
            </div>

            {notif.actionableRoute && (
              <Link
                to={notif.actionableRoute}
                className="shrink-0 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
              >
                <span>{notif.actionText || 'तपासा'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
