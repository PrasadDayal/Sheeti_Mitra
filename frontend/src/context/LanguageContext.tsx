import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../types';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, defaultText?: string) => string;
}

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  mr: {
    // Brand & Navigation
    'brand.name': 'शेतीमित्र AI',
    'brand.tagline': 'खर्च जाणून घ्या • बाजारभाव तपासा • योग्य विक्रीचा निर्णय घ्या',
    'nav.platform': 'प्लॅटफॉर्म',
    'nav.features': 'सुविधा',
    'nav.howItWorks': 'कसे कार्य करते',
    'nav.forFarmers': 'शेतकऱ्यांसाठी',
    'nav.about': 'आमच्याबद्दल',
    'nav.login': 'लॉगिन करा',
    'nav.getStarted': 'माझी शेती सुरू करा',
    
    // Unified Menu Items
    'nav.dashboard': 'आजची माहिती',
    'nav.myFarm': 'माझी शेती',
    'nav.cropActivities': 'पीक व शेतीकामे',
    'nav.expensesProduction': 'खर्च नोंद',
    'nav.inputs': 'खते व औषधे',
    'nav.equipment': 'शेती अवजारे व यंत्रे',
    'nav.marketPrices': 'आजचे बाजारभाव',
    'nav.buyers': 'जवळचे खरेदीदार',
    'nav.sellingDecision': '⭐ कुठे विकल्यावर जास्त मिळेल?',
    'nav.profitAnalysis': 'खरा नफा',
    'nav.aiAssistant': 'AI शेतमित्र',
    'nav.notifications': 'महत्त्वाच्या सूचना',

    // Bottom Menu Items
    'nav.profile': 'शेतकरी प्रोफाइल',
    'nav.settings': 'सेटिंग्ज',
    'nav.helpline': '📞 शेतकरी मदत',

    // Quick Action Tiles
    'action.addExpense': 'खर्च नोंदवा',
    'action.addHarvest': 'तोडणी नोंदवा',
    'action.viewMarket': 'आजचे बाजारभाव',
    'action.sellingDecision': 'कुठे विकल्यावर जास्त मिळेल?',
    'action.findLabour': 'मजूर टोळी शोधा',
    'action.askAI': 'AI शेतमित्र',
    'action.callExpert': 'तज्ज्ञांशी बोला',
    'action.whatsappHelp': 'व्हॉट्सॲप मदत',

    // Common labels
    'crop.grapes': 'द्राक्ष',
    'crop.pomegranate': 'डाळिंब',
    'btn.save': 'जतन करा',
    'btn.cancel': 'रद्द करा',
    'btn.addExpense': 'नवीन खर्च जोडा',
    'btn.addHarvest': 'तोडणी नोंदवा',
    'btn.addField': 'नवीन प्लॉट जोडा',
    'btn.compareBuyers': 'खरेदीदार तुलना करा',
    'btn.calculateDecision': 'विक्री निर्णय तपासा',
    'demo.badge': 'थेट शेतकरी डेटा',
    'demo.verified': 'पडताळणीकृत',
    
    // Stats
    'stat.currentCrop': 'चालू पीक',
    'stat.farmArea': 'एकूण क्षेत्र',
    'stat.totalCost': 'एकूण झालेला खर्च',
    'stat.expectedRevenue': 'अपेक्षित उत्पन्न',
    'stat.estimatedProfit': 'अंदाजित निव्वळ नफा',
    'stat.breakEvenPrice': 'किमान परवडणारा भाव',
    
    // Weather & Advisory
    'weather.title': 'आजचे हवामान व शेती सूचना',
    'weather.spraySafe': 'फवारणीसाठी सकाळचे हवामान अनुकूल आहे',
    'weather.sprayAlert': 'हवामानात बदल: फवारणी सावधगिरीने करा',
    'weather.temp': 'तापमान',
    'weather.humidity': 'आर्द्रता',
    'weather.wind': 'वाऱ्याचा वेग',
    'weather.rainProb': 'पावसाची शक्यता',
  },
  hi: {
    // Brand & Navigation
    'brand.name': 'शेतीमित्र AI',
    'brand.tagline': 'लागत जानें • मंडी भाव परखें • सही बिक्री का फैसला लें',
    'nav.platform': 'प्लेटफॉर्म',
    'nav.features': 'सुविधाएं',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.forFarmers': 'किसानों के लिए',
    'nav.about': 'हमारे बारे में',
    'nav.login': 'लॉगिन करें',
    'nav.getStarted': 'मेरी खेती शुरू करें',
    
    // Unified Menu Items
    'nav.dashboard': 'आज की जानकारी',
    'nav.myFarm': 'मेरा खेत',
    'nav.cropActivities': 'फसल व कृषि कार्य',
    'nav.expensesProduction': 'लागत दर्ज करें',
    'nav.inputs': 'खाद व कीटनाशक',
    'nav.equipment': 'कृषि उपकरण व मशीनरी',
    'nav.marketPrices': 'आज के मंडी भाव',
    'nav.buyers': 'पास के खरीदार',
    'nav.sellingDecision': '⭐ कहाँ बेचने पर ज्यादा मिलेगा?',
    'nav.profitAnalysis': 'असली मुनाफा',
    'nav.aiAssistant': 'AI शेतमित्र',
    'nav.notifications': 'महत्वपूर्ण सूचनाएं',

    // Bottom Menu Items
    'nav.profile': 'किसान प्रोफाइल',
    'nav.settings': 'सेटिंग्स',
    'nav.helpline': '📞 किसान सहायता',

    // Quick Action Tiles
    'action.addExpense': 'खर्च दर्ज करें',
    'action.addHarvest': 'कटाई दर्ज करें',
    'action.viewMarket': 'आज के मंडी भाव',
    'action.sellingDecision': 'कहाँ बेचने पर ज्यादा मिलेगा?',
    'action.findLabour': 'मजदूर खोजें',
    'action.askAI': 'AI शेतमित्र',
    'action.callExpert': 'विशेषज्ञ से बात करें',
    'action.whatsappHelp': 'व्हाट्सएप सहायता',

    // Common labels
    'crop.grapes': 'अंगूर',
    'crop.pomegranate': 'अनार',
    'btn.save': 'सुरक्षित करें',
    'btn.cancel': 'रद्द करें',
    'btn.addExpense': 'खर्च जोड़ें',
    'btn.addHarvest': 'कटाई दर्ज करें',
    'btn.addField': 'खेत जोड़ें',
    'btn.compareBuyers': 'खरीदार तुलना करें',
    'btn.calculateDecision': 'बिक्री निर्णय जांचें',
    'demo.badge': 'सत्यापित डेटा',
    'demo.verified': 'सत्यापित',
    
    // Stats
    'stat.currentCrop': 'वर्तमान फसल',
    'stat.farmArea': 'कुल रकबा',
    'stat.totalCost': 'कुल लागत',
    'stat.expectedRevenue': 'अनुमानित आय',
    'stat.estimatedProfit': 'अनुमानित शुद्ध मुनाफा',
    'stat.breakEvenPrice': 'न्यूनतम लाभकारी भाव',
    
    // Weather & Advisory
    'weather.title': 'आज का मौसम व कृषि सलाह',
    'weather.spraySafe': 'छिड़काव के लिए सुबह का मौसम अनुकूल है',
    'weather.sprayAlert': 'मौसम में बदलाव: सावधानी से छिड़काव करें',
    'weather.temp': 'तापमान',
    'weather.humidity': 'आर्द्रता',
    'weather.wind': 'हवा की गति',
    'weather.rainProb': 'बारिश की संभावना',
  },
  en: {
    // Brand & Navigation
    'brand.name': 'ShetiMitra AI',
    'brand.tagline': 'Know Costs • Compare Mandis • Make Better Selling Decisions',
    'nav.platform': 'Platform',
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.forFarmers': 'For Farmers',
    'nav.about': 'About Us',
    'nav.login': 'Sign In',
    'nav.getStarted': 'Start My Farm',
    
    // Unified Menu Items
    'nav.dashboard': 'Today Info',
    'nav.myFarm': 'My Farm',
    'nav.cropActivities': 'Crop & Activities',
    'nav.expensesProduction': 'Record Cost',
    'nav.inputs': 'Inputs & Fertilizers',
    'nav.equipment': 'Equipment Store',
    'nav.marketPrices': 'Mandi Rates',
    'nav.buyers': 'Nearby Buyers',
    'nav.sellingDecision': '⭐ Where to Sell?',
    'nav.profitAnalysis': 'True Profit',
    'nav.aiAssistant': 'AI Assistant',
    'nav.notifications': 'Important Alerts',

    // Bottom Menu Items
    'nav.profile': 'Farmer Profile',
    'nav.settings': 'Settings',
    'nav.helpline': '📞 Farmer Support',

    // Quick Action Tiles
    'action.addExpense': 'Add Expense',
    'action.addHarvest': 'Log Harvest',
    'action.viewMarket': 'Mandi Rates',
    'action.sellingDecision': 'Where to Sell?',
    'action.findLabour': 'Find Labour',
    'action.askAI': 'AI Assistant',
    'action.callExpert': 'Call Agronomist',
    'action.whatsappHelp': 'WhatsApp Help',

    // Common labels
    'crop.grapes': 'Grapes',
    'crop.pomegranate': 'Pomegranate',
    'btn.save': 'Save Changes',
    'btn.cancel': 'Cancel',
    'btn.addExpense': 'Add New Expense',
    'btn.addHarvest': 'Log Harvest Batch',
    'btn.addField': 'Add New Plot',
    'btn.compareBuyers': 'Compare Buyers',
    'btn.calculateDecision': 'Run Selling Engine',
    'demo.badge': 'Verified Live Data',
    'demo.verified': 'Verified Partner',
    
    // Stats
    'stat.currentCrop': 'Active Crop',
    'stat.farmArea': 'Cultivated Area',
    'stat.totalCost': 'Total Season Cost',
    'stat.expectedRevenue': 'Gross Revenue',
    'stat.estimatedProfit': 'Est. Net Profit',
    'stat.breakEvenPrice': 'Break-Even Price',
    
    // Weather & Advisory
    'weather.title': 'Live Farm Weather & Advisory',
    'weather.spraySafe': 'Optimal morning conditions for spraying',
    'weather.sprayAlert': 'Weather alert: Rain/Wind expected',
    'weather.temp': 'Temperature',
    'weather.humidity': 'Humidity',
    'weather.wind': 'Wind Speed',
    'weather.rainProb': 'Rain Probability',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('sheetimitra_lang') as LanguageCode;
    return saved === 'mr' || saved === 'hi' || saved === 'en' ? saved : 'mr';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('sheetimitra_lang', lang);
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const mrDict = TRANSLATIONS.mr;
    if (mrDict && mrDict[key]) {
      return mrDict[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
