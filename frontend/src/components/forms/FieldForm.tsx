import React, { useState } from 'react';
import { useFarmData } from '../../context/FarmDataContext';
import { CropType } from '../../types';

interface FieldFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const FieldForm: React.FC<FieldFormProps> = ({ onSuccess, onCancel }) => {
  const { addField, fields } = useFarmData();
  const [name, setName] = useState(`Field 0${fields.length + 1} - New Plot`);
  const [acres, setAcres] = useState('1.5');
  const [crop, setCrop] = useState<CropType>('Grapes');
  const [variety, setVariety] = useState('Thompson Seedless');
  const [plantingYear, setPlantingYear] = useState('2022');
  const [irrigationType, setIrrigationType] = useState('Inline Automated Drip (4 LPH)');
  const [soilType, setSoilType] = useState('Medium Black Loam');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ac = parseFloat(acres);
    if (!name || !ac || ac <= 0) return;

    addField({
      name,
      acres: ac,
      crop,
      variety,
      plantingYear: parseInt(plantingYear) || 2022,
      irrigationType,
      soilType,
      status: 'Active',
      currentStage: 'Active Vegetative Growth',
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-gray-700">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Field Name / Plot Identifier *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Field 03 - Well Side Plot"
          className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-semibold"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Crop *</label>
          <select
            value={crop}
            onChange={(e) => {
              const newCrop = e.target.value as CropType;
              setCrop(newCrop);
              setVariety(newCrop === 'Grapes' ? 'Thompson Seedless' : 'Bhagwa (भगवा)');
            }}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            <option value="Grapes">Grapes (द्राक्ष)</option>
            <option value="Pomegranate">Pomegranate (डाळिंब)</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Area (Acres) *</label>
          <input
            type="number"
            step="0.1"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            placeholder="e.g. 2.0"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-bold"
            required
            min="0.1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Variety *</label>
          <input
            type="text"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            placeholder="e.g. Thompson Seedless / Sonaka / Bhagwa"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Planting Year</label>
          <input
            type="number"
            value={plantingYear}
            onChange={(e) => setPlantingYear(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Irrigation System</label>
          <select
            value={irrigationType}
            onChange={(e) => setIrrigationType(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            <option value="Online Drip with Fertigation Venturi">Online Drip with Fertigation</option>
            <option value="Inline Automated Drip (4 LPH)">Inline Automated Drip (4 LPH)</option>
            <option value="Micro Sprinklers">Micro Sprinklers</option>
            <option value="Flood / Canal Basin">Flood / Canal Basin</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Soil Type</label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            <option value="Medium Black Loam">Medium Black Loam (काळी जमीन)</option>
            <option value="Light Red Murrum Loam">Light Red Murrum (मुरुमाड जमीन)</option>
            <option value="Clay Loam">Heavy Clay Loam (चोपण जमीन)</option>
            <option value="Alluvial River Soil">Alluvial River Basin Soil</option>
          </select>
        </div>
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
          Add Field
        </button>
      </div>
    </form>
  );
};
