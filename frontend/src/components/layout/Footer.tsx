import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Heart, MapPin, Globe, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xs border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="font-bold text-lg text-white">ShetiMitra AI</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Specialized Farm Profit & Market Intelligence Platform for grape and pomegranate farmers in Maharashtra.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Built for Maharashtra Growers</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Intelligence Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/selling-decision" className="hover:text-white transition">
                  Smart Selling Decision Engine
                </Link>
              </li>
              <li>
                <Link to="/market" className="hover:text-white transition">
                  APMC Mandi Price Intelligence
                </Link>
              </li>
              <li>
                <Link to="/buyers" className="hover:text-white transition">
                  Verified Buyer Network
                </Link>
              </li>
              <li>
                <Link to="/profit" className="hover:text-white transition">
                  True Crop Profit & Break-Even
                </Link>
              </li>
              <li>
                <Link to="/expenses" className="hover:text-white transition">
                  Cost of Cultivation Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Focus */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Districts Covered
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Nashik (Pimpalgaon, Dindori, Niphad)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Sangli (Tasgaon, Miraj)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Solapur (Sangola, Pandharpur)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Pune (Junnar, Narayangaon)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Ahilyanagar & Satara</span>
              </li>
            </ul>
          </div>

          {/* Contact & Languages */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Languages Supported
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="px-2 py-1 bg-gray-800 text-emerald-300 rounded border border-gray-700 font-semibold">
                मराठी (Marathi)
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700">
                हिंदी (Hindi)
              </span>
              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700">
                English
              </span>
            </div>
            <div className="pt-2 text-xs text-gray-500">
              <p>Demo Data Notice: All market prices and buyer valuations are for demonstrative planning and software modeling.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-gray-500">
          <p>© {new Date().getFullYear()} ShetiMitra AI. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted for Maharashtra Grape & Pomegranate Farmers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
