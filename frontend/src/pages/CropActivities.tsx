import React, { useState, useMemo } from 'react';
import { useFarmData } from '../context/FarmDataContext';
import { useLanguage } from '../context/LanguageContext';
import { Modal } from '../components/common/Modal';
import { ActivityForm } from '../components/forms/ActivityForm';
import { ActivityCategory } from '../types';
import { formatINR } from '../utils/calculations';
import {
  CalendarCheck2,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Filter,
  Layers,
  Sprout,
  ReceiptIndianRupee,
  Search,
  Check,
  Calendar,
  MapPin,
  Sparkles,
  Droplets,
  Scissors,
  Package,
  Scale,
  AlertCircle,
  Tag,
  ArrowRight,
} from 'lucide-react';

export const CropActivities: React.FC = () => {
  const { activities, toggleActivityStatus, farmer, fields } = useFarmData();
  const { language, t } = useLanguage();

  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Upcoming' | 'Overdue'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [fieldFilter, setFieldFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const completedCount = activities.filter((a) => a.status === 'Completed').length;
  const upcomingCount = activities.filter((a) => a.status === 'Upcoming').length;
  const overdueCount = activities.filter((a) => a.status === 'Overdue').length;

  const totalEstimatedCost = useMemo(() => {
    return activities.reduce((acc, curr) => acc + curr.estimatedCost, 0);
  }, [activities]);

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchStatus = statusFilter === 'All' || act.status === statusFilter;
      const matchCategory = categoryFilter === 'All' || act.category === categoryFilter;
      const matchField = fieldFilter === 'All' || act.fieldId === fieldFilter || act.fieldName.includes(fieldFilter);
      const matchSearch =
        searchQuery.trim() === '' ||
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (act.titleMr && act.titleMr.toLowerCase().includes(searchQuery.toLowerCase())) ||
        act.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchStatus && matchCategory && matchField && matchSearch;
    });
  }, [activities, statusFilter, categoryFilter, fieldFilter, searchQuery]);

  const handleToggle = (id: string, currentStatus: string) => {
    toggleActivityStatus(id);
    const newStatusText = currentStatus === 'Completed' ? 'काम पूर्ववत केले (Marked Pending)' : 'काम पूर्ण म्हणून नोंदवले (Marked Completed)!';
    setToastMessage(newStatusText);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getCategoryBadge = (category: ActivityCategory) => {
    switch (category) {
      case 'Fertilizer':
        return {
          bg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
          icon: Droplets,
          labelMr: 'ठिबक खते',
        };
      case 'Spraying':
        return {
          bg: 'bg-blue-100 text-blue-950 border-blue-300',
          icon: Sparkles,
          labelMr: 'फवारणी',
        };
      case 'Pruning':
      case 'Canopy':
        return {
          bg: 'bg-purple-100 text-purple-950 border-purple-300',
          icon: Scissors,
          labelMr: 'छाटणी व विरळणी',
        };
      case 'Bagging':
        return {
          bg: 'bg-amber-100 text-amber-950 border-amber-300',
          icon: Package,
          labelMr: 'पेपर बॅगिंग',
        };
      case 'Harvest':
        return {
          bg: 'bg-teal-100 text-teal-950 border-teal-300',
          icon: Scale,
          labelMr: 'तोडणी नियोजन',
        };
      default:
        return {
          bg: 'bg-stone-100 text-stone-900 border-stone-300',
          icon: Layers,
          labelMr: 'इतर काम',
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
              <CalendarCheck2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
              {language === 'mr' ? 'पीक नियोजन व व्यवस्थापन' : 'Crop Operations'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            {language === 'mr' ? 'पीक चक्र व कामांचे नियोजन (पीक व कामे)' : 'Crop Cycle & Activity Tracking (पीक व कामे)'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            फवारणी, ठिबक खत व्यवस्थापन, मजुरांची कामे, विरळणी व तोडणीचे अचूक वेळापत्रक.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-5 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 text-emerald-300" />
          <span>+ नवीन काम नोंदवा (Add Activity)</span>
        </button>
      </div>

      {/* 4 Interactive Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: All */}
        <button
          type="button"
          onClick={() => setStatusFilter('All')}
          className={`p-5 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
            statusFilter === 'All'
              ? 'bg-emerald-950 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400'
              : 'bg-white text-stone-900 border-stone-200 hover:border-emerald-400 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${statusFilter === 'All' ? 'text-emerald-300' : 'text-stone-500'}`}>
              एकूण सर्व कामे
            </span>
            <Calendar className="w-5 h-5 opacity-70" />
          </div>
          <div className="text-2xl sm:text-3xl font-black">{activities.length}</div>
          <span className={`text-xs font-semibold ${statusFilter === 'All' ? 'text-emerald-200' : 'text-stone-500'}`}>
            अंदाजित बजेट: {formatINR(totalEstimatedCost)}
          </span>
        </button>

        {/* Card 2: Completed */}
        <button
          type="button"
          onClick={() => setStatusFilter('Completed')}
          className={`p-5 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
            statusFilter === 'Completed'
              ? 'bg-emerald-900 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
              : 'bg-white text-stone-900 border-stone-200 hover:border-emerald-400 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${statusFilter === 'Completed' ? 'text-emerald-300' : 'text-emerald-700'}`}>
              पूर्ण झालेली कामे
            </span>
            <CheckCircle2 className={`w-5 h-5 ${statusFilter === 'Completed' ? 'text-emerald-300' : 'text-emerald-600'}`} />
          </div>
          <div className="text-2xl sm:text-3xl font-black">{completedCount}</div>
          <span className={`text-xs font-semibold ${statusFilter === 'Completed' ? 'text-emerald-200' : 'text-emerald-700'}`}>
            ✓ वेळेत पूर्ण
          </span>
        </button>

        {/* Card 3: Upcoming */}
        <button
          type="button"
          onClick={() => setStatusFilter('Upcoming')}
          className={`p-5 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
            statusFilter === 'Upcoming'
              ? 'bg-blue-950 text-white border-blue-700 shadow-md ring-2 ring-blue-400'
              : 'bg-white text-stone-900 border-stone-200 hover:border-blue-400 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${statusFilter === 'Upcoming' ? 'text-blue-300' : 'text-blue-700'}`}>
              पुढील नियोजित कामे
            </span>
            <Clock className={`w-5 h-5 ${statusFilter === 'Upcoming' ? 'text-blue-300' : 'text-blue-600'}`} />
          </div>
          <div className="text-2xl sm:text-3xl font-black">{upcomingCount}</div>
          <span className={`text-xs font-semibold ${statusFilter === 'Upcoming' ? 'text-blue-200' : 'text-blue-700'}`}>
            येत्या ७ दिवसांत
          </span>
        </button>

        {/* Card 4: Overdue */}
        <button
          type="button"
          onClick={() => setStatusFilter('Overdue')}
          className={`p-5 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
            statusFilter === 'Overdue'
              ? 'bg-rose-950 text-white border-rose-700 shadow-md ring-2 ring-rose-400'
              : 'bg-white text-stone-900 border-stone-200 hover:border-rose-400 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${statusFilter === 'Overdue' ? 'text-rose-300' : 'text-rose-700'}`}>
              प्रलंबित / राहिलेली कामे
            </span>
            <AlertTriangle className={`w-5 h-5 ${statusFilter === 'Overdue' ? 'text-rose-300' : 'text-rose-600'}`} />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-500">{overdueCount}</div>
          <span className={`text-xs font-semibold ${statusFilter === 'Overdue' ? 'text-rose-200' : 'text-rose-600'}`}>
            तात्काळ लक्ष द्या
          </span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="काम, औषध (उदा. SOP, Boron, Downy) किंवा तारीख शोधा..."
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

          {/* Plot / Field Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-stone-600">प्लॉट:</span>
            <select
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              className="p-2 bg-stone-50 border-2 border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="All">सर्व शेत प्लॉट (All Plots)</option>
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} - {f.crop} ({f.acres} {language === 'mr' ? 'एकर' : language === 'hi' ? 'एकड़' : 'Acres'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-500 shrink-0">कामाचा प्रकार:</span>
          {[
            { key: 'All', label: 'सर्व कामे' },
            { key: 'Spraying', label: '🧪 फवारणी (Spraying)' },
            { key: 'Fertilizer', label: '💧 ठिबक खते (Fertigation)' },
            { key: 'Canopy', label: '✂️ विरळणी व छाटणी (Canopy)' },
            { key: 'Bagging', label: '📦 पेपर बॅगिंग (Bagging)' },
            { key: 'Harvest', label: '⚖️ तोडणी (Harvest)' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                categoryFilter === cat.key
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-black text-stone-900">
              कामांचे वेळापत्रक (Activity Timeline - {filteredActivities.length})
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full">
              सक्रिय हंगाम
            </span>
          </div>
          <span className="text-xs font-bold text-stone-500 hidden sm:inline">
            गोल बटणावर क्लिक करून काम 'पूर्ण' चिन्हांकित करा
          </span>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <CalendarCheck2 className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-stone-700">कोणतीही कामे सापडली नाहीत.</p>
            <p className="text-xs text-stone-500">कृपया फिल्टर बदला किंवा नवीन काम जोडा.</p>
            <button
              onClick={() => {
                setStatusFilter('All');
                setCategoryFilter('All');
                setFieldFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl"
            >
              सर्व फिल्टर्स रीसेट करा
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((act) => {
              const badge = getCategoryBadge(act.category);
              const BadgeIcon = badge.icon;
              const isDone = act.status === 'Completed';
              const isOverdue = act.status === 'Overdue';

              return (
                <div
                  key={act.id}
                  className={`p-5 sm:p-6 rounded-3xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isDone
                      ? 'bg-emerald-50/50 border-emerald-200 opacity-80'
                      : isOverdue
                      ? 'bg-rose-50/60 border-rose-300 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-emerald-400 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Left: Checkmark & Details */}
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Big Tap-friendly Status Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleToggle(act.id, act.status)}
                      className={`mt-1 w-9 h-9 rounded-2xl border-2 flex items-center justify-center transition shrink-0 cursor-pointer shadow-xs ${
                        isDone
                          ? 'bg-emerald-700 border-emerald-700 text-white'
                          : isOverdue
                          ? 'border-rose-400 bg-rose-100 text-rose-700 hover:bg-rose-200'
                          : 'border-stone-300 bg-stone-50 text-stone-400 hover:border-emerald-600 hover:text-emerald-700'
                      }`}
                      title={isDone ? 'काम प्रलंबित करा' : 'काम पूर्ण म्हणून नोंदवा'}
                    >
                      {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : <Clock className="w-4 h-4" />}
                    </button>

                    {/* Content */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Category Pill */}
                        <span className={`inline-flex items-center space-x-1 text-xs font-black px-2.5 py-0.5 rounded-lg border ${badge.bg}`}>
                          <BadgeIcon className="w-3.5 h-3.5" />
                          <span>{badge.labelMr}</span>
                        </span>

                        {/* Field Name */}
                        <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                          {act.fieldName}
                        </span>

                        <span className="text-stone-300">•</span>

                        {/* Date */}
                        <span className="text-xs font-black text-stone-800 flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-stone-500" />
                          <span>{act.date}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h4
                        className={`text-base sm:text-lg font-black tracking-tight ${
                          isDone ? 'line-through text-stone-500' : 'text-stone-900'
                        }`}
                      >
                        {act.title}
                      </h4>

                      {/* Marathi Title */}
                      {act.titleMr && (
                        <p className={`text-xs sm:text-sm font-bold ${isDone ? 'text-stone-400' : 'text-emerald-900'}`}>
                          {act.titleMr}
                        </p>
                      )}

                      {/* Notes / Description */}
                      <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
                        {act.notes}
                      </p>
                    </div>
                  </div>

                  {/* Right: Cost & Status Pill */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-200 shrink-0 gap-1.5 pl-0 sm:pl-4">
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] font-bold text-stone-500 block">अंदाजित खर्च</span>
                      <span className="font-black text-stone-900 text-lg sm:text-xl block">
                        {formatINR(act.estimatedCost)}
                      </span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : isOverdue
                          ? 'bg-rose-100 text-rose-900 border border-rose-300'
                          : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}
                    >
                      {isDone ? '✓ पूर्ण झाले' : isOverdue ? '⚠️ प्रलंबित' : '⏳ पुढील काम'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Activity Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="नवीन काम किंवा फवारणी नोंदवा (Schedule Activity)"
          subtitle="फवारणी, खते, मजुरी, छाटणी किंवा तोडणीचे नियोजन करा"
        >
          <ActivityForm
            onSuccess={() => {
              setShowAddModal(false);
              setToastMessage('नवीन काम यशस्वीरीत्या जोडले गेले!');
              setTimeout(() => setToastMessage(null), 3000);
            }}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};
