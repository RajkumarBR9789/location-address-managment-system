import React, { useState } from 'react';
import { Home, Building2, Users } from 'lucide-react';
import { Location } from '../store/useLocationStore';

interface AddressFormProps {
  initialLocation: Location;
  onSave: (location: Location) => void;
}

export function AddressForm({ initialLocation, onSave }: AddressFormProps) {
  const [formData, setFormData] = useState({
    flatNumber: initialLocation?.details?.flatNumber || '',
    landmark: initialLocation?.details?.landmark || '',
    type: initialLocation?.type || 'home',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      ...initialLocation,
      type: formData.type as 'home' | 'office' | 'other',
      details: {
        flatNumber: formData.flatNumber,
        landmark: formData.landmark,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Flat/House/Block No.
        </label>
        <input
          type="text"
          value={formData.flatNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, flatNumber: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Landmark/Area
        </label>
        <input
          type="text"
          value={formData.landmark}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, landmark: e.target.value }))
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Save as
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, type: 'home' }))}
            className={`flex flex-col items-center p-4 rounded-lg border ${
              formData.type === 'home'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200'
            }`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span>Home</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, type: 'office' }))}
            className={`flex flex-col items-center p-4 rounded-lg border ${
              formData.type === 'office'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200'
            }`}
          >
            <Building2 className="w-6 h-6 mb-1" />
            <span>Office</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, type: 'other' }))}
            className={`flex flex-col items-center p-4 rounded-lg border ${
              formData.type === 'other'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200'
            }`}
          >
            <Users className="w-6 h-6 mb-1" />
            <span>Other</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
      >
        Save Address
      </button>
    </form>
  );
}