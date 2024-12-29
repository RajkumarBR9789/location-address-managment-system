import React from 'react';
import { Home, Building2, Users, Trash2, MapPin } from 'lucide-react';
import { useLocationStore, Location } from '../store/useLocationStore';

interface SavedAddressesProps {
  onBack: () => void;
}

export function SavedAddresses({ onBack }: SavedAddressesProps) {
  const { savedLocations, removeSavedLocation } = useLocationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="w-6 h-6 text-red-600" />;
      case 'office':
        return <Building2 className="w-6 h-6 text-red-600" />;
      default:
        return <Users className="w-6 h-6 text-red-600" />;
    }
  };

  if (savedLocations.length === 0) {
    return (
      <div className="text-center py-8">
        <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">No saved addresses</h2>
        <p className="text-gray-600 mb-4">You haven't saved any addresses yet.</p>
        <button
          onClick={onBack}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Add New Address
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Saved Addresses</h2>
        <button
          onClick={onBack}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          + Add New Address
        </button>
      </div>
      <div className="space-y-4">
        {savedLocations.map((location: Location, index: number) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getIcon(location.type || 'home')}
                <div>
                  <h3 className="font-medium capitalize">{location.type}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {location.details?.flatNumber}
                    {location.details?.landmark && `, ${location.details.landmark}`}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{location.address}</p>
                </div>
              </div>
              <button
                onClick={() => removeSavedLocation(location)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}