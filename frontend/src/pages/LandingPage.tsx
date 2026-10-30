import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/layout/AppHeader';
import { Footer } from '../components/layout/Footer';
import { IMAGES } from '../images/images';
import { useLanguage } from '../context/LanguageContext';
import { CropType } from '../types';
import { 
  Sprout, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Building2, 
  Bot, 
  Users2, 
  Store,
  PhoneCall,
  MessageCircle,
  CloudSun,
  AlertTriangle,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  // Interactive Crop Toggle (Grapes vs Pomegranate)
  const [selectedCrop, setSelectedCrop] = useState<CropType>('Grapes');

  // Interactive Local Market District Toggle
  const [selectedDistrict, setSelectedDistrict] = useState<'Nashik' | 'Sangli' | 'Solapur' | 'Pune'>('Nashik');

  const content = {
    mr: {
      stripRegion: '📍 महाराष्ट्र | 🍇 द्राक्ष | ❤️ डाळिंब',
      cropPrompt: 'तुमचे मुख्य पीक कोणते? (Select Crop):',
      grapes: '🍇 द्राक्ष (Grapes)',
      pomegranate: '❤️ डाळिंब (Pomegranate)',
      heroTitle: 'तुमच्या शेतीचा खर्च जाणून घ्या,',
      heroTitleHighlight: 'योग्य भाव शोधा आणि जास्त नफा मिळवा.',
      heroSubtitle: `${selectedCrop === 'Pomegranate' ? 'डाळिंब' : 'द्राक्ष'} आणि फळबाग शेतकऱ्यांसाठी महाराष्ट्रातील शेती व बाजार माहिती एकाच ठिकाणी.`,
      corePrompt: '🌱 माझ्या शेतीचा खरा नफा किती?',
      flowCost: 'खर्च पाहा',
      flowMandi: 'बाजारभाव तपासा',
      flowBuyer: 'Buyer तुलना करा',
      flowSell: 'योग्य ठिकाणी विक्री करा',
      step1Title: 'खर्च नोंदवा',
      step1Desc: 'Labour • खत • फवारणी • पाणी',
      step2Title: 'भाव व Buyer तुलना',
      step2Desc: 'Market • Buyer • Transport',
      step3Title: 'कुठे जास्त मिळेल पहा',
      step3Desc: 'Estimated Net Realization',
      ctaStart: 'नवीन शेतकरी नोंदणी करा (Free Register)',
      ctaMarket: 'आजचे बाजारभाव पहा',
      helplineText: '📞 शेतकरी मदत: १८००-१२३-४५६७',
      helplineTiming: 'सकाळी ८ ते रात्री ८ मोफत मार्गदर्शन',
      briefTitle: 'आजची शेती माहिती (Live Farm Brief)',
      briefLocation: selectedCrop === 'Pomegranate' ? 'सांगोला, सोलापूर' : 'दिंडोरी, नाशिक',
      briefSeason: 'चालू हंगाम',
      briefMandiLabel: 'आजचा बाजारभाव (Mandi)',
      briefMandiPrice: selectedCrop === 'Pomegranate' ? '₹१४२/kg' : '₹१०२/kg',
      briefMandiTrend: '+₹४.५० वाढ',
      briefBuyerLabel: 'Best Buyer Offer',
      briefBuyerPrice: selectedCrop === 'Pomegranate' ? '₹१४८/kg' : '₹१०६/kg',
      briefBuyerNote: 'शेतावरून उचल',
      briefNetLabel: 'खरा निव्वळ भाव (Net)',
      briefNetPrice: selectedCrop === 'Pomegranate' ? '₹१४५/kg' : '₹१००/kg',
      briefNetNote: 'वाहतूक वजा',
      briefProfitLabel: 'अंदाजित नफा (Profit)',
      briefProfitPrice: '₹१,०५,०००',
      briefProfitMargin: '+६५% मार्जिन',
      briefDecisionCta: '⭐ विक्री निर्णय तपासा (Selling Decision) →',
      toolsBadge: 'शेतकरी सेवा (Farmer Tools)',
      toolsTitle: 'आज तुम्हाला कशाची माहिती हवी आहे?',
      toolsSubtitle: 'तुमच्या शेतीसाठी खालील पर्यायावर १ क्लिक करा',
      card1Title: '१. 🍇 आजचे बाजारभाव',
      card1Desc: 'पिंपळगाव, तासगाव, नाशिक, पुणे आणि सोलापूर बाजार समित्यांमधील द्राक्ष व डाळिंबाचे आजचे ताजे दर.',
      card1Btn: 'भाव तपासा',
      card2Badge: 'प्रमुख सोय',
      card2Title: '२. ⭐ कुठे विकल्यावर जास्त मिळेल?',
      card2Desc: 'गाडीभाडे व हम्माली वजा करून बाजारात माल पाठवणे फायद्याचे की थेट शेतावरून विकणे? एका सेकंदात तपासा.',
      card2Btn: 'खरेदीदार व बाजार तुलना करा',
      card3Title: '३. 👨‍🌾 जवळचे खरेदीदार',
      card3Desc: 'शेतावरून थेट माल उचलणारे पडताळणी झालेले व्यापारी, एक्सपोर्टर्स आणि थेट वजन-पेमेंट देणाऱ्या कंपन्या.',
      card3Btn: 'व्यापारी शोधा',
      card4Title: '४. 🌱 खते व इनपुटचे भाव',
      card4Desc: 'रासायनिक खते, सूक्ष्म अन्नद्रव्ये आणि मान्यताप्राप्त कृषी सेवा केंद्रांमधील चालू स्टॉक व भाव.',
      card4Btn: 'दुकाने पहा',
      card5Title: '५. 👷 मजूर व शेती सेवा',
      card5Desc: 'द्राक्ष छाटणी, घड विरळणी, डिपिंग आणि डाळिंब बॅगिंगसाठी कुशल टोळ्यांचे संपर्क व पारदर्शक दर.',
      card5Btn: 'टोळी शोधा',
      card6Title: '६. 🤖 AI शेतमित्र',
      card6Desc: 'द्राक्ष मणी गळ, डाऊनी, खतांचे डोस आणि बाजार भावाबद्दल मराठीत प्रश्न विचारा व सल्ला मिळवा.',
      card6Btn: 'प्रश्न विचारा',
      spotlightBadge: '⭐ प्रमुख फिचर (Flagship Tool)',
      spotlightTitle: selectedCrop === 'Pomegranate' ? '❤️ आज डाळिंब कुठे विकावे?' : '🍇 आज द्राक्ष कुठे विकावे?',
      spotlightSubtitle: 'तुमच्याकडे उपलब्ध माल: २,५०० किलो • वाहतूक, हम्माली व सेस वजा करून खरा निव्वळ भाव',
      spotlightBtn: 'माझ्या बागेची तुलना करा →',
      tableThChannel: 'विक्री पर्याय (Channel)',
      tableThOffer: 'खरेदीदार भाव',
      tableThDeduction: 'वाहतूक व खर्च',
      tableThNet: 'अंदाजे निव्वळ भाव',
      tableRow1Name: '१. थेट शेतावर खरेदीदार (सह्याद्री फार्म्स)',
      tableRow1Offer: '₹१०६/kg',
      tableRow1Cost: '₹० (मोफत उचल)',
      tableRow1Net: '₹१०६/kg',
      tableRow2Name: '२. मुख्य APMC बाजार समिती (पिंपळगाव)',
      tableRow2Offer: '₹१०२/kg',
      tableRow2Cost: '- ₹६/kg (गाडीभाडे+सेस)',
      tableRow2Net: '₹९६/kg',
      tableRow3Name: '३. लांबचे कोल्ड स्टोरेज / हब (नवी मुंबई)',
      tableRow3Offer: '₹११०/kg',
      tableRow3Cost: '- ₹१६/kg (वाहतूक+हम्माली)',
      tableRow3Net: '₹९४/kg',
      verdictText: '🟢 सध्याच्या माहितीनुसार थेट शेतावरील खरेदीदार हा सर्वोत्तम पर्याय',
      verdictDetail: 'अंदाजे निव्वळ मिळकत: ₹२,६५,००० (बाजारात पाठवण्यापेक्षा जागेवर ₹२५,००० जास्त फायदा)',
      verdictDisclaimer: '*अंदाज उपलब्ध माहितीनुसार आहे. अंतिम भाव/खर्च बदलू शकतो.',
      formulaBadge: 'पारदर्शक हिशोब (Profit Formula)',
      formulaTitle: 'तुमचा खरा नफा कसा मोजला जातो?',
      formulaSubtitle: 'फक्त विक्री भाव नाही, तर उत्पादन खर्च वजा केल्यावर मिळणारा खरा नफा',
      formulaStep1Name: '१. शेती खर्च',
      formulaStep1Formula: 'खते + मजुरी + फवारणी',
      formulaStep1Value: '₹२,४०,००० (एकूण खर्च)',
      formulaStep2Name: '२. एकूण उत्पन्न',
      formulaStep2Formula: 'उत्पादन × विक्री भाव',
      formulaStep2Value: '₹३,४५,००० (महसूल)',
      formulaStep3Name: '३. खरा निव्वळ नफा',
      formulaStep3Formula: '🚜 TRUE PROFIT',
      formulaStep3Value: '₹१,०५,००० निव्वळ नफा',
      formulaNote: 'शेतीमित्रावर नियमित खर्च लिहिल्याने तुमचा प्रति किलो उत्पादन खर्च (Break-even Price) स्पष्ट समजतो.',
      formulaCta: 'नफा कॅल्क्युलेटर पहा →',
      ratesBadge: 'थेट मंडी अपडेट',
      ratesTitle: 'आजचे बाजारभाव (Live Rates)',
      nearbyPrompt: 'माझ्या जवळचे बाजार:',
      mandi1Name: 'पिंपळगाव (नाशिक)',
      mandi2Name: 'तासगाव (सांगली)',
      mandi3Name: 'सोलापूर मंडी',
      mandi4Name: 'पुणे (गुलटेकडी)',
      viewAllRates: 'सर्व बाजारभाव पहा →',
      weatherTitle: 'आजचे हवामान व शेती सूचना (Weather & Advisory)',
      weatherBelt: 'नाशिक, सांगली, सोलापूर पट्टा',
      weatherRain: '🌧️ पावसाची शक्यता',
      weatherHumidity: '💧 आर्द्रता (Humidity)',
      weatherWind: '🌬️ वाऱ्याचा वेग',
      weatherTemp: '🌡️ सरासरी तापमान',
      weatherAdvisory: 'आज हवामानात वाऱ्याचा वेग मर्यादित असल्याने सकाळच्या सत्रात फवारणीस अनुकूल स्थिती आहे. तथापि फवारणीचे अंतिम नियोजन करण्यापूर्वी स्थानिक कृषी तज्ज्ञांचा सल्ला घ्या.',
      howItWorksBadge: 'कार्यपद्धती',
      howItWorksTitle: 'ShetiMitra कसे काम करते?',
      howItWorksSubtitle: '३ सोप्या टप्प्यांत योग्य आर्थिक निर्णय घ्या',
      howStep1Num: '०१',
      howStep1Title: 'तुमच्या शेतीची माहिती भरा',
      howStep1Desc: 'पीक (द्राक्ष / डाळिंब), क्षेत्र, मजुरी व खतांचा खर्च नोंदवा.',
      howStep2Num: '०२',
      howStep2Title: 'बाजार आणि Buyer तुलना करा',
      howStep2Desc: 'APMC मंडीचे भाव आणि थेट शेतावरून उचलणाऱ्या व्यापाऱ्यांची तुलना करा.',
      howStep3Num: '०३',
      howStep3Title: 'योग्य विक्रीचा निर्णय घ्या',
      howStep3Desc: 'खरा निव्वळ भाव आणि नफा तपासून योग्य ठिकाणी माल विका.',
      testimonialsBadge: 'शेतकऱ्यांचा अनुभव — नमुना प्रात्यक्षिक (Demo Stories)',
      testimonialsTitle: 'शेतकऱ्यांचा अनुभव',
      aiTitle: '🤖 AI शेतमित्र',
      aiSubtitle: 'तुमच्या शेतीबद्दल काहीही मराठीत विचारा. मणी मऊ पडणे, फवारणी डोस किंवा बाजारभाव.',
      aiCta: 'शेतीमित्राला प्रश्न विचारा →',
      helpTitle: '📞 शेतकरी मदत (मदत हवी आहे?)',
      helpSubtitle: 'सकाळी ८ ते रात्री ८ मोफत शेतकरी हेल्पलाइन',
      whatsappBtn: 'व्हॉट्सॲप मदत',
    },
    hi: {
      stripRegion: '📍 महाराष्ट्र | 🍇 अंगूर | ❤️ अनार',
      cropPrompt: 'आपकी मुख्य फसल कौन सी है? (Select Crop):',
      grapes: '🍇 अंगूर (Grapes)',
      pomegranate: '❤️ अनार (Pomegranate)',
      heroTitle: 'अपनी खेती की लागत जानें,',
      heroTitleHighlight: 'सही भाव खोजें और अधिक मुनाफा कमाएं।',
      heroSubtitle: `${selectedCrop === 'Pomegranate' ? 'अनार' : 'अंगूर'} और बागवानी किसानों के लिए महाराष्ट्र की कृषि व मंडी जानकारी एक ही जगह।`,
      corePrompt: '🌱 मेरी खेती का असली मुनाफा कितना?',
      flowCost: 'लागत देखें',
      flowMandi: 'मंडी भाव जांचें',
      flowBuyer: 'Buyer तुलना करें',
      flowSell: 'सही जगह बेचें',
      step1Title: 'लागत दर्ज करें',
      step1Desc: 'Labour • खाद • कीटनाशक • पानी',
      step2Title: 'भाव व Buyer तुलना',
      step2Desc: 'Market • Buyer • Transport',
      step3Title: 'कहाँ अधिक मिलेगा देखें',
      step3Desc: 'Estimated Net Realization',
      ctaStart: 'नया किसान पंजीकरण करें (Free Register)',
      ctaMarket: 'आज के मंडी भाव देखें',
      helplineText: '📞 किसान सहायता: १८००-१२३-४५६७',
      helplineTiming: 'सुबह ८ से रात ८ मुफ्त मार्गदर्शन',
      briefTitle: 'आज की खेती जानकारी (Live Farm Brief)',
      briefLocation: selectedCrop === 'Pomegranate' ? 'सांगोला, सोलापूर' : 'दिंडोरी, नासिक',
      briefSeason: 'वर्तमान सीजन',
      briefMandiLabel: 'आज का मंडी भाव (Mandi)',
      briefMandiPrice: selectedCrop === 'Pomegranate' ? '₹१४२/kg' : '₹१०२/kg',
      briefMandiTrend: '+₹४.५० बढ़ोतरी',
      briefBuyerLabel: 'Best Buyer Offer',
      briefBuyerPrice: selectedCrop === 'Pomegranate' ? '₹१४८/kg' : '₹१०६/kg',
      briefBuyerNote: 'खेत से उठान',
      briefNetLabel: 'असली शुद्ध भाव (Net)',
      briefNetPrice: selectedCrop === 'Pomegranate' ? '₹१४५/kg' : '₹१००/kg',
      briefNetNote: 'परिवहन घटाकर',
      briefProfitLabel: 'अनुमानित मुनाफा (Profit)',
      briefProfitPrice: '₹१,०५,०००',
      briefProfitMargin: '+६५% मार्जिन',
      briefDecisionCta: '⭐ बिक्री निर्णय जांचें (Selling Decision) →',
      toolsBadge: 'किसान सेवाएं (Farmer Tools)',
      toolsTitle: 'आज आपको किस जानकारी की जरूरत है?',
      toolsSubtitle: 'अपनी खेती के लिए नीचे दिए गए विकल्प पर १ क्लिक करें',
      card1Title: '१. 🍇 आज के मंडी भाव',
      card1Desc: 'पिंपलगांव, तासगांव, नासिक, पुणे और सोलापुर मंडियों में अंगूर व अनार के आज के ताजे दर।',
      card1Btn: 'भाव देखें',
      card2Badge: 'मुख्य सुविधा',
      card2Title: '२. ⭐ कहाँ बेचने पर ज्यादा मिलेगा?',
      card2Desc: 'गाड़ी भाड़ा व हमाली घटाकर मंडी में माल भेजना बेहतर है या सीधे खेत से बेचना? १ सेकंड में जांचें।',
      card2Btn: 'खरीदार व मंडी तुलना करें',
      card3Title: '३. 👨‍🌾 पास के खरीदार',
      card3Desc: 'खेत से सीधे माल उठाने वाले सत्यापित व्यापारी, एक्सपोर्टर्स और सीधे वजन-पेमेंट देने वाली कंपनियां।',
      card3Btn: 'खरीदार खोजें',
      card4Title: '४. 🌱 खाद व कीटनाशक दरें',
      card4Desc: 'उर्वरक, सूक्ष्म पोषक तत्व और मान्यता प्राप्त कृषि सेवा केंद्रों में उपलब्ध स्टॉक व दरें।',
      card4Btn: 'दुकानें देखें',
      card5Title: '५. 👷 श्रमिक व सेवाएं',
      card5Desc: 'अंगूर कटाई, छंटाई, डिपिंग और अनार बैगिंग के लिए कुशल लेबर टीम के संपर्क व पारदर्शी दरें।',
      card5Btn: 'श्रमिक खोजें',
      card6Title: '६. 🤖 AI शेतमित्र',
      card6Desc: 'अंगूर फूल/फल सेटिंग, डाउनी, खाद डोज और मंडी भाव के बारे में हिंदी में प्रश्न पूछें।',
      card6Btn: 'प्रश्न पूछें',
      spotlightBadge: '⭐ मुख्य फीचर (Flagship Tool)',
      spotlightTitle: selectedCrop === 'Pomegranate' ? '❤️ आज अनार कहाँ बेचें?' : '🍇 आज अंगूर कहाँ बेचें?',
      spotlightSubtitle: 'उपलब्ध माल: २,५०० किलो • परिवहन, हमाली व सेस घटाकर असली शुद्ध भाव',
      spotlightBtn: 'मेरे खेत की तुलना करें →',
      tableThChannel: 'बिक्री विकल्प (Channel)',
      tableThOffer: 'खरीदार भाव',
      tableThDeduction: 'परिवहन व खर्च',
      tableThNet: 'अनुमानित शुद्ध भाव',
      tableRow1Name: '१. सीधे खेत पर खरीदार (सह्याद्री फार्म्स)',
      tableRow1Offer: '₹१०६/kg',
      tableRow1Cost: '₹० (मुफ्त उठान)',
      tableRow1Net: '₹१०६/kg',
      tableRow2Name: '२. मुख्य APMC मंडी (पिंपलगांव)',
      tableRow2Offer: '₹१०२/kg',
      tableRow2Cost: '- ₹६/kg (गाड़ीभाड़ा+सेस)',
      tableRow2Net: '₹९६/kg',
      tableRow3Name: '३. दूर का कोल्ड स्टोरेज / हब (नवी मुंबई)',
      tableRow3Offer: '₹११०/kg',
      tableRow3Cost: '- ₹१६/kg (परिवहन+हमाली)',
      tableRow3Net: '₹९४/kg',
      verdictText: '🟢 उपलब्ध जानकारी के अनुसार सीधे खेत पर खरीदार सबसे अच्छा विकल्प',
      verdictDetail: 'अनुमानित शुद्ध आय: ₹२,६५,००० (मंडी में भेजने से ₹२५,००० अधिक लाभ)',
      verdictDisclaimer: '*अनुमान उपलब्ध जानकारी पर आधारित है। अंतिम भाव/लागत बदल सकती है।',
      formulaBadge: 'पारदर्शी गणना (Profit Formula)',
      formulaTitle: 'आपका असली मुनाफा कैसे गिना जाता है?',
      formulaSubtitle: 'केवल बिक्री भाव नहीं, बल्कि उत्पादन लागत घटाने के बाद मिलने वाला शुद्ध मुनाफा',
      formulaStep1Name: '१. खेती लागत',
      formulaStep1Formula: 'खाद + मजदूरी + छिड़काव',
      formulaStep1Value: '₹२,४०,००० (कुल लागत)',
      formulaStep2Name: '२. कुल आय (महसूल)',
      formulaStep2Formula: 'उत्पादन × बिक्री भाव',
      formulaStep2Value: '₹३,४५,००० (राजस्व)',
      formulaStep3Name: '३. असली शुद्ध मुनाफा',
      formulaStep3Formula: '🚜 TRUE PROFIT',
      formulaStep3Value: '₹१,०५,००० शुद्ध मुनाफा',
      formulaNote: 'शेतीमित्र पर नियमित खर्च लिखने से आपकी प्रति किलो उत्पादन लागत (Break-even Price) स्पष्ट समझ आती है।',
      formulaCta: 'मुनाफा कैलकुलेटर देखें →',
      ratesBadge: 'लाइव मंडी अपडेट',
      ratesTitle: 'आज के मंडी भाव (Live Rates)',
      nearbyPrompt: 'मेरे पास की मंडियां:',
      mandi1Name: 'पिंपलगांव (नासिक)',
      mandi2Name: 'तासगांव (सांगली)',
      mandi3Name: 'सोलापुर मंडी',
      mandi4Name: 'पुणे (गुलटेकड़ी)',
      viewAllRates: 'सभी मंडी भाव देखें →',
      weatherTitle: 'आज का मौसम व कृषि सलाह (Weather & Advisory)',
      weatherBelt: 'नासिक, सांगली, सोलापुर क्षेत्र',
      weatherRain: '🌧️ बारिश की संभावना',
      weatherHumidity: '💧 आर्द्रता (Humidity)',
      weatherWind: '🌬️ हवा की गति',
      weatherTemp: '🌡️ औसत तापमान',
      weatherAdvisory: 'आज हवा की गति सामान्य होने के कारण सुबह के समय छिड़काव के लिए अनुकूल स्थिति है। फिर भी अंतिम योजना बनाने से पहले स्थानीय कृषि विशेषज्ञ से सलाह लें।',
      howItWorksBadge: 'कार्यप्रणाली',
      howItWorksTitle: 'ShetiMitra कैसे काम करता है?',
      howItWorksSubtitle: '३ आसान चरणों में सही आर्थिक निर्णय लें',
      howStep1Num: '०१',
      howStep1Title: 'अपनी खेती की जानकारी भरें',
      howStep1Desc: 'फसल (अंगूर / अनार), रकबा, मजदूरी व खाद की लागत दर्ज करें।',
      howStep2Num: '०२',
      howStep2Title: 'मंडी और Buyer तुलना करें',
      howStep2Desc: 'APMC मंडी के भाव और सीधे खेत से उठाने वाले व्यापारियों की तुलना करें।',
      howStep3Num: '०३',
      howStep3Title: 'सही बिक्री का फैसला लें',
      howStep3Desc: 'असली शुद्ध भाव और मुनाफा देखकर सबसे सही जगह माल बेचें।',
      testimonialsBadge: 'किसानों का अनुभव — नमूना प्रदर्शन (Demo Stories)',
      testimonialsTitle: 'किसानों का अनुभव',
      aiTitle: '🤖 AI शेतमित्र',
      aiSubtitle: 'अपनी खेती के बारे में हिंदी में कुछ भी पूछें। स्प्रे डोज, फल सेटिंग या मंडी भाव।',
      aiCta: 'शेतमित्र से प्रश्न पूछें →',
      helpTitle: '📞 किसान सहायता (मदद चाहिए?)',
      helpSubtitle: 'सुबह ८ से रात ८ मुफ्त किसान हेल्पलाइन',
      whatsappBtn: 'व्हाट्सएप सहायता',
    },
    en: {
      stripRegion: '📍 Maharashtra | 🍇 Grapes | ❤️ Pomegranate',
      cropPrompt: 'What is your primary crop? (Select Crop):',
      grapes: '🍇 Grapes',
      pomegranate: '❤️ Pomegranate',
      heroTitle: 'Know Your Farm Cost,',
      heroTitleHighlight: 'Find the Best Rates, and Maximize Profit.',
      heroSubtitle: `Comprehensive farm economics & live market intelligence for ${selectedCrop} growers in Maharashtra.`,
      corePrompt: '🌱 What is my true crop profit?',
      flowCost: 'Check Cost',
      flowMandi: 'Compare Mandis',
      flowBuyer: 'Compare Buyers',
      flowSell: 'Sell at the Right Channel',
      step1Title: 'Record Expenses',
      step1Desc: 'Labour • Fertilizer • Spray • Irrigation',
      step2Title: 'Compare Rates & Buyers',
      step2Desc: 'Market • Buyer • Transport',
      step3Title: 'Find Highest Net Realization',
      step3Desc: 'Estimated Net Realization',
      ctaStart: 'Register Farm Free (Start Now)',
      ctaMarket: "View Today's Mandi Rates",
      helplineText: '📞 Farmer Support: 1800-123-4567',
      helplineTiming: '8 AM to 8 PM Free Agronomist Helpline',
      briefTitle: 'Live Farm Brief',
      briefLocation: selectedCrop === 'Pomegranate' ? 'Sangola, Solapur' : 'Dindori, Nashik',
      briefSeason: 'Active Season',
      briefMandiLabel: 'Mandi Rate (APMC)',
      briefMandiPrice: selectedCrop === 'Pomegranate' ? '₹142/kg' : '₹102/kg',
      briefMandiTrend: '+₹4.50 Increase',
      briefBuyerLabel: 'Best Buyer Offer',
      briefBuyerPrice: selectedCrop === 'Pomegranate' ? '₹148/kg' : '₹106/kg',
      briefBuyerNote: 'Farm-Gate Pickup',
      briefNetLabel: 'True Net Realization',
      briefNetPrice: selectedCrop === 'Pomegranate' ? '₹145/kg' : '₹100/kg',
      briefNetNote: 'After Transport',
      briefProfitLabel: 'Est. Net Profit',
      briefProfitPrice: '₹1,05,000',
      briefProfitMargin: '+65% Margin',
      briefDecisionCta: '⭐ Run Selling Decision Engine →',
      toolsBadge: 'Farmer Tools & Services',
      toolsTitle: 'What are you looking for today?',
      toolsSubtitle: 'Click any tool below for instant insights',
      card1Title: "1. 🍇 Today's Mandi Rates",
      card1Desc: 'Live APMC rates across Pimpalgaon, Tasgaon, Nashik, Pune and Solapur mandis.',
      card1Btn: 'Check Rates',
      card2Badge: 'Flagship Tool',
      card2Title: '2. ⭐ Where to Sell for Max Profit?',
      card2Desc: 'Compare net realizations after vehicle freight, loading, and mandi cess in seconds.',
      card2Btn: 'Compare Buyers & Mandis',
      card3Title: '3. 👨‍🌾 Verified Direct Buyers',
      card3Desc: 'Direct farm-gate exporters, retail aggregators, and verified payment buyers.',
      card3Btn: 'Find Buyers',
      card4Title: '4. 🌱 Input & Fertilizer Prices',
      card4Desc: 'Authorized agri-input dealers, certified chemical stocks, and price transparency.',
      card4Btn: 'View Dealers',
      card5Title: '5. 👷 Skilled Labour Gangs',
      card5Desc: 'Pruning, thinning, dipping, and bagging labor contractors with transparent rates.',
      card5Btn: 'Find Labour',
      card6Title: '6. 🤖 AI Farm Advisor',
      card6Desc: 'Ask crop health, spray dosages, berry softening care, and price trends in real-time.',
      card6Btn: 'Ask Questions',
      spotlightBadge: '⭐ Flagship Feature',
      spotlightTitle: selectedCrop === 'Pomegranate' ? '❤️ Where Should I Sell Pomegranate Today?' : '🍇 Where Should I Sell Grapes Today?',
      spotlightSubtitle: 'Available Harvest: 2,500 kg • Transparent Net Realization Comparison',
      spotlightBtn: 'Compare My Orchard →',
      tableThChannel: 'Selling Channel',
      tableThOffer: 'Buyer Offer',
      tableThDeduction: 'Transport & Cess',
      tableThNet: 'Estimated Net Realization',
      tableRow1Name: '1. Direct Farm Pickup (Sahyadri Farms)',
      tableRow1Offer: '₹106/kg',
      tableRow1Cost: '₹0 (Free Farm Pickup)',
      tableRow1Net: '₹106/kg',
      tableRow2Name: '2. Main APMC Mandi (Pimpalgaon)',
      tableRow2Offer: '₹102/kg',
      tableRow2Cost: '- ₹6/kg (Freight + Cess)',
      tableRow2Net: '₹96/kg',
      tableRow3Name: '3. Distant Cold Storage Hub (Navi Mumbai)',
      tableRow3Offer: '₹110/kg',
      tableRow3Cost: '- ₹16/kg (Freight + Labour)',
      tableRow3Net: '₹94/kg',
      verdictText: '🟢 Direct Farm-Gate Buyer is currently the optimal selling channel',
      verdictDetail: 'Estimated Net Income: ₹2,65,000 (Saves ₹25,000 in transport vs distant Mandi)',
      verdictDisclaimer: '*Estimates based on current parameters. Actual realization may vary by grading.',
      formulaBadge: 'Transparent Formula',
      formulaTitle: 'How is True Crop Profit Calculated?',
      formulaSubtitle: 'Not just gross selling price, but revenue minus every single input & operational expense',
      formulaStep1Name: '1. Total Farm Cost',
      formulaStep1Formula: 'Fertilizer + Labour + Spray',
      formulaStep1Value: '₹2,40,000 (Total Cost)',
      formulaStep2Name: '2. Gross Revenue',
      formulaStep2Formula: 'Yield (Kg) × Net Price',
      formulaStep2Value: '₹3,45,000 (Revenue)',
      formulaStep3Name: '3. True Net Profit',
      formulaStep3Formula: '🚜 TRUE PROFIT',
      formulaStep3Value: '₹1,05,000 Net Profit',
      formulaNote: 'Recording daily costs on ShetiMitra gives you your exact Break-even Price per kg.',
      formulaCta: 'View Profit Engine →',
      ratesBadge: 'Live APMC Feeds',
      ratesTitle: "Today's Mandi Rates (Live)",
      nearbyPrompt: 'My Local Markets:',
      mandi1Name: 'Pimpalgaon (Nashik)',
      mandi2Name: 'Tasgaon (Sangli)',
      mandi3Name: 'Solapur Mandi',
      mandi4Name: 'Pune (Gultekdi)',
      viewAllRates: 'View All Mandi Rates →',
      weatherTitle: 'Live Farm Weather & Advisory',
      weatherBelt: 'Nashik, Sangli, Solapur Belt',
      weatherRain: '🌧️ Rain Probability',
      weatherHumidity: '💧 Humidity',
      weatherWind: '🌬️ Wind Speed',
      weatherTemp: '🌡️ Average Temp',
      weatherAdvisory: 'Wind conditions are calm in the morning session, suitable for foliar spraying. Please consult local agronomist before final spray execution.',
      howItWorksBadge: 'Workflow',
      howItWorksTitle: 'How ShetiMitra Works',
      howItWorksSubtitle: 'Make confident, profitable selling decisions in 3 easy steps',
      howStep1Num: '01',
      howStep1Title: 'Record Farm Parameters',
      howStep1Desc: 'Enter crop, acreage, labour wages, and fertilizer inputs.',
      howStep2Num: '02',
      howStep2Title: 'Compare Mandis & Buyers',
      howStep2Desc: 'Compare live APMC mandi rates with verified direct farm buyers.',
      howStep3Num: '03',
      howStep3Title: 'Make Smart Selling Decisions',
      howStep3Desc: 'Review net realization, calculate break-even, and maximize profit.',
      testimonialsBadge: 'Farmer Experience — Demo Stories',
      testimonialsTitle: 'Farmer Experience',
      aiTitle: '🤖 AI Farm Advisor',
      aiSubtitle: 'Ask any question about berry softening, fertigation dosages, or live mandi prices.',
      aiCta: 'Ask ShetiMitra →',
      helpTitle: '📞 Farmer Support (Need Help?)',
      helpSubtitle: '8 AM to 8 PM Free Farmer Helpline',
      whatsappBtn: 'WhatsApp Help',
    }
  };

  const c = content[language] || content.mr;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-950 font-sans">
      {/* 1. Top Regional & Language Strip */}
      <div className="bg-emerald-950 text-emerald-100 text-xs px-4 py-2 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-black text-white tracking-wide">🌱 ShetiMitra AI (शेतीमित्र)</span>
            <span className="text-emerald-500">•</span>
            <span>{c.stripRegion}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-stone-300">
              {language === 'mr' ? 'भाषा निवडा:' : language === 'hi' ? 'भाषा चुनें:' : 'Language:'}
            </span>
            <div className="inline-flex rounded-lg bg-emerald-900/80 p-0.5 border border-emerald-800">
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  language === 'mr' ? 'bg-emerald-600 text-white font-black' : 'text-emerald-200 hover:text-white'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  language === 'hi' ? 'bg-emerald-600 text-white font-black' : 'text-emerald-200 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  language === 'en' ? 'bg-emerald-600 text-white font-black' : 'text-emerald-200 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <AppHeader isPublic={true} />

      {/* 2. Hero Section: Farmer-Friendly, Direct Value & Local Language */}
      <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-emerald-50/70 via-stone-50 to-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Crop Selector Switcher on Top of Hero */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm font-black text-stone-700">
              {c.cropPrompt}
            </span>
            <div className="inline-flex rounded-2xl bg-white p-1 border-2 border-emerald-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setSelectedCrop('Grapes')}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center space-x-1.5 ${
                  selectedCrop === 'Grapes'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                <span>{c.grapes}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCrop('Pomegranate')}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center space-x-1.5 ${
                  selectedCrop === 'Pomegranate'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                <span>{c.pomegranate}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Direct Farmer Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Direct Headline */}
              <div className="space-y-2.5">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.2]">
                  {c.heroTitle} <br />
                  <span className="text-emerald-800">{c.heroTitleHighlight}</span>
                </h1>
                <p className="text-sm sm:text-base font-bold text-stone-600">
                  {c.heroSubtitle}
                </p>
              </div>

              {/* Core Proposition Box: Cost -> Market -> Buyer -> Selling -> Profit */}
              <div className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <strong className="text-xs sm:text-sm font-black text-emerald-950">
                    {c.corePrompt}
                  </strong>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 font-bold flex flex-wrap items-center gap-1.5">
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-900">{c.flowCost}</span>
                  <span className="text-stone-400">→</span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-900">{c.flowMandi}</span>
                  <span className="text-stone-400">→</span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-900">{c.flowBuyer}</span>
                  <span className="text-stone-400">→</span>
                  <span className="bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded font-black">{c.flowSell}</span>
                </p>
              </div>

              {/* 3 Action Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-black text-[11px] flex items-center justify-center">1</span>
                    <strong className="text-xs font-bold text-stone-900">{c.step1Title}</strong>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">{c.step1Desc}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-black text-[11px] flex items-center justify-center">2</span>
                    <strong className="text-xs font-bold text-stone-900">{c.step2Title}</strong>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">{c.step2Desc}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-black text-[11px] flex items-center justify-center">3</span>
                    <strong className="text-xs font-bold text-stone-900">{c.step3Title}</strong>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">{c.step3Desc}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/register"
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-black text-sm shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sprout className="w-5 h-5 text-emerald-300" />
                  <span>{c.ctaStart}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 font-black text-sm border-2 border-stone-300 shadow-2xs transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{language === 'mr' ? 'शेतकरी लॉगिन (Login)' : language === 'hi' ? 'किसान लॉगिन (Login)' : 'Farmer Login'}</span>
                </Link>
                
                <Link
                  to="/market"
                  className="px-5 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-sm border border-emerald-200 shadow-2xs transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-800" />
                  <span>{c.ctaMarket}</span>
                </Link>
              </div>

              {/* Farmer Support Direct Line */}
              <div className="flex items-center space-x-3 text-xs text-stone-600 pt-1">
                <a 
                  href="tel:18001234567" 
                  className="inline-flex items-center space-x-1.5 text-emerald-800 font-bold hover:underline"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-700" />
                  <span>{c.helplineText}</span>
                </a>
                <span className="text-stone-300">•</span>
                <span className="text-stone-500">{c.helplineTiming}</span>
              </div>
            </div>

            {/* Right Column: Live Real Phone / Dashboard Preview Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{selectedCrop === 'Pomegranate' ? '❤️' : '🍇'}</span>
                    <div>
                      <h3 className="font-black text-sm text-stone-900">
                        {c.briefTitle}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {c.briefLocation}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-[11px] font-bold rounded-full">
                    {c.briefSeason}
                  </span>
                </div>

                {/* 4 Live Summary Indicators */}
                <div className="grid grid-cols-2 gap-2.5 text-left">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-[10px] text-stone-500 font-semibold block">
                      {c.briefMandiLabel}
                    </span>
                    <span className="text-lg font-black text-stone-900">
                      {c.briefMandiPrice}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block">{c.briefMandiTrend}</span>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-0.5">
                    <span className="text-[10px] text-emerald-800 font-semibold block">
                      {c.briefBuyerLabel}
                    </span>
                    <span className="text-lg font-black text-emerald-900">
                      {c.briefBuyerPrice}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block">{c.briefBuyerNote}</span>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-0.5">
                    <span className="text-[10px] text-amber-800 font-semibold block">
                      {c.briefNetLabel}
                    </span>
                    <span className="text-lg font-black text-amber-950">
                      {c.briefNetPrice}
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium block">{c.briefNetNote}</span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-0.5">
                    <span className="text-[10px] text-stone-500 font-semibold block">
                      {c.briefProfitLabel}
                    </span>
                    <span className="text-lg font-black text-emerald-800">
                      {c.briefProfitPrice}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block">{c.briefProfitMargin}</span>
                  </div>
                </div>

                {/* Direct Action Link in Mockup */}
                <Link
                  to="/selling-decision"
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>{c.briefDecisionCta}</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Section: "आज तुम्हाला कशाची माहिती हवी आहे?" (6 Prioritized Farmer Cards) */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
              {c.toolsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-2">
              {c.toolsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {c.toolsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Card 1: Mandi Rates */}
            <Link
              to="/market"
              className="group p-5 rounded-2xl bg-stone-50 hover:bg-blue-50/70 border-2 border-stone-200 hover:border-blue-300 transition flex flex-col justify-between space-y-4 cursor-pointer shadow-2xs"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-blue-900">
                  {c.card1Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {c.card1Desc}
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-blue-800">
                <span>{c.card1Btn}</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 2: Smart Selling Decision (FLAGSHIP BIG CARD) */}
            <Link
              to="/selling-decision"
              className="group p-5 rounded-2xl bg-emerald-50/90 hover:bg-emerald-100/90 border-2 border-emerald-400 hover:border-emerald-600 transition flex flex-col justify-between space-y-4 cursor-pointer shadow-xs relative overflow-hidden"
            >
              <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-stone-950 font-black text-[10px] rounded-full uppercase tracking-wider shadow-2xs">
                {c.card2Badge}
              </span>
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
                  <Sparkles className="w-6 h-6 text-amber-300" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-emerald-950">
                  {c.card2Title}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {c.card2Desc}
                </p>
              </div>
              <div className="pt-2 border-t border-emerald-300 flex items-center justify-between text-xs font-black text-emerald-950">
                <span>{c.card2Btn}</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 3: Nearby Buyers */}
            <Link
              to="/buyers"
              className="group p-5 rounded-2xl bg-stone-50 hover:bg-emerald-50/70 border-2 border-stone-200 hover:border-emerald-300 transition flex flex-col justify-between space-y-4 cursor-pointer shadow-2xs"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-emerald-900">
                  {c.card3Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {c.card3Desc}
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>{c.card3Btn}</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 4: Input Shops */}
            <Link
              to="/inputs"
              className="group p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/70 border-2 border-stone-200 hover:border-amber-300 transition flex flex-col justify-between space-y-4 cursor-pointer shadow-2xs"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-amber-900">
                  {c.card4Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {c.card4Desc}
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>{c.card4Btn}</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 5: Labour Gangs */}
            <Link
              to="/labour"
              className="group p-5 rounded-2xl bg-stone-50 hover:bg-purple-50/70 border-2 border-stone-200 hover:border-purple-300 transition flex flex-col justify-between space-y-4 cursor-pointer shadow-2xs"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-purple-700 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-purple-900">
                  {c.card5Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {c.card5Desc}
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-purple-800">
                <span>{c.card5Btn}</span>
                <span>→</span>
              </div>
            </Link>

            {/* Card 6: AI ShetiMitra */}
            <Link
              to="/assistant"
              className="group p-5 rounded-2xl bg-stone-50 hover:bg-emerald-50/70 border-2 border-stone-200 hover:border-emerald-300 transition flex flex-col justify-between space-y-4 cursor-pointer shadow-2xs"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
                  <Bot className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-emerald-900">
                  {c.card6Title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {c.card6Desc}
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>{c.card6Btn}</span>
                <span>→</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 4. FLAGSHIP FEATURE SPOTLIGHT: ⭐ आज द्राक्ष / डाळिंब कुठे विकावे? (Selling Decision Engine) */}
      <section className="py-14 bg-gradient-to-b from-stone-50 via-emerald-50/30 to-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">
                    {c.spotlightBadge}
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-stone-900 mt-2">
                  {c.spotlightTitle}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  {c.spotlightSubtitle}
                </p>
              </div>

              <Link
                to="/selling-decision"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition"
              >
                <span>{c.spotlightBtn}</span>
              </Link>
            </div>

            {/* Interactive Selling Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-stone-200 text-stone-600">
                    <th className="py-3 px-3 font-bold">{c.tableThChannel}</th>
                    <th className="py-3 px-3 font-bold text-right">{c.tableThOffer}</th>
                    <th className="py-3 px-3 font-bold text-right">{c.tableThDeduction}</th>
                    <th className="py-3 px-3 font-bold text-right text-emerald-950">{c.tableThNet}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {/* Option 1: Direct Farm Pickup */}
                  <tr className="bg-emerald-50/80 font-bold text-emerald-950">
                    <td className="py-3.5 px-3 flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                      <span>{c.tableRow1Name}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right">{c.tableRow1Offer}</td>
                    <td className="py-3.5 px-3 text-right text-emerald-700 font-bold">{c.tableRow1Cost}</td>
                    <td className="py-3.5 px-3 text-right text-base font-black text-emerald-900">{c.tableRow1Net}</td>
                  </tr>

                  {/* Option 2: Mandi */}
                  <tr className="hover:bg-stone-50">
                    <td className="py-3.5 px-3 flex items-center space-x-2 text-stone-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      <span>{c.tableRow2Name}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right text-stone-700">{c.tableRow2Offer}</td>
                    <td className="py-3.5 px-3 text-right text-rose-600 font-bold">{c.tableRow2Cost}</td>
                    <td className="py-3.5 px-3 text-right text-base font-black text-stone-900">{c.tableRow2Net}</td>
                  </tr>

                  {/* Option 3: Distant Buyer */}
                  <tr className="hover:bg-stone-50">
                    <td className="py-3.5 px-3 flex items-center space-x-2 text-stone-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span>{c.tableRow3Name}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right text-stone-700">{c.tableRow3Offer}</td>
                    <td className="py-3.5 px-3 text-right text-rose-600 font-bold">{c.tableRow3Cost}</td>
                    <td className="py-3.5 px-3 text-right text-base font-black text-stone-900">{c.tableRow3Net}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Selling Decision Result Box */}
            <div className="p-4 rounded-2xl bg-emerald-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <strong className="text-sm font-black text-emerald-200">
                    {c.verdictText}
                  </strong>
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  {c.verdictDetail}
                </p>
              </div>

              <span className="text-[11px] text-emerald-300 italic">
                {c.verdictDisclaimer}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. NEW SECTION: "तुमचा खरा नफा कसा मोजला जातो?" (True Crop Profit Engine Visual Breakdown) */}
      <section className="py-14 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
              {c.formulaBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-2">
              {c.formulaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {c.formulaSubtitle}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border-2 border-stone-200 space-y-6">
            
            {/* Visual Formula Chain */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
              {/* Step 1: Expenses */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-stone-500">{c.formulaStep1Name}</span>
                <strong className="text-sm font-black text-stone-900 block">{c.formulaStep1Formula}</strong>
                <span className="text-xs text-rose-600 font-bold">{c.formulaStep1Value}</span>
              </div>

              <div className="text-stone-400 font-black text-xl hidden md:block">−</div>

              {/* Step 2: Revenue */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-stone-500">{c.formulaStep2Name}</span>
                <strong className="text-sm font-black text-stone-900 block">{c.formulaStep2Formula}</strong>
                <span className="text-xs text-emerald-800 font-bold">{c.formulaStep2Value}</span>
              </div>

              <div className="text-stone-400 font-black text-xl hidden md:block">=</div>

              {/* Step 3: True Crop Profit */}
              <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 shadow-xs space-y-1 md:col-span-1">
                <span className="text-xs font-bold text-emerald-900">{c.formulaStep3Name}</span>
                <strong className="text-lg font-black text-emerald-950 block">{c.formulaStep3Formula}</strong>
                <span className="text-sm text-emerald-900 font-black">{c.formulaStep3Value}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-stone-600 font-medium">
                {c.formulaNote}
              </span>
              <Link to="/profit" className="font-bold text-emerald-800 hover:underline shrink-0">
                {c.formulaCta}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Section: आजचे बाजारभाव & माझ्या जवळचे बाजार */}
      <section className="py-12 bg-stone-100/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {c.ratesBadge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                {c.ratesTitle}
              </h2>
            </div>

            {/* Local Mandi District Switcher */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-stone-500 font-bold">{c.nearbyPrompt}</span>
              <div className="inline-flex rounded-xl bg-white p-1 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setSelectedDistrict('Nashik')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedDistrict === 'Nashik' ? 'bg-emerald-800 text-white' : 'text-stone-700'
                  }`}
                >
                  {language === 'mr' ? 'नाशिक' : language === 'hi' ? 'नासिक' : 'Nashik'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDistrict('Sangli')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedDistrict === 'Sangli' ? 'bg-emerald-800 text-white' : 'text-stone-700'
                  }`}
                >
                  {language === 'mr' ? 'सांगली' : language === 'hi' ? 'सांगली' : 'Sangli'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDistrict('Solapur')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedDistrict === 'Solapur' ? 'bg-emerald-800 text-white' : 'text-stone-700'
                  }`}
                >
                  {language === 'mr' ? 'सोलापूर' : language === 'hi' ? 'सोलापुर' : 'Solapur'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDistrict('Pune')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedDistrict === 'Pune' ? 'bg-emerald-800 text-white' : 'text-stone-700'
                  }`}
                >
                  {language === 'mr' ? 'पुणे' : language === 'hi' ? 'पुणे' : 'Pune'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Rate 1 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">{c.mandi1Name}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ▲ +₹४.००
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-black text-stone-900">₹१०२</span>
                <span className="text-xs text-stone-500">/ kg</span>
              </div>
              <p className="text-[11px] text-stone-500">
                {language === 'mr' ? 'मागील दर: ₹९८ • ७ दिवसांची सरासरी: ₹१००' : language === 'hi' ? 'पिछला दर: ₹९८ • ७ दिनों का औसत: ₹१००' : 'Prev: ₹98 • 7-Day Avg: ₹100'}
              </p>
            </div>

            {/* Rate 2 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">{c.mandi2Name}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ▲ +₹५.००
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-black text-stone-900">₹१०६</span>
                <span className="text-xs text-stone-500">/ kg</span>
              </div>
              <p className="text-[11px] text-stone-500">
                {language === 'mr' ? 'मागील दर: ₹१०१ • ७ दिवसांची सरासरी: ₹१०४' : language === 'hi' ? 'पिछला दर: ₹१०१ • ७ दिनों का औसत: ₹१०४' : 'Prev: ₹101 • 7-Day Avg: ₹104'}
              </p>
            </div>

            {/* Rate 3 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">{c.mandi3Name}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ▲ +₹८.००
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-black text-stone-900">₹१४२</span>
                <span className="text-xs text-stone-500">/ kg</span>
              </div>
              <p className="text-[11px] text-stone-500">
                {language === 'mr' ? 'मागील दर: ₹१३४ • ७ दिवसांची सरासरी: ₹१३८' : language === 'hi' ? 'पिछला दर: ₹१३४ • ७ दिनों का औसत: ₹१३८' : 'Prev: ₹134 • 7-Day Avg: ₹138'}
              </p>
            </div>

            {/* Rate 4 */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">{c.mandi4Name}</span>
                <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                  {language === 'mr' ? 'स्थिर' : language === 'hi' ? 'स्थिर' : 'Stable'}
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-black text-stone-900">₹९८</span>
                <span className="text-xs text-stone-500">/ kg</span>
              </div>
              <p className="text-[11px] text-stone-500">
                {language === 'mr' ? 'मागील दर: ₹९८ • ७ दिवसांची सरासरी: ₹९७' : language === 'hi' ? 'पिछला दर: ₹९८ • ७ दिनों का औसत: ₹९७' : 'Prev: ₹98 • 7-Day Avg: ₹97'}
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/market"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:underline"
            >
              <span>{c.viewAllRates}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 7. Section: आजचे हवामान व शेती सूचना (Safe & Responsible) */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-6 rounded-3xl bg-stone-50 border-2 border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div className="flex items-center space-x-3">
                <CloudSun className="w-6 h-6 text-amber-600" />
                <h3 className="font-black text-base sm:text-lg text-stone-900">
                  {c.weatherTitle}
                </h3>
              </div>
              <span className="text-xs font-bold text-stone-600 bg-white px-3 py-1 rounded-full border border-stone-200">
                {c.weatherBelt}
              </span>
            </div>

            {/* 4 Weather Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block">{c.weatherRain}</span>
                <strong className="text-stone-900 font-black text-sm">10%</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block">{c.weatherHumidity}</span>
                <strong className="text-stone-900 font-black text-sm">62%</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block">{c.weatherWind}</span>
                <strong className="text-stone-900 font-black text-sm">12 km/h</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block">{c.weatherTemp}</span>
                <strong className="text-stone-900 font-black text-sm">28° C</strong>
              </div>
            </div>

            {/* Safe Advisory Warning */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-stone-700 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-900 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>⚠️ {language === 'mr' ? 'शेती सूचना:' : language === 'hi' ? 'कृषि सलाह:' : 'Farm Advisory:'}</span>
              </div>
              <p className="leading-relaxed">
                {c.weatherAdvisory}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Section: ShetiMitra कसे काम करते? (3 Steps) */}
      <section id="how-it-works" className="py-14 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
              {c.howItWorksBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-2">
              {c.howItWorksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {c.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-3 shadow-2xs">
              <span className="text-xl font-black text-emerald-800">{c.howStep1Num}</span>
              <h3 className="text-base font-black text-stone-900">
                {c.howStep1Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {c.howStep1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-3 shadow-2xs">
              <span className="text-xl font-black text-amber-600">{c.howStep2Num}</span>
              <h3 className="text-base font-black text-stone-900">
                {c.howStep2Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {c.howStep2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 space-y-3 shadow-2xs">
              <span className="text-xl font-black text-emerald-800">{c.howStep3Num}</span>
              <h3 className="text-base font-black text-stone-900">
                {c.howStep3Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {c.howStep3Desc}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 9. Section: शेतकऱ्यांचा अनुभव (Sample Farmer Stories - Demo) */}
      <section className="py-14 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
              {c.testimonialsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-2">
              {c.testimonialsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Story 1 */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center space-x-3">
                <img src={IMAGES.testimonialFarmerRamesh} alt="Ramesh" className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{language === 'en' ? 'Ramesh Patil' : 'रमेश पाटील'}</h4>
                  <p className="text-[10px] text-stone-500">{language === 'en' ? 'Dindori (Nashik) • 3.5 Acres Grapes' : 'दिंडोरी (नाशिक) • ३.५ एकर द्राक्ष'}</p>
                </div>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed">
                {language === 'en' 
                  ? '"Knowing my ₹69/kg production cost helped me negotiate a ₹106/kg direct export deal with free farm pickup."'
                  : language === 'hi'
                  ? '"उत्पादन लागत प्रति किलो ₹६९ होने पर मुझे ₹१०६ का सीधा खरीदार भाव मिला। गाड़ी भाड़ा बच गया।"'
                  : '"उत्पादन खर्च प्रति किलो ₹६९ असताना मला ₹१०६ चा थेट खरेदीदार भाव मिळाला. वाहतूक वाचली."'}
              </p>
            </div>

            {/* Story 2 */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center space-x-3">
                <img src={IMAGES.farmerVitthal} alt="Vitthal" className="w-10 h-10 rounded-full object-cover border-2 border-amber-600" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{language === 'en' ? 'Vitthal Shinde' : 'विठ्ठल शिंदे'}</h4>
                  <p className="text-[10px] text-stone-500">{language === 'en' ? 'Sangola (Solapur) • 5 Acres Pomegranate' : 'सांगोला (सोलापूर) • ५ एकर डाळिंब'}</p>
                </div>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed">
                {language === 'en'
                  ? '"Sold pomegranates directly to an export packhouse at farm gate. Saved significant travel and freight expenses."'
                  : language === 'hi'
                  ? '"अनार सीधे एक्सपोर्ट पैकहाउस को खेत पर बेचा। मंडी जाने का समय व भाड़ा बच गया।"'
                  : '"डाळिंबाची थेट एक्सपोर्ट पॅकहाऊसला जागेवर विक्री केली. मंडीतील गाडीभाडे व वेळ वाचला."'}
              </p>
            </div>

            {/* Story 3 */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center space-x-3">
                <img src={IMAGES.farmerSubhash} alt="Subhash" className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{language === 'en' ? 'Subhash Jadhav' : 'सुभाष जाधव'}</h4>
                  <p className="text-[10px] text-stone-500">{language === 'en' ? 'Tasgaon (Sangli) • 4 Acres Grapes' : 'तासगाव (सांगली) • ४ एकर द्राक्ष'}</p>
                </div>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed">
                {language === 'en'
                  ? '"Compared pruning labor team rates and fertilizer prices across shops to complete the season at lower cost."'
                  : language === 'hi'
                  ? '"कटाई टीम के भाव और उर्वरक दरें दुकानों से तुलना करके कम खर्च में काम पूरा हुआ।"'
                  : '"छाटणी टोळीचे दर आणि खतांचे भाव शेजारच्या दुकानांशी तुलना करून कमी खर्चात काम झाले."'}
              </p>
            </div>

            {/* Story 4 */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center space-x-3">
                <img src={IMAGES.farmerSunita} alt="Sunita" className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{language === 'en' ? 'Sunita Gaikwad' : 'सुनीता गायकवाड'}</h4>
                  <p className="text-[10px] text-stone-500">{language === 'en' ? 'Baramati (Pune) • 2.5 Acres Grapes' : 'बारामती (पुणे) • २.५ एकर द्राक्ष'}</p>
                </div>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed">
                {language === 'en'
                  ? '"Consulting AI ShetiMitra for daily spray calculations made keeping farm records effortless."'
                  : language === 'hi'
                  ? '"AI शेतमित्र से पूछकर मजदूरी और छिड़काव का रोज का हिसाब रखना बहुत आसान हो गया है।"'
                  : '"AI शेतमित्राला विचारून मजुरी आणि फवारणीचा रोजचा हिशोब ठेवणे खूप सोपे झाले आहे."'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 10. Section: 🤖 AI शेतमित्र (Ask ShetiMitra) */}
      <section className="py-12 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Bot className="w-6 h-6 text-emerald-300" />
                <h3 className="text-2xl sm:text-3xl font-black">
                  {c.aiTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200">
                {c.aiSubtitle}
              </p>
            </div>

            <Link
              to="/assistant"
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm shadow-md transition flex items-center space-x-2 shrink-0 cursor-pointer"
            >
              <span>{c.aiCta}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 11. Section: 📞 शेतकरी मदत (Helpline & WhatsApp) */}
      <section className="py-10 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-black text-base text-stone-900">
                {c.helpTitle}
              </h4>
              <p className="text-xs text-stone-500">
                {c.helpSubtitle}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="tel:18001234567"
                className="px-4 py-2 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-bold text-xs rounded-xl transition flex items-center space-x-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                <span>1800-123-4567</span>
              </a>

              <a
                href="https://api.whatsapp.com/send?text=नमस्कार%20शेतीमित्र,%20मला%20माहिती%20हवी%20आहे"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>{c.whatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
