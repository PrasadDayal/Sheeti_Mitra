import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { StatCard } from '../components/common/StatCard';
import { PriceLineChart } from '../components/charts/PriceLineChart';
import { Modal } from '../components/common/Modal';
import { ExpenseForm } from '../components/forms/ExpenseForm';
import { HarvestForm } from '../components/forms/HarvestForm';
import { formatINR } from '../utils/calculations';
import { IMAGES } from '../images/images';
import { CropType } from '../types';
import { api } from '../services/api';
import {
  TrendingUp,
  ReceiptIndianRupee,
  PieChart,
  Sparkles,
  ArrowUpRight,
  PlusCircle,
  Scale,
  MapPin,
  CloudSun,
  Volume2,
  VolumeX,
  Sliders,
  ArrowRight,
  CheckCircle2,
  Zap,
  Info,
  Mic,
  Building2,
  Sprout,
  AlertTriangle,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    farmer,
    totalCost,
    expectedRevenue,
    estimatedProfit,
    profitMarginPercent,
    breakEvenPrice,
    bestBuyer,
    marketPrices,
    expenses,
    fields,
    addExpense,
    expectedYieldKg,
    sellingComparisons,
    notifications,
  } = useFarmData();
  const { language } = useLanguage();

  // Modals & UI States
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Crop Filter Tab
  const [selectedCrop, setSelectedCrop] = useState<CropType>('Grapes');

  const effectiveYieldKg = expectedYieldKg > 0 ? expectedYieldKg : 3500;

  // Interactive Live Profit Calculator States
  const [simYieldKg, setSimYieldKg] = useState<number>(effectiveYieldKg);
  const [simRatePerKg, setSimRatePerKg] = useState<number>(selectedCrop === 'Pomegranate' ? 142 : 102);

  // Info tooltip state for Estimated Profit
  const [showProfitInfo, setShowProfitInfo] = useState(false);

  // Voice transcript simulation state
  const [voiceText, setVoiceText] = useState<string | null>(null);

  // Interactive Audio Speech State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const grapePrice = marketPrices.find((m) => m.crop === 'Grapes') || marketPrices[0];
  const pomPrice = marketPrices.find((m) => m.crop === 'Pomegranate') || marketPrices[1] || marketPrices[0];
  const currentDisplayPrice = selectedCrop === 'Pomegranate' ? pomPrice : grapePrice;

  // Live Simulator Calculations
  const simRevenue = simYieldKg * simRatePerKg;
  const simProfit = simRevenue - totalCost;
  const simMargin = Math.round((simProfit / (simRevenue || 1)) * 100);

  // Live Weather State
  const [weatherData, setWeatherData] = useState<{
    temperature: number;
    windSpeedKmH: number;
    isSpraySuitable: boolean;
    sprayRecommendation: string;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getWeather(farmer.district || 'Nashik').then((w) => {
      if (isMounted && w) {
        setWeatherData(w);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [farmer.district]);

  useEffect(() => {
    if (effectiveYieldKg > 0) {
      setSimYieldKg(effectiveYieldKg);
    }
  }, [effectiveYieldKg]);

  useEffect(() => {
    if (currentDisplayPrice?.modalPrice) {
      setSimRatePerKg(currentDisplayPrice.modalPrice);
    }
  }, [currentDisplayPrice?.modalPrice]);

  const dContent = {
    mr: {
      greet: 'राम राम',
      acres: `${farmer.totalAcres} एकर शेती`,
      todayGlance: '🌱 आजची ठळक माहिती',
      cropLabel: 'चालू पीक',
      bestMarketLabel: 'सर्वोत्तम बाजारभाव',
      bestBuyerLabel: 'सर्वोत्तम खरेदीदार',
      estNetLabel: 'अंदाजे नफा',
      alertsLabel: '२ सूचना',
      bestMarketRate: '₹१०२/किलो (तासगाव)',
      bestBuyerRate: '₹१०६/किलो (एमएच फ्रेश)',
      estNetProfitValue: '₹१.०५ लाख',
      totalCostTitle: '💰 एकूण खर्च',
      totalCostSub: `${expenses.length} खर्च नोंदी`,
      expectedRevTitle: '📦 अपेक्षित उत्पन्न',
      expectedRevSub: `@ ₹${currentDisplayPrice.modalPrice}/किलो बाजार भाव`,
      estProfitTitle: '🟢 अंदाजे निव्वळ नफा',
      estProfitSub: `+${profitMarginPercent}% नफा मार्जिन`,
      breakEvenTitle: '🎯 नफा सुरू होण्याचा भाव',
      breakEvenSub: 'यापुढील दरावर निव्वळ नफा',
      activePlotsTitle: 'माझी शेतातील प्लॉट्स',
      activePlotsSub: 'पिकाचा टप्पा व साखर प्रमाण (Brix)',
      allPlotsLink: 'सर्व प्लॉट →',
      plot1Title: '🍇 प्लॉट १ — २ एकर (द्राक्ष)',
      plot1Field: 'मालेगाव शेत',
      plot1Stage: 'मणी मऊ पडणे व विरळणी पूर्ण',
      plot1Brix: 'साखर प्रमाण: १५.५ / १८ Brix (८२% तयार)',
      plot2Title: '❤️ प्लॉट २ — १.५ एकर (डाळिंब)',
      plot2Field: 'कॅनॉल शेत',
      plot2Stage: 'सनबर्न पेपर बॅगिंग ९०% पूर्ण',
      plot2Weight: 'फळ वजन: ३५०-४०० ग्रॅम (७०% पूर्ण)',
      whereToSellTitle: '⭐ आज कुठे विकल्यावर जास्त नफा मिळेल?',
      whereToSellFlagship: 'प्रमुख सुविधा',
      whereToSellYield: 'अपेक्षित उत्पादन: ३,४५० किलो',
      compareOptionsBtn: 'सर्व पर्याय पडताळा →',
      recommendedBadge: '🟢 सर्वोत्तम पर्याय',
      grossPriceLabel: 'एकूण भाव:',
      netRealizationLabel: 'अंदाजित निव्वळ भाव:',
      apmcName: 'APMC मार्केट (तासगाव)',
      buyerAName: 'थेट खरेदीदार A (MH Fresh)',
      buyerBName: 'एक्सपोर्ट खरेदीदार B (AgriExport)',
      pickupLabel: 'थेट शेतावरून उचल',
      gradeALabel: 'ग्रेड A फक्त',
      potentialRevSummary: 'APMC मार्केट सल्ल्यानुसार अपेक्षित एकूण निव्वळ उत्पन्न:',
      potentialRevValue: '₹३.३१ लाख',
      actAddExpense: '➕ खर्च नोंदवा',
      actAddExpenseSub: 'मजुरी, खते, डिझेल',
      actAddHarvest: '⚖️ तोडणी नोंदवा',
      actAddHarvestSub: 'वजन, ब्रिक्स, कॅरेट',
      actMarketPrice: '📈 आजचे बाजारभाव',
      actMarketPriceSub: 'पिंपळगाव, तासगाव',
      actWhereToSell: '⭐ कुठे विकल्यावर जास्त मिळेल?',
      actWhereToSellSub: 'नफा तुलना',
      mandiTitle: 'बाजारभावातील बदल (APMC Trends)',
      mandiLive: 'ताजा भाव',
      mandiSub: 'पिंपळगाव व तासगाव बाजार समित्या',
      allMarketsLink: 'सर्व बाजार →',
      calculatorTitle: 'माझा नफा कॅल्क्युलेटर',
      calculatorSub: 'उत्पादन व भाव बदलून अंदाजित नफा तपासा',
      marginHigh: '🟢 उत्तम नफा',
      marginMid: '🟡 मध्यम नफा',
      marginLow: '🔴 कमी नफा',
      yieldLabel: 'अपेक्षित एकूण उत्पादन (Kg):',
      rateLabel: 'अपेक्षित विक्री भाव (₹/Kg):',
      calcNetLabel: 'अंदाजित निव्वळ नफा',
      calcRevLabel: 'एकूण महसूल',
      calcMarginLabel: 'मार्जिन',
      calcCta: 'विक्री पर्याय तुलना करा',
      weatherTitle: '🌤️ आजचे शेत हवामान',
      weatherNoteTitle: '🟢 आजचा शेती सल्ला:',
      weatherNoteBody: 'सध्याचे हवामान शेतातील नियोजित कामांसाठी अनुकूल आहे.',
      weatherHumidity: '💧 आर्द्रता ६२%',
      weatherWind: '🌬️ वाऱ्याचा वेग १२ किमी/तास',
      weatherRain: '🌧️ पावसाची शक्यता १०%',
      bestBuyerTitle: '🏪 जवळचा सर्वोत्तम खरेदीदार',
      bestBuyerSub: 'उच्चतम निव्वळ भाव',
      bestBuyerVerified: 'पडताळणीकृत',
      bestBuyerName: 'महाराष्ट्र फ्रेश प्रोड्यूस',
      bestBuyerOffer: '💰 ऑफर भाव: ₹१०६/किलो',
      bestBuyerLocation: '📍 २४ किमी लांब • 🚚 मोफत वाहतूक',
      bestBuyerPayment: '💳 पेमेंट: कराराप्रमाणे',
      bestBuyerNetLabel: 'अंदाजित निव्वळ भाव:',
      compareBuyersBtn: 'खरेदीदार तुलना करा →',
      quickExpenseTitle: '१-क्लिक झटपट खर्च नोंद',
      voiceBtn: 'मराठी व्हॉईस',
      quickDiesel: '🚜 ट्रॅक्टर डिझेल',
      quickLabour: '👥 दैनिक मजुरी',
      quickFertilizer: '🌱 खत पोते',
      addOtherExpenseBtn: '+ इतर खर्च नोंदवा',
      modalAddExpense: 'नवीन खर्च नोंदवा',
      modalLogHarvest: 'तोडणी नोंदवा',
      toastExpenseSaved: 'खर्च जतन झाला!',
      toastHarvestLogged: 'तोडणी नोंदवली!',
      currencyPerKg: '/किलो',
      weightUnit: 'किलो',
    },
    hi: {
      greet: 'राम राम',
      acres: `${farmer.totalAcres} एकड़ खेत`,
      todayGlance: '🌱 आज की मुख्य जानकारी',
      cropLabel: 'वर्तमान फसल',
      bestMarketLabel: 'सर्वोत्तम मंडी भाव',
      bestBuyerLabel: 'सर्वोत्तम खरीदार',
      estNetLabel: 'अनुमानित शुद्ध मुनाफा',
      alertsLabel: '२ सूचनाएं',
      bestMarketRate: '₹102/किग्रा (तासगांव)',
      bestBuyerRate: '₹106/किग्रा (एमएच फ्रेश)',
      estNetProfitValue: '₹1.05 लाख',
      totalCostTitle: '💰 कुल लागत',
      totalCostSub: `${expenses.length} खर्च प्रविष्टियां`,
      expectedRevTitle: '📦 अनुमानित आय',
      expectedRevSub: `@ ₹${currentDisplayPrice.modalPrice}/किग्रा मंडी भाव`,
      estProfitTitle: '🟢 अनुमानित शुद्ध मुनाफा',
      estProfitSub: `+${profitMarginPercent}% लाभ मार्जिन`,
      breakEvenTitle: '🎯 न्यूनतम लाभकारी भाव',
      breakEvenSub: 'इसके ऊपर शुद्ध मुनाफा',
      activePlotsTitle: 'मेरे खेत के प्लॉट',
      activePlotsSub: 'फसल की अवस्था व शर्करा स्तर (Brix)',
      allPlotsLink: 'सभी प्लॉट →',
      plot1Title: '🍇 प्लॉट १ — २ एकड़ (अंगूर)',
      plot1Field: 'मालेगांव खेत',
      plot1Stage: 'बेरी नरम होना व छंटाई पूर्ण',
      plot1Brix: 'शर्करा स्तर: १५.५ / १८ Brix (८२% तैयार)',
      plot2Title: '❤️ प्लॉट २ — १.५ एकड़ (अनार)',
      plot2Field: 'कैनाल खेत',
      plot2Stage: 'सनबर्न पेपर बैगिंग ९०% पूर्ण',
      plot2Weight: 'फल वजन: ३५०-४०० ग्राम (७०% पूर्ण)',
      whereToSellTitle: '⭐ आज कहाँ बेचने पर ज्यादा मुनाफा मिलेगा?',
      whereToSellFlagship: 'प्रमुख सुविधा',
      whereToSellYield: 'अनुमानित उत्पादन: ३,४५० किलो',
      compareOptionsBtn: 'सभी विकल्प जांचें →',
      recommendedBadge: '🟢 सर्वोत्तम विकल्प',
      grossPriceLabel: 'कुल भाव:',
      netRealizationLabel: 'अनुमानित शुद्ध दर:',
      apmcName: 'APMC मंडी (तासगांव)',
      buyerAName: 'सीधा खरीदार A (MH Fresh)',
      buyerBName: 'निर्यातक खरीदार B (AgriExport)',
      pickupLabel: 'सीधे खेत से उठान',
      gradeALabel: 'ग्रेड A केवल',
      potentialRevSummary: 'मंडी सलाह के अनुसार अनुमानित कुल शुद्ध आय:',
      potentialRevValue: '₹3.31 लाख',
      actAddExpense: '➕ खर्च दर्ज करें',
      actAddExpenseSub: 'मजदूरी, खाद, डीजल',
      actAddHarvest: '⚖️ कटाई दर्ज करें',
      actAddHarvestSub: 'वजन, ब्रिक्स, कैरेट',
      actMarketPrice: '📈 आज के मंडी भाव',
      actMarketPriceSub: 'पिंपलगांव, तासगांव',
      actWhereToSell: '⭐ कहाँ बेचने पर ज्यादा मिलेगा?',
      actWhereToSellSub: 'मुनाफा तुलना',
      mandiTitle: 'मंडी भाव में बदलाव (APMC Trends)',
      mandiLive: 'ताजा भाव',
      mandiSub: 'पिंपलगांव व तासगांव मंडियां',
      allMarketsLink: 'सभी मंडियां →',
      calculatorTitle: 'मेरा मुनाफा कैलकुलेटर',
      calculatorSub: 'उत्पादन व भाव बदलकर अनुमानित मुनाफा जांचें',
      marginHigh: '🟢 उत्तम मुनाफा',
      marginMid: '🟡 मध्यम मुनाफा',
      marginLow: '🔴 कम मुनाफा',
      yieldLabel: 'अनुमानित कुल उत्पादन (Kg):',
      rateLabel: 'अनुमानित बिक्री भाव (₹/Kg):',
      calcNetLabel: 'अनुमानित शुद्ध मुनाफा',
      calcRevLabel: 'कुल आय',
      calcMarginLabel: 'मार्जिन',
      calcCta: 'बिक्री विकल्प तुलना करें',
      weatherTitle: '🌤️ आज का खेत मौसम',
      weatherNoteTitle: '🟢 आज की कृषि सलाह:',
      weatherNoteBody: 'वर्तमान मौसम खेत के कार्यों के लिए अनुकूल है।',
      weatherHumidity: '💧 नमी 62%',
      weatherWind: '🌬️ हवा 12 किमी/घंटा',
      weatherRain: '🌧️ बारिश की संभावना 10%',
      bestBuyerTitle: '🏪 पास का सर्वोत्तम खरीदार',
      bestBuyerSub: 'उच्चतम शुद्ध दर',
      bestBuyerVerified: 'सत्यापित',
      bestBuyerName: 'महाराष्ट्र फ्रेश प्रोड्यूस',
      bestBuyerOffer: '💰 ऑफर भाव: ₹१०६/किग्रा',
      bestBuyerLocation: '📍 २४ किमी दूर • 🚚 मुफ्त परिवहन',
      bestBuyerPayment: '💳 भुगतान: अनुबंधानुसार',
      bestBuyerNetLabel: 'अनुमानित शुद्ध दर:',
      compareBuyersBtn: 'खरीदार तुलना करें →',
      quickExpenseTitle: '१-क्लिक झटपट खर्च दर्ज करें',
      voiceBtn: 'हिंदी वॉइस',
      quickDiesel: '🚜 ट्रैक्टर डीजल',
      quickLabour: '👥 दैनिक मजदूरी',
      quickFertilizer: '🌱 खाद बैग',
      addOtherExpenseBtn: '+ अन्य खर्च दर्ज करें',
      modalAddExpense: 'नया खर्च दर्ज करें',
      modalLogHarvest: 'कटाई दर्ज करें',
      toastExpenseSaved: 'खर्च सुरक्षित हुआ!',
      toastHarvestLogged: 'कटाई दर्ज हुई!',
      currencyPerKg: '/किग्रा',
      weightUnit: 'किग्रा',
    },
    en: {
      greet: 'Welcome',
      acres: `${farmer.totalAcres} Acres Farm`,
      todayGlance: '🌱 Today at a Glance',
      cropLabel: 'Active Crop',
      bestMarketLabel: 'Best Market Rate',
      bestBuyerLabel: 'Best Buyer',
      estNetLabel: 'Est. Net Profit',
      alertsLabel: '2 Alerts',
      bestMarketRate: '₹102/kg (Tasgaon)',
      bestBuyerRate: '₹106/kg (MH Fresh)',
      estNetProfitValue: '₹1.05L',
      totalCostTitle: '💰 Total Cost',
      totalCostSub: `${expenses.length} expense entries logged`,
      expectedRevTitle: '📦 Expected Revenue',
      expectedRevSub: `@ ₹${currentDisplayPrice.modalPrice}/kg market rate`,
      estProfitTitle: '🟢 Est. Net Profit',
      estProfitSub: `+${profitMarginPercent}% profit margin`,
      breakEvenTitle: '🎯 Break-even Price',
      breakEvenSub: 'Profit starts on any price above this threshold',
      activePlotsTitle: 'My Active Farm Plots',
      activePlotsSub: 'Current crop stage & Sugar Brix maturity progress',
      allPlotsLink: 'All Plots →',
      plot1Title: '🍇 Plot 1 — 2 Acres (Grapes)',
      plot1Field: 'Malegaon Field',
      plot1Stage: 'Fruit Development & Thinning Done',
      plot1Brix: 'Sugar Brix: 15.5 / 18 Brix (82% Ready)',
      plot2Title: '❤️ Plot 2 — 1.5 Acres (Pomegranate)',
      plot2Field: 'Canal Field',
      plot2Stage: 'Flowering & Sunburn Paper Bagging Done',
      plot2Weight: 'Fruit Weight: 350-400g (70% Complete)',
      whereToSellTitle: '⭐ Where Should I Sell Today?',
      whereToSellFlagship: 'Flagship Feature',
      whereToSellYield: 'Estimated Harvest Yield: 3,450 kg',
      compareOptionsBtn: 'Compare All Options →',
      recommendedBadge: '🟢 Recommended Option',
      grossPriceLabel: 'Gross Price:',
      netRealizationLabel: 'Est. Net Realization:',
      apmcName: 'APMC Market (Tasgaon)',
      buyerAName: 'Direct Buyer A (MH Fresh)',
      buyerBName: 'Exporter Buyer B (AgriExport)',
      pickupLabel: 'Direct Farm Pickup',
      gradeALabel: 'Grade A Only',
      potentialRevSummary: 'Potential estimated net revenue based on APMC Market recommendation:',
      potentialRevValue: '₹3.31 Lakhs',
      actAddExpense: '➕ Add Expense',
      actAddExpenseSub: 'Labour, Fertilizer, Diesel',
      actAddHarvest: '⚖️ Log Harvest',
      actAddHarvestSub: 'Yield, Brix, Crates',
      actMarketPrice: '📈 Mandi Rates',
      actMarketPriceSub: 'Pimpalgaon, Tasgaon',
      actWhereToSell: '⭐ Where Should I Sell?',
      actWhereToSellSub: 'Profit Engine',
      mandiTitle: 'APMC Market Price Trends',
      mandiLive: 'Live Rates',
      mandiSub: 'Pimpalgaon & Tasgaon APMC Mandis',
      allMarketsLink: 'All Markets →',
      calculatorTitle: 'Live Profit Calculator',
      calculatorSub: 'Adjust yield & selling rate to recalculate net profit',
      marginHigh: '🟢 High Margin',
      marginMid: '🟡 Medium Margin',
      marginLow: '🔴 Low Margin',
      yieldLabel: 'Estimated Harvest Yield (Kg):',
      rateLabel: 'Estimated Selling Rate (₹/Kg):',
      calcNetLabel: 'Calculated Net Profit',
      calcRevLabel: 'Gross Revenue',
      calcMarginLabel: 'Profit Margin',
      calcCta: 'Compare Selling Channels',
      weatherTitle: '🌤️ Today\'s Farm Weather',
      weatherNoteTitle: '🟢 Today\'s Farm Note:',
      weatherNoteBody: 'Weather conditions currently look suitable for planned field activities.',
      weatherHumidity: '💧 Humidity 62%',
      weatherWind: '🌬️ Wind 12 km/h',
      weatherRain: '🌧️ Rain chance 10%',
      bestBuyerTitle: '🏪 Best Buyer Near You',
      bestBuyerSub: 'Highest Net Realization offer',
      bestBuyerVerified: 'Verified Partner',
      bestBuyerName: 'Maharashtra Fresh Produce',
      bestBuyerOffer: '💰 Offer Rate: ₹106/kg',
      bestBuyerLocation: '📍 24 km away • 🚚 Free Pickup',
      bestBuyerPayment: '💳 Payment: Agreed Terms',
      bestBuyerNetLabel: 'Est. Net Realization:',
      compareBuyersBtn: 'Compare Buyers →',
      quickExpenseTitle: '1-Tap Quick Expense Logger',
      voiceBtn: 'Voice Input',
      quickDiesel: '🚜 Tractor Diesel',
      quickLabour: '👥 Daily Labour',
      quickFertilizer: '🌱 Fertilizer Bag',
      addOtherExpenseBtn: '+ Add Other Expense',
      modalAddExpense: 'Add Farm Expense',
      modalLogHarvest: 'Log Harvest',
      toastExpenseSaved: 'Expense saved!',
      toastHarvestLogged: 'Harvest logged!',
      currencyPerKg: '/kg',
      weightUnit: 'kg',
    }
  };

  const cd = dContent[language] || dContent.mr;

  const getCropLabel = (crop: CropType) => {
    if (crop === 'Grapes') {
      return language === 'mr' ? 'द्राक्ष' : language === 'hi' ? 'अंगूर' : 'Grapes';
    }
    return language === 'mr' ? 'डाळिंब' : language === 'hi' ? 'अनार' : 'Pomegranate';
  };

  const farmerDisplayName = (language === 'mr' && farmer.nameMr)
    ? farmer.nameMr.split(' ')[0]
    : (language === 'hi' && farmer.nameMr)
      ? farmer.nameMr.split(' ')[0]
      : farmer.name.split(' ')[0];

  const handleVoiceListen = () => {
    const text = language === 'mr' ? 'आज मजुरीला ५०० रुपये दिले' : language === 'hi' ? 'आज मजदूरी में ५०० रुपये दिए' : 'Logged 500 rupees for daily labour';
    setVoiceText(text);
    triggerToast(`🎤 "${text}"`);
    setTimeout(() => {
      handleQuickAddExpense('Labour', 500);
      setVoiceText(null);
    }, 2000);
  };

  // Quick 1-Tap Expense Logger
  const handleQuickAddExpense = (cat: 'Diesel' | 'Labour' | 'Fertilizer', amount: number) => {
    addExpense({
      category: cat === 'Diesel' ? 'Machinery' : cat,
      amount,
      date: new Date().toISOString().split('T')[0],
      crop: selectedCrop,
      fieldId: fields[0]?.id || 'field-01',
      fieldName: fields[0]?.name || 'Field 01',
      description: `Quick: ${cat}`,
      paymentMethod: 'Cash',
    });
    triggerToast(`₹${amount} ${cat} logged!`);
  };

  // Audio Speech synthesis
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if ('speechSynthesis' in window) {
      const speechText =
        language === 'mr'
          ? `राम राम ${farmerDisplayName}जी. आज ${currentDisplayPrice.marketName} मध्ये ${getCropLabel(selectedCrop)}चा भाव ${currentDisplayPrice.modalPrice} रुपये प्रति किलो आहे. आजचा अंदाजे निव्वळ नफा ${formatINR(estimatedProfit)} आहे.`
          : language === 'hi'
            ? `राम राम ${farmerDisplayName}जी. आज ${currentDisplayPrice.marketName} में ${getCropLabel(selectedCrop)} का भाव ${currentDisplayPrice.modalPrice} रुपये प्रति किग्रा है। आज का अनुमानित शुद्ध मुनाफा ${formatINR(estimatedProfit)} है।`
            : `Hello ${farmerDisplayName}. Today's ${selectedCrop} rate in ${currentDisplayPrice.marketName} is ${currentDisplayPrice.modalPrice} rupees per kg. Estimated net profit is ${formatINR(estimatedProfit)}.`;

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    } else {
      triggerToast('Audio speech is not supported in this browser.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-3 text-sm font-bold border border-emerald-400 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. SIMPLIFIED TOP HEADER SECTION */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Greeting & Location */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-950 text-white font-black text-xl flex items-center justify-center border-2 border-emerald-500 shrink-0 shadow-2xs">
            {(farmer.name || 'S').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center space-x-1.5">
              <span>{cd.greet}, {farmerDisplayName} 👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-semibold flex items-center space-x-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>📍 {farmer.village || farmer.district}, {farmer.district} • {cd.acres}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Crop Tabs | Voice | Add Expense */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Crop Selector Tabs */}
          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200">
            <button
              type="button"
              onClick={() => {
                setSelectedCrop('Grapes');
                setSimRatePerKg(102);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center space-x-1.5 ${selectedCrop === 'Grapes'
                  ? 'bg-emerald-900 text-white shadow-sm ring-2 ring-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
            >
              <span>🍇 {getCropLabel('Grapes')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCrop('Pomegranate');
                setSimRatePerKg(142);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center space-x-1.5 ${selectedCrop === 'Pomegranate'
                  ? 'bg-emerald-900 text-white shadow-sm ring-2 ring-emerald-700'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
            >
              <span>❤️ {getCropLabel('Pomegranate')}</span>
            </button>
          </div>

          {/* Voice Microphone Button */}
          <button
            type="button"
            onClick={handleToggleAudio}
            className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-center ${isPlayingAudio
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            title={cd.voiceBtn}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Mic className="w-4 h-4 text-emerald-800" />}
          </button>

          {/* Add Expense Button */}
          <button
            type="button"
            onClick={() => setShowExpenseModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs sm:text-sm font-black text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-xs transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-300" />
            <span>{cd.actAddExpense}</span>
          </button>
        </div>
      </div>

      {/* 2. TODAY AT A GLANCE STRIP */}
      <div className="bg-emerald-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-md border border-emerald-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 font-bold">
            🌱
          </div>
          <span className="font-black text-sm text-emerald-100 uppercase tracking-wider">
            {cd.todayGlance}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <div className="flex items-center space-x-1.5">
            <span className="text-emerald-300 font-medium">{cd.cropLabel}:</span>
            <strong className="text-white font-bold">{getCropLabel(selectedCrop)}</strong>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-emerald-300 font-medium">{cd.bestMarketLabel}:</span>
            <strong className="text-amber-300 font-black">₹{currentDisplayPrice.modalPrice}{cd.currencyPerKg} ({currentDisplayPrice.marketName})</strong>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-emerald-300 font-medium">{cd.bestBuyerLabel}:</span>
            <strong className="text-emerald-200 font-bold">{bestBuyer ? `₹${bestBuyer.offerPricePerKg}${cd.currencyPerKg} (${bestBuyer.companyName || bestBuyer.name})` : '-'}</strong>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-emerald-300 font-medium">{cd.estNetLabel}:</span>
            <strong className="text-white font-black">{formatINR(estimatedProfit)}</strong>
          </div>
          <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{notifications.filter((n) => !n.read).length} {cd.alertsLabel}</span>
          </div>
        </div>
      </div>

      {/* 3. CORE 4 SUMMARY KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Cost */}
        <StatCard
          title={cd.totalCostTitle}
          value={formatINR(totalCost)}
          subtitle={cd.totalCostSub}
          icon={ReceiptIndianRupee}
          variant="slate"
        />

        {/* Expected Revenue */}
        <StatCard
          title={cd.expectedRevTitle}
          value={formatINR(expectedRevenue)}
          subtitle={cd.expectedRevSub}
          icon={TrendingUp}
          variant="blue"
        />

        {/* Estimated Profit with Info Icon & Tooltip */}
        <div className="relative">
          <div className="h-full bg-emerald-50/90 border border-emerald-300 p-4 rounded-2xl shadow-2xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 flex items-center space-x-1">
                <span>{cd.estProfitTitle}</span>
                <button
                  type="button"
                  onClick={() => setShowProfitInfo(!showProfitInfo)}
                  className="text-emerald-700 hover:text-emerald-900 cursor-pointer p-0.5 rounded-full hover:bg-emerald-100"
                  title="Calculated estimate info"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                <PieChart className="w-4 h-4 text-emerald-300" />
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-950">
                {formatINR(estimatedProfit)}
              </div>
              <span className="text-[11px] text-emerald-800 font-bold block mt-0.5">
                {cd.estProfitSub}
              </span>
            </div>
          </div>

          {/* Info Popover */}
          {showProfitInfo && (
            <div className="absolute top-12 left-0 right-0 z-30 bg-stone-900 text-stone-100 text-[11px] p-3 rounded-xl shadow-xl border border-stone-700 space-y-1">
              <p className="font-bold text-amber-300">ℹ️ Note / सूचना:</p>
              <p className="leading-relaxed">
                {language === 'mr'
                  ? 'हा निव्वळ नफा तुमच्या खर्चाच्या नोंदी व सध्याच्या बाजारभावावर आधारित अंदाजित आहे.'
                  : language === 'hi'
                    ? 'यह शुद्ध मुनाफा आपके दर्ज खर्च व वर्तमान मंडी भाव पर आधारित अनुमानित है।'
                    : 'Calculated estimates based on current market rates & farm cost logs, not guaranteed values.'}
              </p>
            </div>
          )}
        </div>

        {/* Break-even Price */}
        <StatCard
          title={cd.breakEvenTitle}
          value={`₹${breakEvenPrice.toFixed(0)}${cd.currencyPerKg}`}
          subtitle={cd.breakEvenSub}
          icon={Sparkles}
          variant="amber"
        />
      </div>

      {/* 4. ACTIVE FARM PLOTS SECTION HIGHER UP */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2">
            <Sprout className="w-5 h-5 text-emerald-800" />
            <div>
              <h2 className="text-base font-black text-stone-900">
                {cd.activePlotsTitle}
              </h2>
              <p className="text-xs text-stone-500">{cd.activePlotsSub}</p>
            </div>
          </div>
          <Link to="/farm" className="text-xs font-bold text-emerald-800 hover:underline">
            {cd.allPlotsLink}
          </Link>
        </div>

        {fields.length === 0 ? (
          <div className="p-6 text-center rounded-xl border border-dashed border-stone-300 bg-stone-50 text-stone-500 text-xs space-y-2">
            <p className="font-semibold text-stone-600">
              {language === 'mr' ? 'अद्याप कोणतेही शेत किंवा प्लॉट जोडलेले नाही.' : language === 'hi' ? 'अभी तक कोई प्लॉट नहीं जोड़ा गया।' : 'No farm plots added yet.'}
            </p>
            <Link to="/farm" className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-700 transition">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'नवीन प्लॉट जोडा' : language === 'hi' ? 'नया प्लॉट जोड़ें' : 'Add Farm Plot'}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {fields.map((field) => (
              <div key={field.id} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-stone-900">
                    {field.crop === 'Grapes' ? '🍇' : '❤️'} {field.name} — {field.acres} {cd.acres.split(' ')[1] || 'Acres'}
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-800 text-white font-bold rounded-full text-[10px]">
                    {field.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-emerald-900">
                  {field.variety} • {field.currentStage}
                </p>
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 bg-white/70 p-2 rounded-lg border border-emerald-100">
                  <span>💧 {field.irrigationType}</span>
                  <span>🌱 {field.soilType}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. FLAGSHIP FEATURE CARD: "WHERE SHOULD I SELL TODAY?" */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 p-5 sm:p-6 rounded-2xl shadow-xl text-stone-950 space-y-4 border border-amber-300 ring-2 ring-amber-400/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-600/30 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-black text-stone-950 tracking-tight">
                  {cd.whereToSellTitle}
                </h2>
                <span className="px-2 py-0.5 bg-stone-950 text-amber-400 font-black rounded-md text-[10px] uppercase tracking-wider">
                  {cd.whereToSellFlagship}
                </span>
              </div>
              <p className="text-xs font-bold text-amber-950 mt-0.5">
                {selectedCrop === 'Grapes' ? '🍇' : '❤️'} {getCropLabel(selectedCrop)} • {language === 'mr' ? 'अपेक्षित तोडणी:' : language === 'hi' ? 'अनुमानित उत्पादन:' : 'Estimated Yield:'} {effectiveYieldKg.toLocaleString()} {cd.weightUnit}
              </p>
            </div>
          </div>

          <Link
            to="/selling-decision"
            className="px-4 py-2 bg-stone-950 hover:bg-stone-900 text-amber-300 font-black text-xs rounded-xl transition shadow-md flex items-center space-x-1.5 shrink-0"
          >
            <span>{cd.compareOptionsBtn}</span>
          </Link>
        </div>

        {/* Dynamic Channel comparison table grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sellingComparisons.length > 0 ? (
            sellingComparisons.slice(0, 3).map((comp, idx) => (
              <div
                key={comp.id || idx}
                className={`p-3.5 rounded-xl space-y-2 ${comp.isRecommended
                    ? 'bg-white/95 border-2 border-emerald-600 shadow-sm'
                    : 'bg-white/70 border border-amber-300 shadow-2xs'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="font-black text-xs text-stone-900 truncate mr-1">
                    {comp.targetName}
                  </strong>
                  {comp.isRecommended ? (
                    <span className="px-2 py-0.5 bg-emerald-700 text-white font-black rounded-md text-[10px] shrink-0">
                      {cd.recommendedBadge}
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-500 font-bold shrink-0">
                      {comp.targetType}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-stone-500 font-medium">{cd.grossPriceLabel}</span>
                  <span className={`text-sm ${comp.isRecommended ? 'text-emerald-800 font-black' : 'text-stone-800 font-bold'}`}>
                    ₹{comp.offerPricePerKg} {cd.currencyPerKg}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-t border-stone-200 pt-1 text-xs">
                  <span className="font-bold text-stone-700">{cd.netRealizationLabel}</span>
                  <span className={`font-black text-base ${comp.isRecommended ? 'text-emerald-950' : 'text-stone-900'}`}>
                    ₹{comp.estimatedNetRealizationPerKg} {cd.currencyPerKg}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 p-4 bg-white/80 rounded-xl text-center text-xs text-stone-700 font-medium">
              {language === 'mr' ? 'तुलना करण्यासाठी खरेदीदार डेटा लोड होत आहे...' : language === 'hi' ? 'तुलना के लिए खरीदार डेटा लोड हो रहा है...' : 'Loading selling comparisons...'}
            </div>
          )}
        </div>

        {/* Potential Net Revenue Summary Bar */}
        <div className="bg-stone-950 text-white p-3 rounded-xl flex items-center justify-between text-xs">
          <span>{cd.potentialRevSummary}</span>
          <strong className="text-amber-300 font-black text-sm sm:text-base">
            {formatINR(sellingComparisons[0]?.totalEstimatedProfit || expectedRevenue)}
          </strong>
        </div>
      </div>

      {/* 6. STREAMLINED 4 MAIN QUICK ACTION CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Action 1: Add Expense */}
        <button
          type="button"
          onClick={() => setShowExpenseModal(true)}
          className="p-4 rounded-2xl bg-white hover:bg-amber-50/60 border border-stone-200 hover:border-amber-300 text-left transition flex flex-col justify-between space-y-3 group cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:scale-105 transition">
            <PlusCircle className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <strong className="text-xs sm:text-sm font-black text-stone-900 block group-hover:text-amber-900">
              {cd.actAddExpense}
            </strong>
            <span className="text-[11px] text-stone-500 font-medium">{cd.actAddExpenseSub}</span>
          </div>
        </button>

        {/* Action 2: Add Harvest */}
        <button
          type="button"
          onClick={() => setShowHarvestModal(true)}
          className="p-4 rounded-2xl bg-white hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-300 text-left transition flex flex-col justify-between space-y-3 group cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center group-hover:scale-105 transition">
            <Scale className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <strong className="text-xs sm:text-sm font-black text-stone-900 block group-hover:text-emerald-900">
              {cd.actAddHarvest}
            </strong>
            <span className="text-[11px] text-stone-500 font-medium">{cd.actAddHarvestSub}</span>
          </div>
        </button>

        {/* Action 3: Market Prices */}
        <Link
          to="/market"
          className="p-4 rounded-2xl bg-white hover:bg-blue-50/60 border border-stone-200 hover:border-blue-300 text-left transition flex flex-col justify-between space-y-3 group cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center group-hover:scale-105 transition">
            <TrendingUp className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <strong className="text-xs sm:text-sm font-black text-stone-900 block group-hover:text-blue-900">
              {cd.actMarketPrice}
            </strong>
            <span className="text-[11px] text-stone-500 font-medium">{cd.actMarketPriceSub}</span>
          </div>
        </Link>

        {/* Action 4: Where Should I Sell? */}
        <Link
          to="/selling-decision"
          className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-300 text-left transition flex flex-col justify-between space-y-3 group cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center group-hover:scale-105 transition font-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-xs sm:text-sm font-black text-amber-950 block">
              {cd.actWhereToSell}
            </strong>
            <span className="text-[11px] text-amber-900 font-bold">{cd.actWhereToSellSub}</span>
          </div>
        </Link>
      </div>

      {/* 7. MAIN 2-COLUMN BALANCED DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Market Trends + Live Profit Simulator */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: APMC Mandi Price Trends */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base sm:text-lg font-black text-stone-900">
                    {cd.mandiTitle}
                  </h2>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    {cd.mandiLive}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {cd.mandiSub}
                </p>
              </div>

              <Link
                to="/market"
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition self-start sm:self-auto"
              >
                {cd.allMarketsLink}
              </Link>
            </div>

            <PriceLineChart crop={selectedCrop} />
          </div>

          {/* Card 2: Live Profit Calculator / Simulator */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-stone-900">
                    {cd.calculatorTitle}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {cd.calculatorSub}
                  </p>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${simMargin >= 30
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : simMargin >= 10
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-rose-100 text-rose-900 border border-rose-200'
                  }`}
              >
                {simMargin >= 30 ? cd.marginHigh : simMargin >= 10 ? cd.marginMid : cd.marginLow}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Sliders Area (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                {/* Yield Slider */}
                <div className="space-y-1.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-700 font-bold">{cd.yieldLabel}</span>
                    <span className="text-sm font-black text-emerald-800">{simYieldKg.toLocaleString()} {cd.weightUnit}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="100"
                    value={simYieldKg}
                    onChange={(e) => setSimYieldKg(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                  />
                </div>

                {/* Price Slider */}
                <div className="space-y-1.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-700 font-bold">{cd.rateLabel}</span>
                    <span className="text-sm font-black text-emerald-800">₹{simRatePerKg} {cd.currencyPerKg}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="2"
                    value={simRatePerKg}
                    onChange={(e) => setSimRatePerKg(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                  />
                </div>
              </div>

              {/* Output Box (5 cols) */}
              <div className="md:col-span-5 bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-center space-y-2">
                <span className="text-[11px] font-bold text-emerald-900 block">
                  {cd.calcNetLabel}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-900">
                  {formatINR(Math.max(0, simProfit))}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200 text-xs text-stone-600">
                  <div>
                    <span className="block text-[10px] text-stone-500">{cd.calcRevLabel}</span>
                    <strong className="text-stone-900 font-bold">{formatINR(simRevenue)}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-500">{cd.calcMarginLabel}</span>
                    <strong className="text-emerald-800 font-bold">{simMargin}%</strong>
                  </div>
                </div>

                <Link
                  to="/selling-decision"
                  className="w-full py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 shadow-2xs mt-2"
                >
                  <span>{cd.calcCta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Weather + Top Buyer + 1-Tap Quick Expense */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: SIMPLIFIED WEATHER CARD */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <CloudSun className="w-5 h-5 text-amber-600" />
                <h2 className="font-black text-sm text-stone-900">{cd.weatherTitle}</h2>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {farmer.district}
              </span>
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl text-xs font-bold text-stone-700">
              <div>🌡️ {weatherData ? `${weatherData.temperature}°C` : '29°C'}</div>
              <div>💧 {language === 'mr' ? 'आर्द्रता ६०%' : language === 'hi' ? 'नमी 60%' : 'Humidity 60%'}</div>
              <div>🌬️ {weatherData ? `${weatherData.windSpeedKmH} km/h` : '12 km/h'}</div>
              <div>🌧️ {language === 'mr' ? 'पाऊस: ०%' : language === 'hi' ? 'बारिश: 0%' : 'Rain: 0%'}</div>
            </div>

            {/* Live Weather Advisory Note */}
            <div className={`p-3 rounded-xl border text-xs space-y-1 ${weatherData?.isSpraySuitable ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'}`}>
              <strong className="font-black block text-emerald-900">
                {weatherData?.isSpraySuitable
                  ? (language === 'mr' ? '🟢 फवारणी सल्ला:' : language === 'hi' ? '🟢 छिड़काव सलाह:' : '🟢 Spray Advisory:')
                  : (language === 'mr' ? '⚠️ हवामान सावधगिरी:' : language === 'hi' ? '⚠️ मौसम चेतावनी:' : '⚠️ Weather Alert:')
                }
              </strong>
              <p className="leading-snug text-stone-700 font-medium">
                {weatherData?.sprayRecommendation || cd.weatherNoteBody}
              </p>
            </div>
          </div>

          {/* Card 2: TOP BUYER */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div>
                <h2 className="font-black text-sm text-stone-900 flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-emerald-800" />
                  <span>{cd.bestBuyerTitle}</span>
                </h2>
                <p className="text-[11px] text-stone-500">{cd.bestBuyerSub}</p>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold text-[10px] rounded-full">
                {cd.bestBuyerVerified}
              </span>
            </div>

            {bestBuyer ? (
              <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-black text-stone-900">{bestBuyer.companyName || bestBuyer.name}</strong>
                  <span className="text-sm font-black text-emerald-800">💰 ₹{bestBuyer.offerPricePerKg} {cd.currencyPerKg}</span>
                </div>

                <div className="text-xs text-stone-600 space-y-0.5">
                  <p>📍 {bestBuyer.location} ({bestBuyer.distanceKm} km) • {bestBuyer.pickupAvailable ? (language === 'mr' ? '🚚 मोफत वाहतूक' : language === 'hi' ? '🚚 मुफ्त परिवहन' : '🚚 Free Pickup') : ''}</p>
                  <p>💳 {bestBuyer.paymentTerms}</p>
                </div>

                {/* Net Realization Highlight */}
                <div className="pt-2 border-t border-emerald-200/90 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">{cd.bestBuyerNetLabel}</span>
                  <span className="text-sm font-black text-emerald-950 bg-emerald-200/60 px-2 py-0.5 rounded-lg border border-emerald-300">
                    ₹{bestBuyer.offerPricePerKg - 6} {cd.currencyPerKg}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500 text-center">
                {language === 'mr' ? 'सध्या कोणताही खरेदीदार उपलब्ध नाही' : language === 'hi' ? 'वर्तमान में कोई खरीदार उपलब्ध नहीं' : 'No buyers available'}
              </div>
            )}

            <Link
              to="/buyers"
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>{cd.compareBuyersBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: QUICK EXPENSE ADD CARD */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                <h2 className="font-black text-sm text-stone-900">{cd.quickExpenseTitle}</h2>
              </div>

              <button
                type="button"
                onClick={handleVoiceListen}
                className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                title="Voice Log"
              >
                <Mic className="w-3.5 h-3.5 text-amber-800" />
                <span>{cd.voiceBtn}</span>
              </button>
            </div>

            {voiceText && (
              <p className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 animate-pulse">
                🎤 "{voiceText}"
              </p>
            )}

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickAddExpense('Diesel', 500)}
                className="w-full p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-950 font-bold text-xs border border-stone-200 hover:border-amber-300 transition flex items-center justify-between cursor-pointer"
              >
                <span>{cd.quickDiesel}</span>
                <span className="font-black text-amber-800">+ ₹500</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickAddExpense('Labour', 1200)}
                className="w-full p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-950 font-bold text-xs border border-stone-200 hover:border-amber-300 transition flex items-center justify-between cursor-pointer"
              >
                <span>{cd.quickLabour}</span>
                <span className="font-black text-amber-800">+ ₹1,200</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickAddExpense('Fertilizer', 3500)}
                className="w-full p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-950 font-bold text-xs border border-stone-200 hover:border-amber-300 transition flex items-center justify-between cursor-pointer"
              >
                <span>{cd.quickFertilizer}</span>
                <span className="font-black text-amber-800">+ ₹3,500</span>
              </button>
            </div>

            {/* + Add Other Expense Button */}
            <button
              type="button"
              onClick={() => setShowExpenseModal(true)}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl border border-stone-300 transition flex items-center justify-center space-x-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-stone-600" />
              <span>{cd.addOtherExpenseBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expense Modal */}
      {showExpenseModal && (
        <Modal
          isOpen={showExpenseModal}
          onClose={() => setShowExpenseModal(false)}
          title={cd.modalAddExpense}
        >
          <ExpenseForm
            onSuccess={() => {
              setShowExpenseModal(false);
              triggerToast(cd.toastExpenseSaved);
            }}
            onCancel={() => setShowExpenseModal(false)}
          />
        </Modal>
      )}

      {/* Harvest Modal */}
      {showHarvestModal && (
        <Modal
          isOpen={showHarvestModal}
          onClose={() => setShowHarvestModal(false)}
          title={cd.modalLogHarvest}
        >
          <HarvestForm
            onSuccess={() => {
              setShowHarvestModal(false);
              triggerToast(cd.toastHarvestLogged);
            }}
            onCancel={() => setShowHarvestModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
function triggerToast(arg0: string) {
  throw new Error('Function not implemented.');
}

