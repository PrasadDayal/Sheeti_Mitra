import React, { useState } from 'react';
import { InputShop } from '../../types';
import { Store, MapPin, Phone, ShieldCheck, ShoppingBag, MessageCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { IMAGES } from '../../images/images';

interface InputShopCardProps {
  shop: InputShop;
}

export const InputShopCard: React.FC<InputShopCardProps> = ({ shop }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="p-5 rounded-3xl border border-gray-200 bg-white hover:border-emerald-400 hover:shadow-md transition duration-200 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start space-x-3">
              <img
                src={IMAGES.agroShopStorefront}
                alt={shop.shopName}
                className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-2xs shrink-0"
              />
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Agro Center
                  </span>
                  {shop.isVerified && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Authorized</span>
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mt-1">{shop.shopName}</h3>
                <p className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{shop.location} • {shop.distanceKm} km</span>
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-xl">
              ★ {shop.rating}
            </span>
          </div>

          {/* Key In-Stock Products */}
          <div className="mt-4 space-y-2">
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
              In-Stock Fertilizers & Sprays
            </span>
            <div className="space-y-1.5">
              {shop.products.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-gray-50 text-xs border border-gray-100"
                >
                  <div>
                    <p className="font-bold text-gray-900 truncate max-w-[160px]">{prod.name}</p>
                    <p className="text-[10px] text-gray-500">{prod.brand} • {prod.packSize}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-800">
                      ₹{prod.discountedPrice || prod.price}
                    </span>
                    {prod.discountedPrice && (
                      <span className="text-[10px] text-gray-400 line-through block">
                        ₹{prod.price}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex-1 py-2 text-center text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
          >
            Catalog
          </button>
          <a
            href={`tel:${shop.phone}`}
            className="flex-1 py-2 text-center text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-xl shadow-xs transition flex items-center justify-center space-x-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Shop</span>
          </a>
        </div>
      </div>

      {/* Product Catalog Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={shop.shopName}
        subtitle={`${shop.location} • License: ${shop.licenseNumber}`}
      >
        <div className="space-y-4 text-xs text-gray-700">
          <div className="bg-gray-50 p-3.5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">Proprietor: {shop.ownerName}</p>
              <p className="text-gray-500 font-mono">Contact: {shop.phone}</p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-xl font-bold">
              ★ {shop.rating} Rating
            </span>
          </div>

          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">Available Inputs & Special Discounts</h4>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {shop.products.map((p) => (
                <div key={p.id} className="p-3 border border-gray-200 rounded-2xl bg-white flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 text-[10px] font-bold rounded">
                        {p.category}
                      </span>
                      <span className="text-gray-500 text-[11px] font-medium">{p.targetCrop}</span>
                    </div>
                    <h5 className="font-bold text-gray-900 text-xs mt-1">{p.name}</h5>
                    <p className="text-gray-500 text-[11px] mt-0.5">{p.description}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">Pack: {p.packSize} • {p.brand}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-emerald-800 block">
                      ₹{p.discountedPrice || p.price}
                    </span>
                    {p.discountedPrice && (
                      <span className="text-[10px] text-gray-400 line-through">₹{p.price}</span>
                    )}
                    <span className="block mt-1 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>* Prices shown are demo benchmark rates from regional dealers.</span>
            <a
              href={`tel:${shop.phone}`}
              className="py-2 px-5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-center shadow"
            >
              Order from Shop
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};
