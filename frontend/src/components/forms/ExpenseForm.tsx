import React, { useState } from 'react';
import { useFarmData } from '../../context/FarmDataContext';
import { CropType, ExpenseCategory } from '../../types';

interface ExpenseFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSuccess, onCancel }) => {
  const { fields, addExpense } = useFarmData();
  const [category, setCategory] = useState<ExpenseCategory>('Labour');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [crop, setCrop] = useState<CropType>('Grapes');
  const [fieldId, setFieldId] = useState(fields[0]?.id || 'field-01');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Bank Transfer' | 'Credit'>('UPI');
  const [receiptAttached, setReceiptAttached] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const selectedField = fields.find((f) => f.id === fieldId);

    addExpense({
      category,
      amount: parseFloat(amount),
      date,
      crop,
      fieldId,
      fieldName: selectedField ? selectedField.name : 'Main Field',
      description: description || `${category} expense on ${date}`,
      paymentMethod,
      receiptAttached,
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs text-gray-700">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Expense Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            required
          >
            <option value="Labour">Labour (मजुरी / कामगार)</option>
            <option value="Fertilizer">Fertilizer (रासायनिक व सेंद्रिय खते)</option>
            <option value="Crop Protection">Crop Protection (कीटकनाशक व बुरशीनाशक)</option>
            <option value="Irrigation">Irrigation (ठिबक व पाणी व्यवस्थापन)</option>
            <option value="Machinery">Machinery & Tractor (ट्रॅक्टर व मशिनरी)</option>
            <option value="Transport">Transport (वाहतूक खर्च)</option>
            <option value="Packaging">Packaging & Crates (क्रेट्स व पॅकिंग बॉक्स)</option>
            <option value="Other">Other Miscellaneous (इतर किरकोळ खर्च)</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Amount (₹ INR) *</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 12500"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-bold text-gray-900"
            required
            min="1"
          />
        </div>
      </div>

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
          <label className="block text-gray-700 font-semibold mb-1">Farm Field *</label>
          <select
            value={fieldId}
            onChange={(e) => setFieldId(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.acres} Ac - {f.crop})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            <option value="UPI">UPI (PhonePe / GPay)</option>
            <option value="Cash">Cash (रोख)</option>
            <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
            <option value="Credit">Credit / Udhaari (उधारी)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Description / Notes</label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. 5 bags 0:0:50 purchased from Shree Agro with receipt"
          className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-2 pt-1">
        <input
          type="checkbox"
          id="receipt"
          checked={receiptAttached}
          onChange={(e) => setReceiptAttached(e.target.checked)}
          className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
        />
        <label htmlFor="receipt" className="text-gray-700 font-medium">
          Receipt / Bill available (पावती उपलब्ध)
        </label>
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
          Save Expense
        </button>
      </div>
    </form>
  );
};
