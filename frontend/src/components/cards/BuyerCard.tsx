import React from 'react';
import { Buyer } from '../../types';
import { VerificationBadge } from '../common/Badge';
import { MapPin, Truck, ArrowUpRight, Phone, ShieldCheck, MessageCircle, PhoneCall, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../images/images';

interface BuyerCardProps {
  buyer: Buyer;
  onSelectForComparison?: (buyer: Buyer) => void;
  onContact?: (buyer: Buyer) => void;
  highlight?: boolean;
}

export const BuyerCard: React.FC<BuyerCardProps> = ({
  buyer,
  highlight = false,
}) => {
  return (
    <div
      className={`rounded-3xl border-2 transition-all duration-200 bg-white ${
        highlight
          ? 'border-amber-400 ring-2 ring-amber-200 shadow-md'
          : 'border-stone-200 hover:border-emerald-400 hover:shadow-md'
      } p-6 flex flex-col justify-between space-y-4 shadow-xs`}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3.5">
            <img
              src={buyer.companyType === 'Exporter' ? IMAGES.exporterColdStorage : IMAGES.apmcMandiYard}
              alt={buyer.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-700 shadow-2xs shrink-0"
            />
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                  {buyer.preferredCrop}
                </span>
                <VerificationBadge status={buyer.verificationStatus} />
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 mt-1 hover:text-emerald-800 transition">
                <Link to={`/buyer/${buyer.id}`}>{buyer.name}</Link>
              </h3>
              <p className="text-xs font-semibold text-stone-500">{buyer.companyType} • {buyer.location}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-stone-500 font-bold block">ऑफर भाव</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800">
              ₹{buyer.offerPricePerKg}
              <span className="text-xs font-bold text-stone-500"> /kg</span>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs">
          <div>
            <span className="text-stone-500 text-[11px] font-bold block">अंतर</span>
            <span className="font-black text-stone-800 flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{buyer.distanceKm} किमी ({buyer.district})</span>
            </span>
          </div>

          <div>
            <span className="text-stone-500 text-[11px] font-bold block">वाहतूक सोय</span>
            <span
              className={`font-black flex items-center space-x-1 mt-0.5 ${
                buyer.pickupAvailable ? 'text-emerald-800' : 'text-stone-700'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{buyer.pickupAvailable ? 'शेतावर मोफत पिकअप' : 'शेतकरी डिलिव्हरी'}</span>
            </span>
          </div>

          <div className="col-span-2 pt-2 border-t border-stone-200">
            <span className="text-stone-500 text-[11px] font-bold block">पेमेंट अटी</span>
            <span className="font-bold text-stone-900">{buyer.paymentTerms}</span>
          </div>
        </div>

        {/* Varieties acceptable */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {buyer.varieties.map((v, i) => (
            <span key={i} className="text-xs bg-stone-100 text-stone-700 border border-stone-200 px-2.5 py-0.5 rounded-lg font-bold">
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-stone-100 flex items-center space-x-2">
        <Link
          to={`/buyer/${buyer.id}`}
          className="flex-1 py-2.5 text-center text-xs sm:text-sm font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition"
        >
          तपशील पहा
        </Link>

        <Link
          to={`/selling-decision?buyer=${buyer.id}`}
          className="flex-1 py-2.5 text-center text-xs sm:text-sm font-black text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
        >
          <span>निव्वळ नफा तपासा</span>
          <ArrowUpRight className="w-4 h-4 text-emerald-300" />
        </Link>
      </div>
    </div>
  );
};
