import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFarmData } from '../context/FarmDataContext';
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Database,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Download,
  Save,
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { farmer, fields, expenses, harvestBatches, activities } = useFarmData();

  const [marketAlerts, setMarketAlerts] = useState(() => {
    const saved = localStorage.getItem('sheetimitra_alert_market');
    return saved !== null ? saved === 'true' : true;
  });
  const [buyerAlerts, setBuyerAlerts] = useState(() => {
    const saved = localStorage.getItem('sheetimitra_alert_buyer');
    return saved !== null ? saved === 'true' : true;
  });
  const [expenseAlerts, setExpenseAlerts] = useState(() => {
    const saved = localStorage.getItem('sheetimitra_alert_expense');
    return saved !== null ? saved === 'true' : true;
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('sheetimitra_alert_market', String(marketAlerts));
    localStorage.setItem('sheetimitra_alert_buyer', String(buyerAlerts));
    localStorage.setItem('sheetimitra_alert_expense', String(expenseAlerts));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDownloadBackup = () => {
    const backupData = {
      farmer,
      fields,
      expenses,
      harvestBatches,
      activities,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sheetimitra_backup_${farmer.id || 'farm'}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <SettingsIcon className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {language === 'mr' ? 'ॲप सेटिंग्ज व पसंती' : 'Platform Configuration'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {language === 'mr' ? 'सेटिंग्ज व अलर्ट प्राधान्ये (Settings)' : 'App Settings & Preferences (सेटिंग्ज)'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            बाजार भाव अलर्ट्स, व्यापारी नोटिफिकेशन्स आणि डेटा बॅकअप पर्याय.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-100 text-emerald-950 rounded-2xl border-2 border-emerald-300 text-sm font-black flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
          <span>सेटिंग्ज यशस्वीरीत्या अपडेट केल्या गेल्या! (Settings saved successfully!)</span>
        </div>
      )}

      {/* Notification Alert Settings */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4 text-xs sm:text-sm text-stone-700">
        <h3 className="text-base sm:text-lg font-black text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-emerald-800" />
          <span>सूचना व अलर्ट्स प्राधान्ये (Alert Preferences)</span>
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 transition border border-stone-200 cursor-pointer">
            <div>
              <span className="font-black text-stone-900 block text-sm sm:text-base">बाजार भाव वाढ अलर्ट (APMC Price Spike Alerts)</span>
              <span className="text-stone-500 text-xs">पिंपळगाव किंवा तासगाव बाजार समितीत द्राक्षाचा भाव ३% पेक्षा वाढल्यास तात्काळ अलर्ट द्या</span>
            </div>
            <input
              type="checkbox"
              checked={marketAlerts}
              onChange={(e) => setMarketAlerts(e.target.checked)}
              className="w-5 h-5 text-emerald-700 rounded border-stone-300"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 transition border border-stone-200 cursor-pointer">
            <div>
              <span className="font-black text-stone-900 block text-sm sm:text-base">थेट एक्सपोर्टर व खरेदीदार ऑफर सूचना</span>
              <span className="text-stone-500 text-xs">व्यापाऱ्यांनी शेतावर मोफत उचल करणारी मोठी ऑफर दिल्यास SMS/सूचना पाठवा</span>
            </div>
            <input
              type="checkbox"
              checked={buyerAlerts}
              onChange={(e) => setBuyerAlerts(e.target.checked)}
              className="w-5 h-5 text-emerald-700 rounded border-stone-300"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 transition border border-stone-200 cursor-pointer">
            <div>
              <span className="font-black text-stone-900 block text-sm sm:text-base">खर्च बजेट सावधगिरी सूचना (Budget Warning)</span>
              <span className="text-stone-500 text-xs">शेतीचा एकूण खर्च हंगामाच्या ८०% बजेटच्या पुढे गेल्यास सूचना द्या</span>
            </div>
            <input
              type="checkbox"
              checked={expenseAlerts}
              onChange={(e) => setExpenseAlerts(e.target.checked)}
              className="w-5 h-5 text-emerald-700 rounded border-stone-300"
            />
          </label>
        </div>
      </div>

      {/* Backend & Architecture Compatibility */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4 text-xs sm:text-sm text-stone-700">
        <h3 className="text-base sm:text-lg font-black text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
          <Database className="w-5 h-5 text-emerald-800" />
          <span>शेती डेटा बॅकअप व सुरक्षा (Data Backup)</span>
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <span className="font-black text-stone-900 block text-sm">माझ्या शेतीचा संपूर्ण डेटा डाउनलोड करा (JSON Backup)</span>
            <span className="text-stone-500 text-xs">खर्च, तोडणी व शेत प्लॉट नोंदी ऑफलाइन सुरक्षित ठेवा.</span>
          </div>
          <button
            onClick={handleDownloadBackup}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold rounded-xl flex items-center space-x-2 transition shrink-0 cursor-pointer text-xs sm:text-sm"
          >
            <Download className="w-4 h-4" />
            <span>डेटा डाउनलोड करा</span>
          </button>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-md transition cursor-pointer flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>सर्व सेटिंग्ज सेव्ह करा (Save All)</span>
        </button>
      </div>
    </div>
  );
};
