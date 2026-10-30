import React, { useState, useMemo } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { ExpenseDonutChart } from '../components/charts/ExpenseDonutChart';
import { Modal } from '../components/common/Modal';
import { ExpenseForm } from '../components/forms/ExpenseForm';
import { ExpenseCategory } from '../types';
import { formatINR } from '../utils/calculations';
import {
  ReceiptIndianRupee,
  PlusCircle,
  Trash2,
  Filter,
  FileText,
  CreditCard,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  Users2,
  Droplets,
  Tractor,
  Package,
  Wallet,
  Zap,
  HelpCircle,
  Scale,
} from 'lucide-react';

export const Expenses: React.FC = () => {
  const { expenses, deleteExpense, totalCost, farmer, addExpense, breakEvenPrice, fields } = useFarmData();
  const { language, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlot, setSelectedPlot] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const costPerAcre = Math.round(totalCost / (farmer.totalAcres || 1));
  const targetBudget = farmer.totalAcres > 0 ? Math.round(farmer.totalAcres * 75000) : 250000;
  const budgetPercent = Math.min(100, Math.round((totalCost / targetBudget) * 100));

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchCategory = selectedCategory === 'All' || e.category === selectedCategory;
      const matchPlot = selectedPlot === 'All' || e.fieldId === selectedPlot || e.fieldName.includes(selectedPlot);
      const matchSearch =
        searchQuery.trim() === '' ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchPlot && matchSearch;
    });
  }, [expenses, selectedCategory, selectedPlot, searchQuery]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleQuickAddExpense = (category: ExpenseCategory, amount: number, label: string) => {
    addExpense({
      category,
      amount,
      date: new Date().toISOString().split('T')[0],
      crop: farmer.primaryCrop || 'Grapes',
      fieldId: 'field-01',
      fieldName: 'Field 01 - Grapes',
      description: `Quick: ${label}`,
      paymentMethod: 'Cash',
    });
    triggerToast(`₹${amount} (${label}) saved!`);
  };

  const exText = {
    mr: {
      badge: 'खर्च व उत्पादन व्यवस्थापन',
      title: 'खर्च नोंद व हिशोब (Expenses)',
      subtitle: 'मजुरी, खते, औषधे, डिझेल व सिंचनाचा अचूक हिशोब आणि उत्पादन नोंदी.',
      harvestBtn: 'तोडणी व वजन लॉट्स',
      addBtn: '+ नवीन खर्च नोंदवा',
      quickTitle: 'झटपट १-क्लिक खर्च नोंदी (Quick Expense Shortcuts)',
      quickSub: 'वारंवार होणाऱ्या खर्चावर टॅप करा आणि त्वरित नोंदवा',
      kpiTotal: 'एकूण चालू खर्च (Total Cost)',
      kpiTotalSub: `${expenses.length} नोंदी नोंदवल्या`,
      kpiPerAcre: 'एकरी सरासरी खर्च (Per Acre)',
      kpiPerAcreSub: `एकूण ${farmer.totalAcres} एकर क्षेत्र`,
      kpiBreakEven: 'किमान परवडणारा भाव',
      kpiBreakEvenSub: 'खर्च भरून काढणारा भाव',
      kpiBudget: 'सीजन बजेट वापर',
      kpiBudgetSub: `₹२.५० लाख बजेट मर्यादा`,
      searchPlaceholder: 'तपशील, वर्गवारी किंवा पेमेंट पद्धत शोधा...',
      categoryLabel: 'वर्गवारी:',
      allCategories: 'सर्व वर्गवारी (All)',
      allPlots: 'सर्व प्लॉट (All Plots)',
      listTitle: 'नोंदवलेले खर्च व्यवहार',
      modalTitle: 'नवीन शेती खर्च जोडा (Add Expense)',
    },
    hi: {
      badge: 'लागत व व्यय प्रबंधन',
      title: 'खर्च दर्ज करें (Expenses)',
      subtitle: 'मजदूरी, खाद, कीटनाशक, डीजल व सिंचाई का सटीक हिसाब-किताब।',
      harvestBtn: 'कटाई व वजन लॉट',
      addBtn: '+ नया खर्च जोड़ें',
      quickTitle: 'झटपट १-क्लिक खर्च प्रविष्टि (Quick Expense Shortcuts)',
      quickSub: 'रोजाना के सामान्य खर्चों पर टैप करें और तुरंत जोड़ें',
      kpiTotal: 'कुल वर्तमान खर्च (Total Cost)',
      kpiTotalSub: `${expenses.length} प्रविष्टियां दर्ज`,
      kpiPerAcre: 'प्रति एकड़ औसत खर्च (Per Acre)',
      kpiPerAcreSub: `कुल ${farmer.totalAcres} एकड़ रकबा`,
      kpiBreakEven: 'न्यूनतम लाभकारी भाव',
      kpiBreakEvenSub: 'लागत वसूली भाव',
      kpiBudget: 'सीजन बजट उपयोग',
      kpiBudgetSub: `₹२.५० लाख बजट सीमा`,
      searchPlaceholder: 'विवरण, श्रेणी या भुगतान विधि खोजें...',
      categoryLabel: 'श्रेणी:',
      allCategories: 'सभी श्रेणियां (All)',
      allPlots: 'सभी प्लॉट (All Plots)',
      listTitle: 'दर्ज किए गए खर्च लेनदेन',
      modalTitle: 'नया खेती खर्च जोड़ें (Add Expense)',
    },
    en: {
      badge: 'Farm Cost & Expense Accounting',
      title: 'Expense Management (खर्च नोंद)',
      subtitle: 'Accurate logging for labour, fertilizers, pesticides, fuel, and irrigation.',
      harvestBtn: 'Harvest Batches',
      addBtn: '+ Add New Expense',
      quickTitle: 'Quick 1-Tap Expense Logging (Shortcuts)',
      quickSub: 'Tap any shortcut below to log recurring costs instantly',
      kpiTotal: 'Total Season Expense (Total Cost)',
      kpiTotalSub: `${expenses.length} transactions recorded`,
      kpiPerAcre: 'Average Cost Per Acre',
      kpiPerAcreSub: `Across ${farmer.totalAcres} acres farm`,
      kpiBreakEven: 'Break-Even Unit Cost',
      kpiBreakEvenSub: 'Minimum threshold rate',
      kpiBudget: 'Season Budget Used',
      kpiBudgetSub: '₹2.50 Lakh target allocation',
      searchPlaceholder: 'Search description, category or payment method...',
      categoryLabel: 'Category:',
      allCategories: 'All Categories',
      allPlots: 'All Plots',
      listTitle: 'Logged Expense Transactions',
      modalTitle: 'Add New Farm Expense',
    }
  };

  const et = exText[language] || exText.mr;

  const getCategoryConfig = (category: ExpenseCategory) => {
    switch (category) {
      case 'Labour':
        return {
          icon: Users2,
          bg: 'bg-teal-100 text-teal-950 border-teal-300',
          iconBg: 'bg-teal-700 text-white',
          label: language === 'mr' ? 'मजुरी' : language === 'hi' ? 'मजदूरी' : 'Labour',
        };
      case 'Fertilizer':
        return {
          icon: Droplets,
          bg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
          iconBg: 'bg-emerald-700 text-white',
          label: language === 'mr' ? 'खते व पोषण' : language === 'hi' ? 'खाद व पोषण' : 'Fertilizer',
        };
      case 'Crop Protection':
        return {
          icon: Sparkles,
          bg: 'bg-blue-100 text-blue-950 border-blue-300',
          iconBg: 'bg-blue-700 text-white',
          label: language === 'mr' ? 'औषध फवारणी' : language === 'hi' ? 'दवाई छिड़काव' : 'Crop Protection',
        };
      case 'Machinery':
        return {
          icon: Tractor,
          bg: 'bg-amber-100 text-amber-950 border-amber-300',
          iconBg: 'bg-amber-700 text-white',
          label: language === 'mr' ? 'ट्रॅक्टर / डिझेल' : language === 'hi' ? 'ट्रैक्टर / डीजल' : 'Machinery & Fuel',
        };
      case 'Irrigation':
        return {
          icon: Zap,
          bg: 'bg-cyan-100 text-cyan-950 border-cyan-300',
          iconBg: 'bg-cyan-700 text-white',
          label: language === 'mr' ? 'सिंचन / वीज' : language === 'hi' ? 'सिंचाई / बिजली' : 'Irrigation & Power',
        };
      case 'Packaging':
        return {
          icon: Package,
          bg: 'bg-purple-100 text-purple-950 border-purple-300',
          iconBg: 'bg-purple-700 text-white',
          label: language === 'mr' ? 'पॅकिंग व कॅरेट' : language === 'hi' ? 'पैकिंग व कैरेट' : 'Packaging',
        };
      default:
        return {
          icon: ReceiptIndianRupee,
          bg: 'bg-stone-100 text-stone-900 border-stone-300',
          iconBg: 'bg-stone-700 text-white',
          label: language === 'mr' ? 'इतर खर्च' : language === 'hi' ? 'अन्य खर्च' : 'Other',
        };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 text-sm font-bold border-2 border-emerald-400 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
              <ReceiptIndianRupee className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {et.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {et.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {et.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/harvest"
            className="flex items-center space-x-1.5 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm rounded-2xl transition border border-stone-300"
          >
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>{et.harvestBtn}</span>
          </a>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-5 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-emerald-300" />
            <span>{et.addBtn}</span>
          </button>
        </div>
      </div>

      {/* Quick 1-Tap Expense Logger Chips */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 text-white p-5 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shrink-0">
            ⚡
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base text-white">
              {et.quickTitle}
            </h3>
            <p className="text-xs text-stone-300">{et.quickSub}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <button
            onClick={() => handleQuickAddExpense('Machinery', 500, 'ट्रॅक्टर डिझेल')}
            className="px-3 py-1.5 bg-white/10 hover:bg-amber-400 hover:text-stone-950 rounded-xl border border-white/20 transition cursor-pointer"
          >
            🚜 + ₹५०० {language === 'en' ? 'Diesel' : 'डिझेल'}
          </button>
          <button
            onClick={() => handleQuickAddExpense('Labour', 1200, 'दैनिक मजुरी')}
            className="px-3 py-1.5 bg-white/10 hover:bg-amber-400 hover:text-stone-950 rounded-xl border border-white/20 transition cursor-pointer"
          >
            👥 + ₹१,२०० {language === 'en' ? 'Labour' : 'मजुरी'}
          </button>
          <button
            onClick={() => handleQuickAddExpense('Fertilizer', 3500, 'SOP 0:0:50 खत बॅग')}
            className="px-3 py-1.5 bg-white/10 hover:bg-amber-400 hover:text-stone-950 rounded-xl border border-white/20 transition cursor-pointer"
          >
            🌱 + ₹३,५०० {language === 'en' ? 'Fertilizer' : 'खत'}
          </button>
          <button
            onClick={() => handleQuickAddExpense('Crop Protection', 850, 'बुरशीनाशक फवारणी')}
            className="px-3 py-1.5 bg-white/10 hover:bg-amber-400 hover:text-stone-950 rounded-xl border border-white/20 transition cursor-pointer"
          >
            🧪 + ₹८५० {language === 'en' ? 'Spray' : 'औषध'}
          </button>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Cost */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {et.kpiTotal}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">{formatINR(totalCost)}</div>
          <span className="text-xs font-bold text-emerald-800 block">
            {et.kpiTotalSub}
          </span>
        </div>

        {/* Card 2: Cost Per Acre */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {et.kpiPerAcre}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">
            {formatINR(costPerAcre)}
          </div>
          <span className="text-xs font-bold text-stone-500 block">
            {et.kpiPerAcreSub}
          </span>
        </div>

        {/* Card 3: Break-Even Rate */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {et.kpiBreakEven}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-950">
            ₹{breakEvenPrice.toFixed(0)} / kg
          </div>
          <span className="text-xs font-bold text-amber-800 block">
            {et.kpiBreakEvenSub}
          </span>
        </div>

        {/* Card 4: Season Budget Allocation */}
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-stone-500 block">
            {et.kpiBudget}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-950">{budgetPercent}%</div>
          <span className="text-xs font-bold text-stone-500 block">
            {et.kpiBudgetSub}
          </span>
        </div>
      </div>

      {/* Expense Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={et.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border-2 border-stone-200 rounded-2xl text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Plot Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-stone-600">Plot:</span>
            <select
              value={selectedPlot}
              onChange={(e) => setSelectedPlot(e.target.value)}
              className="p-2 bg-stone-50 border-2 border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="All">{et.allPlots}</option>
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} - {f.crop} ({f.acres} {language === 'mr' ? 'एकर' : language === 'hi' ? 'एकड़' : 'Acres'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs font-bold">
          {['All', 'Labour', 'Fertilizer', 'Crop Protection', 'Machinery', 'Irrigation', 'Packaging'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white font-black shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? et.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
        <h3 className="text-base sm:text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
          {et.listTitle} ({filteredExpenses.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-stone-200 text-stone-500 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-3">{language === 'en' ? 'Date' : 'दिनांक'}</th>
                <th className="py-3 px-3">{language === 'en' ? 'Category' : 'वर्गवारी'}</th>
                <th className="py-3 px-3">{language === 'en' ? 'Details' : 'खर्च तपशील'}</th>
                <th className="py-3 px-3">{language === 'en' ? 'Plot' : 'शेत / प्लॉट'}</th>
                <th className="py-3 px-3">{language === 'en' ? 'Payment' : 'पेमेंट'}</th>
                <th className="py-3 px-3 text-right">{language === 'en' ? 'Amount (₹)' : 'रक्कम (₹)'}</th>
                <th className="py-3 px-3 text-center">{language === 'en' ? 'Action' : 'कृती'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredExpenses.map((exp) => {
                const cfg = getCategoryConfig(exp.category);
                const IconComp = cfg.icon;
                return (
                  <tr key={exp.id} className="hover:bg-stone-50 transition">
                    <td className="py-3.5 px-3 text-stone-600 font-semibold">{exp.date}</td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${cfg.bg}`}>
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{cfg.label}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-stone-900 font-bold">{exp.description}</td>
                    <td className="py-3.5 px-3 text-stone-600">{exp.fieldName}</td>
                    <td className="py-3.5 px-3 text-stone-500 text-xs">{exp.paymentMethod}</td>
                    <td className="py-3.5 px-3 text-right font-black text-stone-950 text-sm">
                      {formatINR(exp.amount)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => {
                          deleteExpense(exp.id);
                          triggerToast('खर्च हटवला गेला / Deleted');
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="खर्च हटवा"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title={et.modalTitle}
        >
          <ExpenseForm
            onSuccess={() => {
              setShowAddModal(false);
              triggerToast('खर्च यशस्वीरीत्या नोंदवला गेला / Expense logged!');
            }}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Expenses;
