import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFarmData } from '../context/FarmDataContext';
import { VerificationBadge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import {
  Building2,
  MapPin,
  Truck,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Sparkles,
  ArrowUpRight,
  Star,
  FileCheck,
  PhoneCall,
  Calendar,
  Check,
} from 'lucide-react';

export const BuyerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { buyers } = useFarmData();

  const buyer = buyers.find((b) => b.id === id) || buyers[0];
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryKg, setInquiryKg] = useState('3000');

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <div>
        <Link
          to="/buyers"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← सर्व खरेदीदारांची यादी पहा (Back to Directory)</span>
        </Link>
      </div>

      {/* Main Buyer Header Profile */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-sm">
              {buyer.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300">
                  {buyer.preferredCrop}
                </span>
                <VerificationBadge status={buyer.verificationStatus} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                {buyer.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-stone-500 flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-stone-400" />
                <span>{buyer.location}, {buyer.district} जिल्हा ({buyer.distanceKm} किमी अंतर)</span>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-emerald-50/80 p-4 rounded-2xl border-2 border-emerald-300">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
              खरेदीदार ऑफर भाव
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-950 mt-0.5">
              ₹{buyer.offerPricePerKg}
              <span className="text-sm font-bold text-stone-600"> / किलो</span>
            </div>
            <span className="text-xs text-emerald-800 font-bold block mt-1">
              {buyer.pickupAvailable ? '✓ शेतावर मोफत पिकअप' : 'शेतकरी डिलिव्हरी'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowInquiryModal(true)}
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center space-x-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-300" />
            <span>थेट विक्री चौकशी पाठवा (Send Inquiry)</span>
          </button>

          <Link
            to={`/selling-decision?buyer=${buyer.id}`}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>निव्वळ नफा तुलना करा</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Grid: Business Details & Commercial Terms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Detailed Specifications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-xs space-y-5">
            <h3 className="text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
              खरेदी अटी व व्यापारी माहिती (Procurement Terms)
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 font-bold block text-xs">कंपनी प्रकार</span>
                <span className="font-black text-stone-900 text-base">{buyer.companyType}</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 font-bold block text-xs">खरेदी क्षमता (वॉल्यूम)</span>
                <span className="font-black text-stone-900 text-base">
                  {(buyer.minQuantityKg / 1000).toFixed(1)}T ते {(buyer.maxQuantityKg / 1000).toFixed(0)}T
                </span>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 font-bold block text-xs">पेमेंट अटी</span>
                <span className="font-bold text-stone-900">{buyer.paymentTerms}</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 font-bold block text-xs">वाहतूक व्यवस्था</span>
                <span className="font-bold text-stone-900">
                  {buyer.pickupAvailable ? 'शेतावर रेफ्रिजरेटेड कंटेनर पिकअप' : 'शेतकऱ्याने पॅकहाऊसवर पोहोच करणे'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs sm:text-sm font-black text-stone-700 block mb-2">
                स्वीकार्य व्हरायटी व गुणवत्ता निकष:
              </span>
              <div className="flex flex-wrap gap-2">
                {buyer.varieties.map((v, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-950 rounded-xl text-xs font-bold border border-emerald-300">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Contact & Verification */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-black text-stone-900 border-b border-stone-100 pb-3">
              संपर्क माहिती (Contact)
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="text-stone-500 block text-xs">संपर्क व्यक्ती</span>
                <span className="font-black text-stone-900 text-base">{buyer.contactPerson}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs">मोबाईल नंबर</span>
                <span className="font-mono font-black text-stone-900 text-base">{buyer.phone}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs">पत्ता</span>
                <span className="font-bold text-stone-900">{buyer.location}, {buyer.district}</span>
              </div>
            </div>

            <a
              href={`tel:${buyer.phone}`}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl transition flex items-center justify-center space-x-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>थेट कॉल करा</span>
            </a>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <Modal
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
          title={`विक्री चौकशी: ${buyer.name}`}
          subtitle="तुमचे उत्पादन वजन व तोडणी दिनांक पाठवा"
        >
          <div className="space-y-4 text-xs sm:text-sm text-stone-700">
            {inquirySent ? (
              <div className="p-5 bg-emerald-100 text-emerald-900 rounded-2xl flex items-center space-x-3 font-black border border-emerald-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
                <span>चौकशी यशस्वीरीत्या पाठवली गेली! खरेदीदार लवकरच संपर्क करतील.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySent(true);
                  const cleanPhone = buyer.phone.replace(/[^0-9]/g, '');
                  const whatsappMsg = encodeURIComponent(
                    `नमस्कार ${buyer.name}, मी शेतीमित्र ॲपवरून संपर्क करत आहे. माझ्याकडे अंदाजे ${inquiryKg} किलो ${buyer.preferredCrop} तोडणीसाठी उपलब्ध आहे. कृपया खरेदी दराबाबत संपर्क करावा.`
                  );
                  if (cleanPhone) {
                    window.open(`https://wa.me/91${cleanPhone.slice(-10)}?text=${whatsappMsg}`, '_blank');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    अंदाजित तोडणी वजन (किलो):
                  </label>
                  <input
                    type="number"
                    value={inquiryKg}
                    onChange={(e) => setInquiryKg(e.target.value)}
                    className="w-full p-3 bg-stone-50 border-2 border-stone-200 rounded-xl font-bold text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-black rounded-xl text-sm transition"
                >
                  चौकशी सबमिट करा
                </button>
              </form>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
