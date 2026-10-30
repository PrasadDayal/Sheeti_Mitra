import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFarmData } from '../context/FarmDataContext';
import { IMAGES } from '../images/images';
import { 
  Wrench, 
  Search, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  PhoneCall, 
  Info, 
  Sparkles, 
  SlidersHorizontal,
  FileCheck,
  Star,
  PackageCheck
} from 'lucide-react';

export interface EquipmentItem {
  id: string;
  nameMr: string;
  nameHi: string;
  nameEn: string;
  brand: string;
  category: 'sprayers' | 'pruning' | 'tractor' | 'irrigation' | 'sensors' | 'safety';
  categoryLabelMr: string;
  categoryLabelHi: string;
  categoryLabelEn: string;
  price: number;
  originalPrice: number;
  subsidyEligible: boolean;
  subsidyPercent: number;
  subsidyAmount: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  warranty: string;
  deliveryDays: string;
  specs: {
    mr: { label: string; value: string }[];
    hi: { label: string; value: string }[];
    en: { label: string; value: string }[];
  };
  features: {
    mr: string[];
    hi: string[];
    en: string[];
  };
}

const EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    id: 'eq-1',
    nameMr: '१६ लिटर २-इन-१ हाय-प्रेशर बॅटरी स्प्रेअर पंप',
    nameHi: '16 लीटर 2-इन-1 हाई-प्रेशर बैटरी स्प्रेयर पंप',
    nameEn: '16L 2-in-1 Dual-Motor High Pressure Battery Sprayer',
    brand: 'Aspee AgriTech',
    category: 'sprayers',
    categoryLabelMr: 'फवारणी पंप',
    categoryLabelHi: 'स्प्रेयर व पंप',
    categoryLabelEn: 'Sprayers & Pumps',
    price: 2850,
    originalPrice: 4200,
    subsidyEligible: true,
    subsidyPercent: 50,
    subsidyAmount: 1425,
    rating: 4.8,
    reviews: 142,
    imageUrl: IMAGES.eqSprayer,
    warranty: '1 Year Full Replacement Warranty',
    deliveryDays: '२-३ दिवस (मोफत शेत डिलिव्हरी)',
    specs: {
      mr: [
        { label: 'बॅटरी क्षमता', value: '12V / 12Ah हेवी-ड्युटी लिथियम' },
        { label: 'टाकी क्षमता', value: '16 लिटर केमिकल-प्रतिरोधक' },
        { label: 'प्रेशर', value: '100 PSI ड्युअल मोटर' },
        { label: 'एक चार्जमध्ये काम', value: '३० ते ३५ टाक्या फवारणी' }
      ],
      hi: [
        { label: 'बैटरी क्षमता', value: '12V / 12Ah हैवी-ड्यूटी लिथियम' },
        { label: 'टंकी क्षमता', value: '16 लीटर' },
        { label: 'प्रेशर', value: '100 PSI डुअल मोटर' },
        { label: 'एक चार्ज में कार्य', value: '30 से 35 टंकी छिड़काव' }
      ],
      en: [
        { label: 'Battery Capacity', value: '12V / 12Ah Heavy-duty Lithium' },
        { label: 'Tank Capacity', value: '16 Litres Chemical Resistant' },
        { label: 'Pressure', value: '100 PSI Dual Motor' },
        { label: 'Backup per Charge', value: '30 to 35 Tanks Spraying' }
      ]
    },
    features: {
      mr: ['द्राक्ष आणि डाळिंब बागेसाठी सूक्ष्म तुषार नोझल संच समाविष्ट', 'मागे मखमली पॅडिंगमुळे पाठीवर ताण येत नाही', 'महाडीबीटी योजना ५०% अनुदान थेट बँक खात्यात'],
      hi: ['अंगूर और अनार के लिए महीन मिस्ट नोजल सेट शामिल', 'कम्फर्ट बैक-पैडिंग के साथ आसान छिड़काव', 'महाडीबीटी 50% सरकारी सब्सिडी पात्र'],
      en: ['Micro-mist brass nozzle set for grape & pomegranate canopy', 'Ergonomic back padding reduces fatigue', 'MahaDBT 50% subsidy eligible']
    }
  },
  {
    id: 'eq-2',
    nameMr: 'इलेक्ट्रिक कॉर्डलेस रिचार्जेबल छाटणी कात्री (Pruning Secateur)',
    nameHi: 'इलेक्ट्रिक कॉर्डलेस रिचार्जेबल प्रूनिंग कैंची',
    nameEn: 'Cordless Electric Rechargeable Pruning Shears (Secateur)',
    brand: 'KisanCraft Pro',
    category: 'pruning',
    categoryLabelMr: 'छाटणी व कटिंग',
    categoryLabelHi: 'छंटाई उपकरण',
    categoryLabelEn: 'Pruning & Cutting',
    price: 4999,
    originalPrice: 7500,
    subsidyEligible: true,
    subsidyPercent: 40,
    subsidyAmount: 2000,
    rating: 4.9,
    reviews: 98,
    imageUrl: IMAGES.eqPruning,
    warranty: '18 Months Motor Warranty',
    deliveryDays: '२-४ दिवस',
    specs: {
      mr: [
        { label: 'कटिंग जाडी', value: '30mm ते 35mm जाड फांद्या' },
        { label: 'ब्लेड मटेरियल', value: 'जपानी SK5 हाय-कार्बन स्टील' },
        { label: 'बॅटरी', value: '2 x 21V रिचार्जेबल लिथियम पॅक' },
        { label: 'वजन', value: 'फक्त 920 ग्रॅम (अल्ट्रा-लाइट)' }
      ],
      hi: [
        { label: 'कटिंग क्षमता', value: '30mm से 35mm मोटी टहनी' },
        { label: 'ब्लेड सामग्री', value: 'जापानी SK5 हाई-कार्बन स्टील' },
        { label: 'बैटरी', value: '2 x 21V रिचार्जेबल लिथियम पैक' },
        { label: 'वजन', value: 'मात्र 920 ग्राम' }
      ],
      en: [
        { label: 'Cutting Diameter', value: 'Up to 35mm Hard Branches' },
        { label: 'Blade Material', value: 'Japanese SK5 High-Carbon Steel' },
        { label: 'Battery Backup', value: '2 x 21V Lithium Batteries (8-10 hrs)' },
        { label: 'Net Weight', value: 'Just 920g (Fatigue-Free)' }
      ]
    },
    features: {
      mr: ['द्राक्षाची खरड छाटणी व गोडी छाटणी वेळेत पूर्ण करण्यासाठी सर्वोत्तम', 'हात न दुखता दिवसाला १२००+ वेलींची अचूक कटाई', '२ सुट्या बॅटऱ्या व शार्पनिंग स्टोन मोफत'],
      hi: ['अंगूर व फलदार बगीचों की छंटाई के लिए अत्यंत उपयोगी', 'बिना हाथ थके प्रतिदिन 1200+ पौधों की सटीक कटाई', '2 एक्स्ट्रा बैटरी और धार लगाने का पत्थर साथ'],
      en: ['Crucial for speed pruning during grape foundation and fruit seasons', 'Can prune 1200+ vines daily with minimal hand stress', 'Comes with 2 batteries, carry case, and sharpening kit']
    }
  },
  {
    id: 'eq-3',
    nameMr: 'स्मार्ट सोलर ऑटोमेशन ठिबक सिंचन कंट्रोलर किट',
    nameHi: 'स्मार्ट सोलर ऑटोमेशन ड्रिप सिंचाई कंट्रोलर किट',
    nameEn: 'Smart Solar-Powered Automated Drip Irrigation Controller',
    brand: 'Jain Agro-Tech',
    category: 'irrigation',
    categoryLabelMr: 'सिंचन व सोलर',
    categoryLabelHi: 'सिंचाई व सोलर',
    categoryLabelEn: 'Solar & Irrigation',
    price: 8400,
    originalPrice: 12500,
    subsidyEligible: true,
    subsidyPercent: 50,
    subsidyAmount: 4200,
    rating: 4.7,
    reviews: 64,
    imageUrl: IMAGES.eqSolarDrip,
    warranty: '2 Years Manufacturer Warranty',
    deliveryDays: '३-५ दिवस',
    specs: {
      mr: [
        { label: 'ऊर्जा स्रोत', value: '25W इनबिल्ट सोलर पॅनेल' },
        { label: 'व्हॉल्व्ह सपोर्ट', value: '4 ते 8 स्वतंत्र व्हॉल्व्ह कंट्रोल' },
        { label: 'कनेक्टिव्हिटी', value: 'GSM सिम + शेतीमित्र मोबाईल ॲप' },
        { label: 'टाइमर', value: 'स्वयंचलित पाणी व खत फेर्टीगेशन वेळापत्रक' }
      ],
      hi: [
        { label: 'ऊर्जा स्रोत', value: '25W इनबिल्ट सोलर पैनल' },
        { label: 'वाल्व नियंत्रण', value: '4 से 8 स्वतंत्र वाल्व' },
        { label: 'कनेक्टिविटी', value: 'GSM सिम + मोबाइल ऐप' },
        { label: 'टाइमर', value: 'स्वचालित पानी व खाद फर्टिगेशन' }
      ],
      en: [
        { label: 'Power Source', value: '25W Integrated Solar Panel' },
        { label: 'Valve Support', value: 'Controls 4 to 8 Field Valves' },
        { label: 'Connectivity', value: '4G GSM Sim + ShetiMitra App Sync' },
        { label: 'Automation', value: 'Auto Schedule for Drip & Fertigation' }
      ]
    },
    features: {
      mr: ['लाईटची वाट पाहण्याची गरज नाही, मोबाईलवरून एका क्लिकवर पाणी चालू/बंद', 'खत फेर्टीगेशन व्हेंचुरीसोबत ऑटो-मिक्सिंग सपोर्ट', 'महाडीबीटी सूक्ष्म सिंचन ५०% अनुदान मंजूर'],
      hi: ['बिजली आने का इंतजार नहीं, मोबाइल से कहीं से भी चालू/बंद करें', 'खाद व वेंचुरी के साथ ऑटो मिक्सिंग सपोर्ट', '50% सूक्ष्म सिंचाई सरकारी सब्सिडी'],
      en: ['No need to wait for erratic farm electricity; runs 100% on solar', 'Automates precise fertilizer and water application to root zone', 'Eligible for 50% State Micro-Irrigation DBT Subsidy']
    }
  },
  {
    id: 'eq-4',
    nameMr: 'डिजिटल ४-इन-१ माती परीक्षण व ओलावा सेन्सर (IoT Soil Probe)',
    nameHi: 'डिजिटल 4-इन-1 मृदा परीक्षण व नमी सेंसर (IoT सॉइल प्रोब)',
    nameEn: 'Digital 4-in-1 Soil pH, Moisture, EC & Temperature Sensor Probe',
    brand: 'AgriSense India',
    category: 'sensors',
    categoryLabelMr: 'माती परीक्षण व सेन्सर',
    categoryLabelHi: 'मृदा परीक्षण सेंसर',
    categoryLabelEn: 'Soil Testing & Sensors',
    price: 3200,
    originalPrice: 4800,
    subsidyEligible: false,
    subsidyPercent: 0,
    subsidyAmount: 0,
    rating: 4.8,
    reviews: 86,
    imageUrl: IMAGES.eqSoilProbe,
    warranty: '1 Year Warranty',
    deliveryDays: '२-३ दिवस',
    specs: {
      mr: [
        { label: 'मोजमाप', value: 'pH (सामू), ओलावा %, EC (क्षार), तापमान' },
        { label: 'डिस्प्ले', value: 'बॅकलाईट डिजिटल HD LCD स्क्रीन' },
        { label: 'प्रोब लांबी', value: '30 सेमी स्टेनलेस स्टील वॉटरप्रूफ' },
        { label: 'अचूकता', value: '±0.05 pH अचूक लॅब ग्रेड' }
      ],
      hi: [
        { label: 'मापन', value: 'pH, नमी %, EC (लवणता), तापमान' },
        { label: 'डिस्प्ले', value: 'बैकलाइट डिजिटल स्क्रीन' },
        { label: 'प्रोब लंबाई', value: '30 सेमी स्टेनलेस स्टील' },
        { label: 'सटीकता', value: '±0.05 pH लैब ग्रेड सटीकता' }
      ],
      en: [
        { label: 'Parameters', value: 'pH, Moisture %, EC Salinity, Temp' },
        { label: 'Display', value: 'Backlit High-Contrast Digital LCD' },
        { label: 'Probe Rod', value: '30cm Stainless Steel Waterproof Rod' },
        { label: 'Accuracy', value: 'Lab-grade ±0.05 pH resolution' }
      ]
    },
    features: {
      mr: ['द्राक्ष बागेतील मातीचा सामू (pH) व क्षारता (EC) जागेवर ५ सेकंदात दाखवतो', 'पाणी कधी द्यायचे आणि खत किती द्यायचे याचे अचूक नियोजन', 'शेतीमित्र ॲपमध्ये ब्लूटूथने डेटा आपोआप सेव्ह होतो'],
      hi: ['जमीन की अम्लता और लवणता 5 सेकंड में तुरंत जांचें', 'कब पानी देना है और कब खाद, सटीक निर्णय में मददगार', 'ब्लूटूथ के माध्यम से मोबाइल से सीधे कनेक्टेड'],
      en: ['Provides on-the-spot soil salinity & acidity readings within 5 seconds', 'Prevents root rot and optimizes fertilizer absorption efficiency', 'Direct wireless sync to ShetiMitra crop logs']
    }
  },
  {
    id: 'eq-5',
    nameMr: '७ HP हेवी-ड्युटी पेट्रोल पॉवर वेडर टिलर (आंतरमशागत यंत्र)',
    nameHi: '7 HP हैवी-ड्यूटी पेट्रोल पावर वीडर टिलर (इंटर-कल्टीवेटर)',
    nameEn: '7 HP Heavy-Duty 4-Stroke Petrol Power Weeder & Rotary Tiller',
    brand: 'Shaktiman FarmGear',
    category: 'tractor',
    categoryLabelMr: 'आंतरमशागत व टिलर',
    categoryLabelHi: 'इंटर-कल्टीवेटर टिलर',
    categoryLabelEn: 'Tillage & Rotary Tillers',
    price: 36500,
    originalPrice: 48000,
    subsidyEligible: true,
    subsidyPercent: 50,
    subsidyAmount: 18250,
    rating: 4.9,
    reviews: 112,
    imageUrl: IMAGES.eqTiller,
    warranty: '2 Years Engine & Gearbox Warranty',
    deliveryDays: '४-६ दिवस (शेतावर मोफत डेमोसह डिलिव्हरी)',
    specs: {
      mr: [
        { label: 'इंजिन क्षमता', value: '212 cc, 4-स्ट्रोक 7 HP पेट्रोल' },
        { label: 'ब्लेड्स', value: '24 रोटरी कर्वेड टिलर ब्लेड्स संच' },
        { label: 'मशागत रुंदी', value: '2.5 ते 3.5 फूट ॲडजस्टेबल' },
        { label: 'गिअर बॉक्स', value: '2 फॉरवर्ड + 1 रिव्हर्स हेवी गिअर' }
      ],
      hi: [
        { label: 'इंजन', value: '212 cc, 4-स्ट्रोक 7 HP पेट्रोल' },
        { label: 'ब्लेड सेट', value: '24 घुमावदार रोटरी ब्लेड' },
        { label: 'जुताई चौड़ाई', value: '2.5 से 3.5 फीट समायोज्य' },
        { label: 'गियर', value: '2 आगे + 1 रिवर्स गियर' }
      ],
      en: [
        { label: 'Engine Capacity', value: '212 cc, 4-Stroke 7 HP Petrol Engine' },
        { label: 'Rotary Blades', value: '24 Hardened Curved Cultivator Blades' },
        { label: 'Tilling Width', value: '2.5 to 3.5 Feet Adjustable' },
        { label: 'Transmission', value: '2 Forward + 1 Reverse Heavy Duty' }
      ]
    },
    features: {
      mr: ['द्राक्ष व डाळिंब बागेच्या ओळीत तण काढण्यासाठी आणि मशागतीसाठी सर्वोत्तम', 'ट्रॅक्टर न जाणाऱ्या अरुंद जागेत सुलभ चालते; मजुरी खर्चात ७०% बचत', 'महाडीबीटी कृषी यांत्रिकीकरण ५०% अनुदान मंजूर'],
      hi: ['अंगूर व अनार की क्यारियों में खरपतवार हटाने के लिए सबसे उत्तम', 'कम जगह में आसानी से चलता है; मजदूरी खर्च में 70% तक बचत', 'महाडीबीटी कृषि यंत्रीकरण योजना में 50% सब्सिडी'],
      en: ['Perfect for weed eradication between narrow trellis rows in vineyards', 'Saves up to 70% in manual labour and de-weeding costs', 'Pre-approved under MahaDBT Agricultural Mechanization Scheme']
    }
  },
  {
    id: 'eq-6',
    nameMr: 'कीटकनाशक फवारणी कम्प्लीट सुरक्षा किट (Safety Gear Kit)',
    nameHi: 'कीटनाशक छिड़काव संपूर्ण सुरक्षा किट (सेफ्टी गियर किट)',
    nameEn: 'Certified Chemical Spray Personal Protective Equipment (PPE) Kit',
    brand: 'KisanSuraksha Certified',
    category: 'safety',
    categoryLabelMr: 'शेतकरी सुरक्षा किट',
    categoryLabelHi: 'सुरक्षा गियर',
    categoryLabelEn: 'Protective & Safety Gear',
    price: 1199,
    originalPrice: 1950,
    subsidyEligible: false,
    subsidyPercent: 0,
    subsidyAmount: 0,
    rating: 4.8,
    reviews: 175,
    imageUrl: IMAGES.eqSafetySuit,
    warranty: 'Quality Assured ISI Certified',
    deliveryDays: '२-३ दिवस',
    specs: {
      mr: [
        { label: 'सूट मटेरियल', value: 'श्वास घेण्यायोग्य वॉटरप्रूफ कोटिंग' },
        { label: 'मास्क प्रकार', value: 'ड्युअल ॲक्टिव्हेटेड कार्बन फिल्टर N95' },
        { label: 'डोळ्यांचे संरक्षण', value: 'अँटी-फॉग प्रोटेक्टिव्ह गॉगल' },
        { label: 'हातमोजे', value: 'नायट्रिल केमिकल-प्रूफ हेवी हँडग्लोव्हज' }
      ],
      hi: [
        { label: 'सूट सामग्री', value: 'हवादार केमिकल-प्रतिरोधी सूट' },
        { label: 'मास्क', value: 'डुअल एक्टिवेटेड कार्बन फिल्टर N95' },
        { label: 'आईवियर', value: 'एंटी-फॉग सेफ्टी चश्मा' },
        { label: 'दस्ताने', value: 'नाइट्राइल केमिकल प्रूफ ग्लव्स' }
      ],
      en: [
        { label: 'Suit Material', value: 'Breathable Chemical-Repellent Barrier' },
        { label: 'Respirator Mask', value: 'Dual Activated Carbon Vapor Filter N95' },
        { label: 'Eyewear', value: 'Anti-fog Impact Splash Goggles' },
        { label: 'Gloves', value: 'Heavy Nitrile Chemical Resistant Gloves' }
      ]
    },
    features: {
      mr: ['विषारी कीटकनाशकांची वाफ, डोकेदुखी आणि त्वचेच्या ॲलर्जीपासून १००% संरक्षण', 'धुवून पुन्हा वापरता येणारा टिकाऊ डिझाइन', 'फवारणी करताना शरीराचा घाम बाहेर टाकणारे आरामदायी कापड'],
      hi: ['विषैले रसायनों की गंध, त्वचा की जलन व एलर्जी से 100% सुरक्षा', 'धोकर बार-बार इस्तेमाल करने योग्य मजबूत कपड़ा', 'छिड़काव करते समय आरामदायक व पसीना-मुक्त'],
      en: ['100% protection against hazardous pesticide fumes and skin contamination', 'Washable, reusable, and built for harsh Indian farm climates', 'Includes respirator mask, splash goggles, suit, and nitrile gloves']
    }
  }
];

export const EquipmentStore: React.FC = () => {
  const { language } = useLanguage();
  const { farmer } = useFarmData();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [subsidyOnly, setSubsidyOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  
  // Order Modal State
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online' | 'subsidy'>('cod');
  const [farmerName, setFarmerName] = useState<string>(farmer.name && farmer.name !== 'Farmer' ? farmer.name : '');
  const [farmerPhone, setFarmerPhone] = useState<string>(farmer.mobile || '');
  const [farmerAddress, setFarmerAddress] = useState<string>(farmer.village ? `${farmer.village}, ${farmer.district}` : '');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState<boolean>(false);
  const [trackingNumber, setTrackingNumber] = useState<string>('');

  // Translations
  const content = {
    mr: {
      pageTitle: 'शेती अवजारे व आधुनिक यंत्रे स्टोअर',
      pageSub: 'थेट शेतावर मोफत डिलिव्हरी • सरकारी ५०% महाडीबीटी अनुदान उपलब्ध • अस्सल वॉरंटी',
      searchPlaceholder: 'उपकरण किंवा कंपनीचे नाव शोधा (उदा. स्प्रेअर, कात्री, टिलर)...',
      allCategories: 'सर्व अवजारे',
      subsidyFilter: '🏛️ फक्त ५०% शासकीय अनुदान पात्र दाखवा',
      inStock: 'उपलब्ध आहे (स्टॉक सज्ज)',
      fastDelivery: 'जलद शेतपोच',
      orderNow: 'आता मागवा (ऑर्डर करा)',
      viewDetails: 'तपशील व माहिती',
      subsidyTag: '५०% महाडीबीटी अनुदान',
      saveAmt: 'बचत',
      inclusiveTaxes: 'सर्व कर समाविष्ट',
      orderBookingTitle: 'शेती उपकरण बुकिंग व थेट शेत डिलिव्हरी',
      confirmBooking: 'ऑर्डर निश्चित करा',
      qtyLabel: 'संख्या (Quantity):',
      deliveryAddressLabel: 'शेत डिलिव्हरी पत्ता:',
      contactLabel: 'मोबाईल नंबर:',
      paymentModeLabel: 'पेमेंट पर्याय निवडा:',
      payCod: 'शेतावर आल्यावर रोख पैसे द्या (Cash on Delivery)',
      payOnline: 'ऑनलाइन पेमेंट (UPI / PhonePe / Google Pay / Card)',
      paySubsidy: 'महाडीबीटी अनुदान टोकन द्वारे थेट वजावट (DBT Token)',
      orderSummary: 'ऑर्डर सारांश',
      basePrice: 'मूळ किंमत:',
      subsidyDeduction: 'अनुदान वजावट:',
      deliveryFee: 'डिलिव्हरी शुल्क:',
      freeDelivery: 'मोफत (Free)',
      netPayable: 'एकूण देय रक्कम:',
      orderSuccessTitle: '🎉 अभिनंदन! तुमची उपकरण ऑर्डर नोंदवली गेली आहे!',
      trackingIdLabel: 'ट्रॅकिंग क्र:',
      dispatchNotice: 'आम्ही पुढील २४ तासांत हे उपकरण तुमच्या शेताच्या पत्त्यावर रवाना करत आहोत. ड्रायव्हर निघण्यापूर्वी फोन करेल.',
      closeBtn: 'बंद करा'
    },
    hi: {
      pageTitle: 'कृषि उपकरण व आधुनिक मशीनरी स्टोर',
      pageSub: 'सीधे खेत तक डिलीवरी • 50% सरकारी महाडीबीटी सब्सिडी • असली वारंटी',
      searchPlaceholder: 'उपकरण या कंपनी का नाम खोजें (उदा. स्प्रेयर, कैंची, टिलर)...',
      allCategories: 'सभी उपकरण',
      subsidyFilter: '🏛️ केवल 50% सरकारी सब्सिडी वाले उत्पाद दिखाएं',
      inStock: 'स्टॉक में उपलब्ध',
      fastDelivery: 'तेज़ फार्म डिलीवरी',
      orderNow: 'अभी ऑर्डर करें',
      viewDetails: 'विवरण व स्पेक्स',
      subsidyTag: '50% सरकारी सब्सिडी',
      saveAmt: 'बचत',
      inclusiveTaxes: 'सभी कर सहित',
      orderBookingTitle: 'कृषि उपकरण बुकिंग व डिलीवरी',
      confirmBooking: 'ऑर्डर पक्का करें',
      qtyLabel: 'मात्रा (Quantity):',
      deliveryAddressLabel: 'खेत का डिलीवरी पता:',
      contactLabel: 'मोबाइल नंबर:',
      paymentModeLabel: 'भुगतान का तरीका चुनें:',
      payCod: 'खेत पर पहुंचने पर नकद भुगतान (Cash on Delivery)',
      payOnline: 'ऑनलाइन भुगतान (UPI / PhonePe / Google Pay)',
      paySubsidy: 'महाडीबीटी सब्सिडी टोकन से छूट',
      orderSummary: 'ऑर्डर सारांश',
      basePrice: 'मूल मूल्य:',
      subsidyDeduction: 'सब्सिडी छूट:',
      deliveryFee: 'डिलीवरी शुल्क:',
      freeDelivery: 'मुफ़्त (Free)',
      netPayable: 'कुल देय राशि:',
      orderSuccessTitle: '🎉 बधाई! आपका कृषि उपकरण सफलतापूर्वक बुक हो गया है!',
      trackingIdLabel: 'ट्रैकिंग आईडी:',
      dispatchNotice: 'अगले 24 घंटों में यह उपकरण आपके खेत के पते के लिए रवाना कर दिया जाएगा। ड्राइवर पहुंचने से पहले फोन करेगा।',
      closeBtn: 'बंद करें'
    },
    en: {
      pageTitle: 'Farm Equipment & Machinery Store',
      pageSub: 'Direct Farmgate Delivery • 50% Govt MahaDBT Subsidy • Manufacturer Warranty',
      searchPlaceholder: 'Search equipment by name or brand (e.g. sprayer, shears, tiller)...',
      allCategories: 'All Machinery',
      subsidyFilter: '🏛️ Show Only 50% DBT Subsidy Eligible',
      inStock: 'In Stock (Ready to Dispatch)',
      fastDelivery: 'Fast Delivery',
      orderNow: 'Order Now',
      viewDetails: 'Specifications',
      subsidyTag: '50% Govt Subsidy',
      saveAmt: 'Save',
      inclusiveTaxes: 'Inclusive of all taxes',
      orderBookingTitle: 'Book Equipment & Direct Farmgate Dispatch',
      confirmBooking: 'Confirm Order Booking',
      qtyLabel: 'Quantity:',
      deliveryAddressLabel: 'Farm Delivery Address:',
      contactLabel: 'Mobile Phone Number:',
      paymentModeLabel: 'Select Payment Mode:',
      payCod: 'Cash on Farm Delivery (Pay when equipment arrives)',
      payOnline: 'Instant Online Pay (UPI / PhonePe / GPay / Card)',
      paySubsidy: 'MahaDBT Govt Subsidy Token Claim',
      orderSummary: 'Order Summary',
      basePrice: 'Item Price:',
      subsidyDeduction: 'Govt Subsidy Applied:',
      deliveryFee: 'Delivery Fee:',
      freeDelivery: 'FREE',
      netPayable: 'Total Payable:',
      orderSuccessTitle: '🎉 Congratulations! Your Farm Equipment Order is Confirmed!',
      trackingIdLabel: 'Tracking No:',
      dispatchNotice: 'Your machinery will be dispatched directly to your farm within 24 hours. The local technician will call you before delivery.',
      closeBtn: 'Close'
    }
  };

  const t = content[language] || content.mr;

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'sprayers', label: language === 'mr' ? 'फवारणी पंप' : language === 'hi' ? 'स्प्रेयर पंप' : 'Sprayers' },
    { id: 'pruning', label: language === 'mr' ? 'छाटणी अवजारे' : language === 'hi' ? 'छंटाई कैंची' : 'Pruning' },
    { id: 'tractor', label: language === 'mr' ? 'आंतरमशागत व टिलर' : language === 'hi' ? 'टिलर मशीन' : 'Power Weeders' },
    { id: 'irrigation', label: language === 'mr' ? 'सोलर सिंचन' : language === 'hi' ? 'सोलर सिंचाई' : 'Solar Drip' },
    { id: 'sensors', label: language === 'mr' ? 'माती सेन्सर' : language === 'hi' ? 'मृदा सेंसर' : 'Soil Probes' },
    { id: 'safety', label: language === 'mr' ? 'सुरक्षा किट' : language === 'hi' ? 'सुरक्षा गियर' : 'Safety Gear' }
  ];

  const filteredItems = EQUIPMENT_CATALOG.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSubsidy = !subsidyOnly || item.subsidyEligible;
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      item.nameMr.toLowerCase().includes(searchLower) ||
      item.nameHi.toLowerCase().includes(searchLower) ||
      item.nameEn.toLowerCase().includes(searchLower) ||
      item.brand.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSubsidy && matchesSearch;
  });

  const handleOpenOrder = (item: EquipmentItem) => {
    setSelectedEquipment(item);
    setOrderQuantity(1);
    setPaymentMethod('cod');
    setOrderPlacedSuccess(false);
    if (farmer.name && farmer.name !== 'Farmer') {
      setFarmerName(farmer.name);
      setFarmerPhone(farmer.mobile || '');
      setFarmerAddress(farmer.village ? `${farmer.village}, ${farmer.district}` : farmer.district || '');
    }
    setOrderModalOpen(true);
  };

  const handleConfirmOrder = () => {
    const randomId = 'SM-EQ-' + Math.floor(10000 + Math.random() * 90000);
    setTrackingNumber(randomId);
    setOrderPlacedSuccess(true);
  };

  const calculateTotal = () => {
    if (!selectedEquipment) return 0;
    const unitPrice = selectedEquipment.price;
    const subsidy = (paymentMethod === 'subsidy' && selectedEquipment.subsidyEligible) 
      ? selectedEquipment.subsidyAmount 
      : 0;
    return Math.max(0, (unitPrice - subsidy) * orderQuantity);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner / Store Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 md:p-8 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-25 mix-blend-overlay hidden md:block"
             style={{ backgroundImage: `url(${IMAGES.eqTiller})` }}>
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs md:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{language === 'mr' ? 'शेतकरी थेट खरेदी केंद्र' : language === 'hi' ? 'किसान डायरेक्ट खरीद केंद्र' : 'Direct Farmer Machinery Store'}</span>
            <span className="text-white">•</span>
            <span className="text-amber-300 font-bold">🏛️ 50% DBT Govt Subsidy</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {t.pageTitle}
          </h1>

          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed">
            {t.pageSub}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs md:text-sm text-emerald-200">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
              <Truck className="w-4 h-4 text-emerald-300" />
              <span>{language === 'mr' ? '२४ ते ४८ तासांत मोफत शेतपोच डिलिव्हरी' : language === 'hi' ? '24 से 48 घंटे में सीधे खेत तक डिलीवरी' : 'Fast 24-48h Farmgate Delivery'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{language === 'mr' ? '१००% अस्सल व कंपनी वॉरंटी' : language === 'hi' ? '100% असली व कंपनी वारंटी' : '100% Original with Warranty'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>{language === 'mr' ? 'मशीन वापर डेमो व हेल्पलाइन' : language === 'hi' ? 'मशीन उपयोग डेमो व हेल्पलाइन' : 'Free Demo & Technician Support'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 50% Subsidy Toggle Filter */}
          <button
            onClick={() => setSubsidyOnly(!subsidyOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition border ${
              subsidyOnly 
                ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-400/50' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600" />
            <span>{t.subsidyFilter}</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Product Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">
            {language === 'mr' ? 'कोणतेही उपकरण आढळले नाही' : language === 'hi' ? 'कोई उपकरण नहीं मिला' : 'No equipment found'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'mr' ? 'कृपया शोध शब्द तपासा किंवा फिल्टर काढून पुन्हा पहा.' : language === 'hi' ? 'कृपया फिल्टर बदलकर देखें।' : 'Try resetting your filter or search query.'}
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSubsidyOnly(false); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition"
          >
            {language === 'mr' ? 'सर्व अवजारे पहा' : language === 'hi' ? 'सभी उपकरण देखें' : 'View All Equipment'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const itemName = language === 'mr' ? item.nameMr : language === 'hi' ? item.nameHi : item.nameEn;
            const categoryLabel = language === 'mr' ? item.categoryLabelMr : language === 'hi' ? item.categoryLabelHi : item.categoryLabelEn;
            const itemSpecs = item.specs[language] || item.specs.mr;
            const itemFeatures = item.features[language] || item.features.mr;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Product Image Header with Badges */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={itemName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                  {/* Brand & Category Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur text-slate-800 text-xs font-bold shadow-sm">
                      {item.brand}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-xs font-medium shadow-sm">
                      {categoryLabel}
                    </span>
                  </div>

                  {/* 50% Subsidy Badge */}
                  {item.subsidyEligible && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-500/30 animate-pulse">
                        🏛️ {item.subsidyPercent}% DBT अनुदान
                      </span>
                    </div>
                  )}

                  {/* Rating on bottom left */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{item.rating}</span>
                      <span className="text-white/70">({item.reviews})</span>
                    </div>
                    <span className="bg-emerald-600/80 backdrop-blur px-2 py-0.5 rounded-md font-medium">
                      ✓ {t.inStock}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2">
                      {itemName}
                    </h3>

                    {/* Price and Subsidy Details */}
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-emerald-800">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-200/70 px-1.5 py-0.5 rounded">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                        </span>
                      </div>

                      {item.subsidyEligible && (
                        <div className="mt-1.5 pt-1.5 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                          <span className="text-amber-900 font-semibold flex items-center gap-1">
                            🏛️ महाडीबीटी अनुदान वजावट:
                          </span>
                          <span className="font-bold text-emerald-700">
                            -₹{item.subsidyAmount.toLocaleString('en-IN')} (फक्त ₹{(item.price - item.subsidyAmount).toLocaleString('en-IN')} पडेल)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Key Technical Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs py-1">
                      {itemSpecs.slice(0, 4).map((spec, idx) => (
                        <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <div className="text-slate-500 text-[11px] font-medium">{spec.label}</div>
                          <div className="text-slate-800 font-bold truncate mt-0.5">{spec.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bullet Highlights */}
                    <div className="space-y-1 pt-1">
                      {itemFeatures.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery & Warranty Footer */}
                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-emerald-600" />
                        {item.deliveryDays}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        {item.warranty}
                      </span>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleOpenOrder(item)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-xl transition flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t.orderNow}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Online Order Booking Modal */}
      {orderModalOpen && selectedEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
                    {t.orderBookingTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedEquipment.brand} • {selectedEquipment.deliveryDays}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 md:p-6 space-y-5">
              {orderPlacedSuccess ? (
                /* Success View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <PackageCheck className="w-9 h-9" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900">
                      {t.orderSuccessTitle}
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      {t.dispatchNotice}
                    </p>
                  </div>

                  {/* Tracking Badge */}
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-sm mx-auto text-center space-y-1">
                    <div className="text-xs font-bold text-emerald-800">
                      {t.trackingIdLabel}
                    </div>
                    <div className="text-xl font-black text-emerald-950 tracking-wider">
                      {trackingNumber}
                    </div>
                    <div className="text-xs text-emerald-600">
                      SMS द्वारे ट्रॅकिंग लिंक {farmerPhone} वर पाठवली आहे.
                    </div>
                  </div>

                  {/* Receipt Breakdown */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-500">उपकरण:</span>
                      <span className="font-bold text-slate-800">{language === 'mr' ? selectedEquipment.nameMr : selectedEquipment.nameEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">नग (Quantity):</span>
                      <span className="font-bold text-slate-800">{orderQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">पेमेंट पद्धत:</span>
                      <span className="font-bold text-slate-800 uppercase">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">डिलिव्हरी पत्ता:</span>
                      <span className="font-bold text-slate-800">{farmerAddress}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-emerald-800">
                      <span>एकूण देय रक्कम:</span>
                      <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setOrderModalOpen(false)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition"
                  >
                    {t.closeBtn}
                  </button>
                </div>
              ) : (
                /* Booking Form */
                <div className="space-y-4">
                  {/* Selected Item Preview Mini Card */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <img 
                      src={selectedEquipment.imageUrl} 
                      alt="" 
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">
                        {language === 'mr' ? selectedEquipment.nameMr : selectedEquipment.nameEn}
                      </h4>
                      <div className="text-xs text-slate-500">
                        {selectedEquipment.brand} • {selectedEquipment.warranty}
                      </div>
                      <div className="text-sm font-black text-emerald-700 mt-0.5">
                        ₹{selectedEquipment.price.toLocaleString('en-IN')}
                        {selectedEquipment.subsidyEligible && (
                          <span className="ml-2 text-xs text-amber-700 font-semibold">
                            (🏛️ ₹{selectedEquipment.subsidyAmount} DBT अनुदान पात्र)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-sm font-bold text-slate-700">{t.qtyLabel}</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="font-black text-slate-900 text-base">{orderQuantity}</span>
                      <button 
                        onClick={() => setOrderQuantity(orderQuantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Farmer Details Pre-filled */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        शेतकऱ्याचे नाव (Farmer Name):
                      </label>
                      <input 
                        type="text"
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.contactLabel}
                      </label>
                      <input 
                        type="text"
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.deliveryAddressLabel}
                      </label>
                      <textarea 
                        rows={2}
                        value={farmerAddress}
                        onChange={(e) => setFarmerAddress(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">
                      {t.paymentModeLabel}
                    </label>

                    <div className="space-y-2">
                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'cod' ? 'bg-emerald-50/70 border-emerald-500 ring-1 ring-emerald-500' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={paymentMethod === 'cod'} 
                          onChange={() => setPaymentMethod('cod')}
                          className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">{t.payCod}</div>
                          <div className="text-slate-500">उपकरण तपासून मगच ड्रायव्हरला रोख पैसे द्या. १००% खात्रीशीर.</div>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'online' ? 'bg-emerald-50/70 border-emerald-500 ring-1 ring-emerald-500' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={paymentMethod === 'online'} 
                          onChange={() => setPaymentMethod('online')}
                          className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">{t.payOnline}</div>
                          <div className="text-slate-500">Google Pay, PhonePe, Paytm किंवा नेटबँकिंगद्वारे त्वरित पेमेंट.</div>
                        </div>
                      </label>

                      {selectedEquipment.subsidyEligible && (
                        <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                          paymentMethod === 'subsidy' ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'subsidy'} 
                            onChange={() => setPaymentMethod('subsidy')}
                            className="mt-0.5 text-amber-600 focus:ring-amber-500"
                          />
                          <div className="text-xs">
                            <div className="font-bold text-amber-950 flex items-center gap-1">
                              <span>{t.paySubsidy}</span>
                              <span className="bg-amber-200 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded">50% DBT</span>
                            </div>
                            <div className="text-amber-800">तुमच्या महाडीबीटी टोकनमधून थेट ५०% रक्कम वजा होईल. उरलेली रक्कम भरावी लागेल.</div>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Summary & Total */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>{t.basePrice}</span>
                      <span>₹{(selectedEquipment.price * orderQuantity).toLocaleString('en-IN')}</span>
                    </div>

                    {paymentMethod === 'subsidy' && selectedEquipment.subsidyEligible && (
                      <div className="flex justify-between text-amber-700 font-bold">
                        <span>{t.subsidyDeduction}</span>
                        <span>-₹{(selectedEquipment.subsidyAmount * orderQuantity).toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>{t.deliveryFee}</span>
                      <span className="text-emerald-700 font-bold">{t.freeDelivery}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
                      <span className="text-sm font-black">{t.netPayable}</span>
                      <span className="text-xl font-black text-emerald-800">
                        ₹{calculateTotal().toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-base rounded-2xl shadow-xl shadow-emerald-700/25 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{t.confirmBooking}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EquipmentStore;
