import React, { useState } from 'react';
import { useFarmData } from '../../context/FarmDataContext';
import { ActivityCategory, CropType } from '../../types';

interface ActivityFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ onSuccess, onCancel }) => {
  const { fields, addActivity } = useFarmData();
  const [fieldId, setFieldId] = useState(fields[0]?.id || 'field-01');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ActivityCategory>('Fertilizer');
  const [stage, setStage] = useState('Berry Development');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [estimatedCost, setEstimatedCost] = useState('4500');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const selectedField = fields.find((f) => f.id === fieldId);
    const crop: CropType = selectedField ? selectedField.crop : 'Grapes';

    addActivity({
      fieldId,
      fieldName: selectedField ? selectedField.name : 'Field 01',
      crop,
      stage,
      title,
      category,
      status: 'Upcoming',
      date,
      estimatedCost: parseFloat(estimatedCost) || 0,
      notes,
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-gray-700">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Activity Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 0:0:50 Fertigation & Sugar Brix check"
          className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-semibold"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Field *</label>
          <select
            value={fieldId}
            onChange={(e) => setFieldId(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.crop})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Activity Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ActivityCategory)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            <option value="Fertilizer">Fertilizer (खत व्यवस्थापन)</option>
            <option value="Spraying">Spraying (फवारणी)</option>
            <option value="Irrigation">Irrigation (पाणी नियोजन)</option>
            <option value="Labour">Labour & Weeding (मजुरी / खुरपणी)</option>
            <option value="Pruning">Pruning (छाटणी)</option>
            <option value="Canopy">Canopy Management (कॅनोपी / पाने विरळणी)</option>
            <option value="Bagging">Bagging (फळ बॅगिंग)</option>
            <option value="Harvest">Harvest (तोडणी)</option>
            <option value="Other">Other (इतर)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Scheduled Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Estimated Cost (₹)</label>
          <input
            type="number"
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
            placeholder="e.g. 3500"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Notes / Action Instructions</label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Chemical dosage, labour crew count, weather precaution..."
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
          Schedule Activity
        </button>
      </div>
    </form>
  );
};
