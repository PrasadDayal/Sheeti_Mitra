import React, { useState } from 'react';
import { useFarmData } from '../../context/FarmDataContext';
import { CropType } from '../../types';

interface HarvestFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const HarvestForm: React.FC<HarvestFormProps> = ({ onSuccess, onCancel }) => {
  const { fields, addHarvestBatch } = useFarmData();
  const [crop, setCrop] = useState<CropType>('Grapes');
  const [fieldId, setFieldId] = useState(fields[0]?.id || 'field-01');
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0]);
  const [quantityKg, setQuantityKg] = useState('');
  const [grade, setGrade] = useState<'Grade A (Export)' | 'Grade A (Domestic)' | 'Grade B' | 'Grade C'>('Grade A (Export)');
  const [sugarBrix, setSugarBrix] = useState('17.5');
  const [rejectedKg, setRejectedKg] = useState('25');
  const [buyerName, setBuyerName] = useState('Maharashtra Fresh Produce');
  const [sellingPricePerKg, setSellingPricePerKg] = useState('106');
  const [transportCost, setTransportCost] = useState('0');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantityKg);
    const price = parseFloat(sellingPricePerKg);
    const trans = parseFloat(transportCost) || 0;
    if (!qty || qty <= 0 || !price || price <= 0) return;

    const selectedField = fields.find((f) => f.id === fieldId);
    const grossRev = qty * price;
    const netRealization = parseFloat(((grossRev - trans) / qty).toFixed(2));
    const batchNumber = `HAR-${new Date().getFullYear()}-${crop.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    addHarvestBatch({
      batchNumber,
      harvestDate,
      crop,
      fieldId,
      fieldName: selectedField ? selectedField.name : 'Field 01',
      quantityKg: qty,
      grade,
      sugarBrix: parseFloat(sugarBrix) || undefined,
      rejectedKg: parseFloat(rejectedKg) || 0,
      buyerName,
      sellingPricePerKg: price,
      totalRevenue: grossRev,
      transportCost: trans,
      netRealizationPerKg: netRealization,
      notes: notes || `${grade} batch sold to ${buyerName}`,
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-gray-700">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Crop *</label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value as CropType)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            <option value="Grapes">Grapes (द्राक्ष)</option>
            <option value="Pomegranate">Pomegranate (डाळिंब)</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Harvest Field *</label>
          <select
            value={fieldId}
            onChange={(e) => setFieldId(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.acres} Ac)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Harvest Date *</label>
          <input
            type="date"
            value={harvestDate}
            onChange={(e) => setHarvestDate(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Harvested Qty (kg) *</label>
          <input
            type="number"
            value={quantityKg}
            onChange={(e) => setQuantityKg(e.target.value)}
            placeholder="e.g. 1500"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-bold"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Sugar Brix (°Bx)</label>
          <input
            type="number"
            step="0.1"
            value={sugarBrix}
            onChange={(e) => setSugarBrix(e.target.value)}
            placeholder="e.g. 18.0"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Produce Grade *</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value as any)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            <option value="Grade A (Export)">Grade A (Export / 18mm+)</option>
            <option value="Grade A (Domestic)">Grade A (Domestic Supermarket)</option>
            <option value="Grade B">Grade B (Local Mandi)</option>
            <option value="Grade C">Grade C (Juice / Processing)</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Rejected / Sorting Loss (kg)</label>
          <input
            type="number"
            value={rejectedKg}
            onChange={(e) => setRejectedKg(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Buyer / Channel *</label>
          <input
            type="text"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            placeholder="e.g. MahaFresh Exporters"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-semibold"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Selling Rate (₹/kg) *</label>
          <input
            type="number"
            step="0.5"
            value={sellingPricePerKg}
            onChange={(e) => setSellingPricePerKg(e.target.value)}
            placeholder="e.g. 106"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-bold text-emerald-800"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Transport Cost (₹)</label>
          <input
            type="number"
            value={transportCost}
            onChange={(e) => setTransportCost(e.target.value)}
            placeholder="0 if Farm Gate"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Notes</label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Quality inspection notes, weighbridge slip number, etc."
          className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
        />
      </div>

      <div className="pt-3 border-t border-gray-200 flex items-center justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg shadow-sm"
        >
          Record Harvest Batch
        </button>
      </div>
    </form>
  );
};
