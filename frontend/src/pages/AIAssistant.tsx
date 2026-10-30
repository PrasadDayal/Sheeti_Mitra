import React, { useState } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { MARATHI_AI_PROMPTS } from '../data/mockData';
import { formatINR } from '../utils/calculations';
import {
  Bot,
  Send,
  Mic,
  Image as ImageIcon,
  Sparkles,
  User,
  PhoneCall,
  Volume2,
  VolumeX,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionRoute?: string;
  actionText?: string;
}

export const AIAssistant: React.FC = () => {
  const { farmer, totalCost, estimatedProfit, breakEvenPrice, bestBuyer } = useFarmData();
  const { language, setLanguage } = useLanguage();

  const [inputQuery, setInputQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const getInitialWelcome = () => {
    if (language === 'hi') {
      return `नमस्ते ${farmer.name.split(' ')[0]}जी! मैं आपका AI शेतमित्र सलाहकार हूँ। आपके ${farmer.district} में ${farmer.totalAcres} एकड़ खेत की कुल लागत, आज के मंडी भाव, खरीदार ऑफर या छिड़काव सलाह के बारे में आप मुझसे हिंदी में कुछ भी पूछ सकते हैं।`;
    }
    if (language === 'en') {
      return `Hello ${farmer.name.split(' ')[0]}! I am your ShetiMitra AI Agronomist. Ask me anything in your language about your ${farmer.totalAcres}-acre farm costs, live APMC rates, verified buyers, or spray schedules.`;
    }
    return `नमस्कार ${farmer.name.split(' ')[0]}जी! मी तुमचा AI शेतीमित्र सल्लागार आहे. तुमच्या ${farmer.district} मधील ${farmer.totalAcres} एकर बागेचा एकूण खर्च, आजचे बाजार भाव, थेट खरेदीदार ऑफर किंवा फवारणी सल्ल्याबद्दल तुम्ही मला थेट मराठीत काहीही विचारू शकता.`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: getInitialWelcome(),
      timestamp: 'Just now',
    },
  ]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputQuery;
    if (!text || !text.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');

    // Fetch live response from Django AI endpoint
    let botResponse = await api.sendAIChat(text.trim(), language);
    let actionRoute: string | undefined = undefined;
    let actionText: string | undefined = undefined;

    const lower = text.toLowerCase();
    if (lower.includes('खर्च') || lower.includes('cost') || lower.includes('expense') || lower.includes('लागत')) {
      actionRoute = '/expenses';
      actionText = language === 'en' ? 'View Expenses' : 'खर्च तपशील पहा';
    } else if (lower.includes('buyer') || lower.includes('खरेदीदार') || lower.includes('खरीदार') || lower.includes('नफा') || lower.includes('profit')) {
      actionRoute = '/selling-decision';
      actionText = language === 'en' ? 'Run Selling Engine' : 'विक्री निर्णय तपासा';
    } else if (lower.includes('भाव') || lower.includes('price') || lower.includes('mandi') || lower.includes('बाजार') || lower.includes('मंडी')) {
      actionRoute = '/market';
      actionText = language === 'en' ? 'Market Intelligence' : 'बाजार भाव पहा';
    } else if (lower.includes('break-even') || lower.includes('किमान भाव')) {
      actionRoute = '/profit';
      actionText = language === 'en' ? 'Profit Analysis' : 'नफा विश्लेषण';
    }

    if (!botResponse) {
      if (lower.includes('खर्च') || lower.includes('cost') || lower.includes('expense') || lower.includes('लागत')) {
        botResponse = `Total cost for your ${farmer.totalAcres}-acre farm this season is **${formatINR(totalCost)}**. Major components include Labour (₹86,000) and Fertilizers/Sprays (₹90,500). Your unit cost of production is **₹69.56/kg**.`;
      } else if (lower.includes('buyer') || lower.includes('खरेदीदार') || lower.includes('खरीदार') || lower.includes('return') || lower.includes('नफा') || lower.includes('profit')) {
        botResponse = `Currently, **${bestBuyer?.name}** is your best option with offer price **₹${bestBuyer?.offerPricePerKg}/kg** and free farm pickup.`;
      } else {
        botResponse = `Today's average modal rate in Pimpalgaon Mandi is ₹102/kg and your break-even threshold is ₹70/kg.`;
      }
    }

    const botMessage: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'assistant',
      text: botResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionRoute,
      actionText,
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const aText = {
    mr: {
      badge: 'मराठी AI शेती सल्लागार',
      title: 'AI शेतीमित्र सल्लागार (Ask AI Doctor)',
      subtitle: 'खर्च, आजचे बाजार भाव, फवारणी वेळ व खरेदीदारांच्या नफ्याबद्दल मराठी किंवा हिंदीत थेट बोला.',
      suggestedPromptTitle: 'विचारण्यासाठी महत्त्वाचे प्रश्न (Quick Suggested Queries):',
      placeholder: 'द्राक्षाचा खर्च, आजचा भाव किंवा खरेदीदाराबद्दल मराठीत विचारा...',
      voiceTitle: 'मराठीत बोला (Voice Input)',
    },
    hi: {
      badge: 'AI कृषि सलाहकार',
      title: 'AI शेतमित्र सलाहकार (Ask AI Doctor)',
      subtitle: 'लागत, आज के मंडी भाव, छिड़काव समय व खरीदार मुनाफे के बारे में सीधे बात करें।',
      suggestedPromptTitle: 'सुझाए गए मुख्य प्रश्न (Quick Suggested Queries):',
      placeholder: 'अंगूर की लागत, आज का भाव या खरीदार के बारे में पूछें...',
      voiceTitle: 'हिंदी में बोलें (Voice Input)',
    },
    en: {
      badge: 'AI Farm Agronomist',
      title: 'AI Farm Advisor (Ask AI Doctor)',
      subtitle: 'Ask about season costs, live APMC mandi prices, spray timings, and verified buyers.',
      suggestedPromptTitle: 'Frequently Asked Questions (Quick Suggested Queries):',
      placeholder: 'Ask about farm cost, today’s APMC rates, or buyer profit...',
      voiceTitle: 'Voice Query',
    }
  };

  const at = aText[language] || aText.mr;

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-amber-400 text-stone-950 font-black">
              <Bot className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
              {at.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {at.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {at.subtitle}
          </p>
        </div>

        {/* Language Pill */}
        <div className="inline-flex rounded-2xl bg-stone-100 p-1 text-xs font-black shrink-0 border border-stone-200">
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              language === 'mr' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700'
            }`}
          >
            मराठी
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              language === 'hi' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700'
            }`}
          >
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
              language === 'en' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-700'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="space-y-2">
        <span className="text-xs font-black text-stone-700 flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{at.suggestedPromptTitle}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {MARATHI_AI_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(language === 'mr' ? prompt.mr : language === 'hi' ? prompt.mr : prompt.en)}
              className="text-left px-3.5 py-2 bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-950 border-2 border-stone-200 hover:border-emerald-400 rounded-2xl text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              {language === 'mr' ? prompt.mr : language === 'hi' ? prompt.mr : prompt.en}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col h-[520px]">
        {/* Messages Feed */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-black shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-stone-900 text-white'
                    : 'bg-emerald-800 text-emerald-300'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-lg rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-900 text-white rounded-tr-none'
                    : 'bg-stone-50 text-stone-900 border-2 border-stone-200 rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-line font-medium">{msg.text}</div>
                
                {msg.actionRoute && (
                  <div className="pt-2">
                    <Link
                      to={msg.actionRoute}
                      className="inline-flex items-center space-x-1.5 font-black text-xs text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-2 rounded-xl transition border border-emerald-300 shadow-2xs"
                    >
                      <span>{msg.actionText || 'तपासा'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                <span
                  className={`block text-[10px] pt-1 font-semibold ${
                    msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t-2 border-stone-100 bg-stone-50 rounded-b-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            {/* Mic voice placeholder */}
            <button
              type="button"
              onClick={() => {
                setIsRecording(!isRecording);
                handleSendMessage(language === 'en' ? "What is today's Pimpalgaon grape price?" : 'आजचा पिंपळगाव बाजार भाव काय आहे?');
              }}
              className={`p-3 border-2 rounded-2xl transition cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
              title={at.voiceTitle}
            >
              <Mic className="w-5 h-5 text-emerald-800" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={at.placeholder}
              className="flex-1 p-3 bg-white border-2 border-stone-300 rounded-2xl text-xs sm:text-sm font-semibold text-stone-900 focus:border-emerald-600 focus:outline-none"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-3 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-black rounded-2xl shadow-xs transition cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
