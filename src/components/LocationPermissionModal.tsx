import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPermissionModalProps {
  onEnableLocation: () => void;
  onSearchManually: () => void;
}

export function LocationPermissionModal({
  onEnableLocation,
  onSearchManually,
}: LocationPermissionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Enable Location Services</h2>
          <p className="text-gray-600 mb-6">
            Please enable location services to help us serve you better with accurate
            delivery information.
          </p>
          <div className="space-y-3 w-full">
            <button
              onClick={onEnableLocation}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Enable Location
            </button>
            <button
              onClick={onSearchManually}
              className="w-full border border-red-600 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
            >
              Search Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}